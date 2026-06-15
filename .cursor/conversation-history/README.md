# Conversation history (project-local)

Agent chats are logged here by Cursor hooks in `.cursor/hooks/log-conversation.py`.

## Files

| Path | Contents |
|------|----------|
| `sessions/<session_id>.md` | Human-readable log (user, assistant, **thinking**, tools) |
| `sessions/<session_id>.jsonl` | Machine-readable append-only log |
| `current-session.json` | Pointer to the active session files |

## Hooks (`.cursor/hooks.json`)

- `beforeSubmitPrompt` — user messages
- `afterAgentThought` — chain-of-thought / thinking blocks
- `afterAgentResponse` — assistant replies
- `postToolUse` — tool calls and outputs
- `sessionStart` / `sessionEnd` — session boundaries

Restart Cursor after editing hooks if they do not fire immediately.

## Backfill an existing transcript

```bash
python3 .cursor/hooks/backfill-transcript.py
```

## Indexing / codebase search

These logs are listed in `.cursorignore` so they are **not** treated as game source code for indexing. That is intentional.

`.cursor/rules/` still apply as agent instructions; they are not the same as codebase indexing.
