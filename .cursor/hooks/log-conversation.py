#!/usr/bin/env python3
"""
Append agent conversation events to .cursor/conversation-history/

Hooks: sessionStart, sessionEnd, beforeSubmitPrompt, afterAgentThought,
       afterAgentResponse, postToolUse
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(os.environ.get("CURSOR_PROJECT_DIR", Path.cwd())).resolve()
HISTORY = ROOT / ".cursor" / "conversation-history"
SESSIONS = HISTORY / "sessions"
POINTER = HISTORY / "current-session.json"


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def load_stdin() -> dict:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    return json.loads(raw)


def ensure_dirs() -> None:
    SESSIONS.mkdir(parents=True, exist_ok=True)


def read_pointer() -> dict:
    if not POINTER.exists():
        return {}
    try:
        return json.loads(POINTER.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def write_pointer(data: dict) -> None:
    ensure_dirs()
    POINTER.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def session_paths(session_id: str) -> tuple[Path, Path]:
    safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in session_id)
    return (
        SESSIONS / f"{safe}.md",
        SESSIONS / f"{safe}.jsonl",
    )


def append_entry(session_id: str, entry: dict) -> None:
    md_path, jsonl_path = session_paths(session_id)
    ensure_dirs()
    line = json.dumps(entry, ensure_ascii=False)
    with jsonl_path.open("a", encoding="utf-8") as f:
        f.write(line + "\n")

    role = entry.get("role", "event")
    ts = entry.get("timestamp", utc_now())
    event = entry.get("event", "")
    header = f"\n## [{ts}] {role}"
    if event:
        header += f" ({event})"
    header += "\n\n"

    body_parts = []
    if entry.get("text"):
        body_parts.append(entry["text"])
    if entry.get("tool_name"):
        tool_block = f"**Tool:** `{entry['tool_name']}`"
        if entry.get("tool_input") is not None:
            tool_block += "\n\n```json\n" + json.dumps(entry["tool_input"], indent=2, ensure_ascii=False) + "\n```"
        if entry.get("tool_output"):
            out = entry["tool_output"]
            if isinstance(out, str) and len(out) > 8000:
                out = out[:8000] + "\n… [truncated in markdown log; see .jsonl]"
            tool_block += "\n\n**Output:**\n\n```\n" + str(out) + "\n```"
        body_parts.append(tool_block)
    if entry.get("meta"):
        body_parts.append(
            "```json\n" + json.dumps(entry["meta"], indent=2, ensure_ascii=False) + "\n```"
        )

    with md_path.open("a", encoding="utf-8") as f:
        if md_path.stat().st_size == 0:
            f.write(f"# Conversation session `{session_id}`\n")
            f.write(f"\n_Started {ts}_\n")
        f.write(header)
        f.write("\n".join(body_parts))
        f.write("\n")


def handle_session_start(payload: dict) -> None:
    session_id = payload.get("session_id") or f"session-{utc_now()}"
    md_path, jsonl_path = session_paths(session_id)
    ensure_dirs()
    if not md_path.exists():
        md_path.write_text(
            f"# Conversation session `{session_id}`\n\n"
            f"_Started {utc_now()}_\n\n"
            f"_Logged by `.cursor/hooks/log-conversation.py`_\n",
            encoding="utf-8",
        )
    write_pointer(
        {
            "session_id": session_id,
            "md_log": str(md_path.relative_to(ROOT)),
            "jsonl_log": str(jsonl_path.relative_to(ROOT)),
            "started_at": utc_now(),
        }
    )
    append_entry(
        session_id,
        {
            "timestamp": utc_now(),
            "event": "sessionStart",
            "role": "system",
            "meta": payload,
        },
    )


def handle_session_end(payload: dict) -> None:
    ptr = read_pointer()
    session_id = ptr.get("session_id") or payload.get("session_id")
    if not session_id:
        return
    append_entry(
        session_id,
        {
            "timestamp": utc_now(),
            "event": "sessionEnd",
            "role": "system",
            "text": f"Session ended (`{payload.get('reason', 'unknown')}`).",
            "meta": payload,
        },
    )


def active_session_id(payload: dict) -> str | None:
    ptr = read_pointer()
    return ptr.get("session_id") or payload.get("session_id") or payload.get("conversation_id")


def handle_before_submit_prompt(payload: dict) -> None:
    session_id = active_session_id(payload)
    if not session_id:
        return
    append_entry(
        session_id,
        {
            "timestamp": utc_now(),
            "event": "beforeSubmitPrompt",
            "role": "user",
            "text": payload.get("prompt", ""),
            "meta": {"attachments": payload.get("attachments")},
        },
    )


def handle_after_agent_thought(payload: dict) -> None:
    session_id = active_session_id(payload)
    if not session_id:
        return
    text = payload.get("text", "")
    if not text.strip():
        return
    append_entry(
        session_id,
        {
            "timestamp": utc_now(),
            "event": "afterAgentThought",
            "role": "assistant_thought",
            "text": text,
            "meta": {"duration_ms": payload.get("duration_ms")},
        },
    )


def handle_after_agent_response(payload: dict) -> None:
    session_id = active_session_id(payload)
    if not session_id:
        return
    text = payload.get("text", "")
    if not text.strip():
        return
    append_entry(
        session_id,
        {
            "timestamp": utc_now(),
            "event": "afterAgentResponse",
            "role": "assistant",
            "text": text,
        },
    )


def handle_post_tool_use(payload: dict) -> None:
    session_id = active_session_id(payload)
    if not session_id:
        return
    tool_name = payload.get("tool_name") or payload.get("name") or "unknown"
    append_entry(
        session_id,
        {
            "timestamp": utc_now(),
            "event": "postToolUse",
            "role": "tool",
            "tool_name": tool_name,
            "tool_input": payload.get("tool_input") or payload.get("arguments"),
            "tool_output": payload.get("tool_output") or payload.get("result"),
            "meta": {
                k: payload[k]
                for k in ("duration_ms", "success", "cwd")
                if k in payload
            },
        },
    )


def main() -> int:
    try:
        payload = load_stdin()
    except json.JSONDecodeError:
        return 0

    event = (
        payload.get("hook_event_name")
        or os.environ.get("CURSOR_HOOK")
        or ""
    ).strip()

    handlers = {
        "sessionStart": handle_session_start,
        "sessionEnd": handle_session_end,
        "beforeSubmitPrompt": handle_before_submit_prompt,
        "afterAgentThought": handle_after_agent_thought,
        "afterAgentResponse": handle_after_agent_response,
        "postToolUse": handle_post_tool_use,
    }

    handler = handlers.get(event)
    if handler:
        handler(payload)
    return 0


if __name__ == "__main__":
    sys.exit(main())
