# Migration extras (laptop → desktop, 2026-06-15)

Copied from outside the repo for one-time migration on branch `migration/laptop-full-state-2026-06-15`.

## Restore on desktop

| What | Copy from | Copy to |
|------|-----------|---------|
| Chat session logs | (already in repo) `.cursor/conversation-history/` | same path in cloned repo |
| Agent transcripts | `agent-transcripts/` | `~/.cursor/projects/<new-project-id>/agent-transcripts/` |
| User skills | `skills-cursor/` | `~/.cursor/skills-cursor/` |
| Recently viewed files | `cursor-home/ide_state.json` | `~/.cursor/ide_state.json` |
| Editor settings | `windows-cursor-user/settings.json` | `%APPDATA%\Cursor\User\settings.json` (Windows) |

### `ide_state.json`

Paths inside use `/home/airy/mikasa/...`. After clone, either:

- Open the project once in Cursor (it will rewrite paths), or
- Edit `absolutePath` entries to match your desktop path.

### User Rules (Settings → Rules)

Those are tied to your **Cursor account**, not this folder. Sign in on the desktop with the same account; they should sync automatically.

Safe to delete `migration-extras/` from the repo after migration.
