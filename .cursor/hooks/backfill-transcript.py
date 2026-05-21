#!/usr/bin/env python3
"""
One-time backfill: import Cursor agent-transcript JSONL into .cursor/conversation-history/

Usage (from repo root):
  python3 .cursor/hooks/backfill-transcript.py
  python3 .cursor/hooks/backfill-transcript.py /path/to/session.jsonl
"""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
HISTORY = ROOT / ".cursor" / "conversation-history"
SESSIONS = HISTORY / "sessions"
TRANSCRIPTS = (
    Path.home() / ".cursor" / "projects" / "home-airy-mikasa" / "agent-transcripts"
)


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def find_latest_transcript() -> Path | None:
    if not TRANSCRIPTS.exists():
        return None
    candidates = list(TRANSCRIPTS.glob("*/*.jsonl"))
    if not candidates:
        return None
    return max(candidates, key=lambda p: p.stat().st_mtime)


def content_to_text(content) -> str:
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return json.dumps(content, ensure_ascii=False, indent=2)
    parts = []
    for item in content:
        if not isinstance(item, dict):
            parts.append(str(item))
            continue
        kind = item.get("type", "text")
        if kind == "text":
            parts.append(item.get("text", ""))
        elif kind == "tool_use":
            name = item.get("name", "tool")
            inp = item.get("input", {})
            parts.append(
                f"**Tool:** `{name}`\n\n```json\n"
                + json.dumps(inp, indent=2, ensure_ascii=False)
                + "\n```"
            )
        elif kind == "tool_result":
            parts.append(
                "**Tool result:**\n\n```\n"
                + str(item.get("text", item.get("content", "")))[:12000]
                + "\n```"
            )
        else:
            parts.append(f"_{kind}_\n```json\n{json.dumps(item, indent=2)}\n```")
    return "\n\n".join(p for p in parts if p)


def backfill(jsonl_path: Path, session_id: str | None = None) -> tuple[Path, Path]:
    session_id = session_id or jsonl_path.parent.name
    md_path = SESSIONS / f"{session_id}.md"
    out_jsonl = SESSIONS / f"{session_id}.jsonl"
    SESSIONS.mkdir(parents=True, exist_ok=True)

    lines_in = jsonl_path.read_text(encoding="utf-8").splitlines()
    md_parts = [
        f"# Conversation session `{session_id}` (backfilled)",
        f"\n_Source: `{jsonl_path}`_",
        f"\n_Imported {utc_now()}_",
        "\n\n> Note: Cursor transcript exports may redact thinking blocks. "
        "Live `afterAgentThought` hooks capture full chain-of-thought going forward.\n",
    ]

    with out_jsonl.open("w", encoding="utf-8") as jf:
        for i, line in enumerate(lines_in):
            if not line.strip():
                continue
            row = json.loads(line)
            role = row.get("role", "unknown")
            msg = row.get("message", {})
            text = content_to_text(msg.get("content", msg))
            ts = utc_now()
            entry = {
                "timestamp": ts,
                "event": "transcript_import",
                "role": role,
                "text": text,
                "line": i + 1,
            }
            jf.write(json.dumps(entry, ensure_ascii=False) + "\n")
            md_parts.append(f"\n## [{ts}] {role} (imported line {i + 1})\n\n{text}\n")

    md_path.write_text("".join(md_parts), encoding="utf-8")
    pointer = HISTORY / "current-session.json"
    pointer.write_text(
        json.dumps(
            {
                "session_id": session_id,
                "md_log": str(md_path.relative_to(ROOT)),
                "jsonl_log": str(out_jsonl.relative_to(ROOT)),
                "backfilled_from": str(jsonl_path),
                "backfilled_at": utc_now(),
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    return md_path, out_jsonl


def main() -> int:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else find_latest_transcript()
    if not src or not src.exists():
        print("No transcript found.", file=sys.stderr)
        print(f"Looked in: {TRANSCRIPTS}", file=sys.stderr)
        return 1
    md, jl = backfill(src)
    print(f"Backfilled {src}")
    print(f"  -> {md}")
    print(f"  -> {jl}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
