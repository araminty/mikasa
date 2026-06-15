# Mikasa WSL dev helper — copy into ~/.bashrc on any machine (or: source this file).
#
# Install (append to ~/.bashrc):
#   cat ~/mikasa/scripts/mikasa-wsl.bashrc >> ~/.bashrc && source ~/.bashrc
#
# Or one-time source per shell:
#   source ~/mikasa/scripts/mikasa-wsl.bashrc
#
# Usage: mikasa
#   cd ~/mikasa, npm run make-html, wait for build-stamp.txt, open Firefox private window.
#   Default: http://127.0.0.1:8765/ (dev server). Override:
#   MIKASA_FILE=1 mikasa  → file:// with cache-bust query params only
#   MIKASA_NO_PRIVATE=1 mikasa  → normal (non-incognito) window

# --- mikasa dev helper (WSL) ---
alias firefox.exe='"/mnt/c/Program Files/Mozilla Firefox/firefox.exe"'

mikasa() {
  local root=~/mikasa
  cd "$root" || { echo "Cannot cd to $root"; return 1; }

  local marker="$root/out/html/build-stamp.txt"
  local before=0
  [[ -f "$marker" ]] && before=$(stat -c %Y "$marker" 2>/dev/null || echo 0)

  echo "Building mikasa..."
  npm run make-html || return 1

  local i=0
  while (( i < 10 )); do
    if [[ -f "$marker" ]] && [[ $(stat -c %Y "$marker") -gt "$before" ]]; then
      break
    fi
    sleep 0.5
    (( ++i ))
  done
  if (( i >= 10 )); then
    echo "Warning: build-stamp.txt did not update within 5s; opening anyway."
  fi

  local index="$root/out/html/index.html"
  if [[ ! -f "$index" ]]; then
    echo "Missing $index"
    return 1
  fi

  local bust
  bust=$(tr -d '\n\r' < "$marker" | tr ' :' '__')
  local ff="/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
  local url
  local -a ff_args=()
  if [[ -z "${MIKASA_NO_PRIVATE:-}" ]]; then
    ff_args=(-private-window)
  fi

  if [[ -n "${MIKASA_FILE:-}" ]]; then
    url="$(wslpath -w "$index")?v=${bust}"
  else
    local port="${MIKASA_DEV_PORT:-8765}"
    if ! ss -tln 2>/dev/null | grep -q ":${port} "; then
      node "$root/scripts/serve-dev.js" >/dev/null 2>&1 &
      sleep 0.3
    fi
    url="http://127.0.0.1:${port}/?v=${bust}"
  fi

  if [[ -f "$ff" ]]; then
    "$ff" "${ff_args[@]}" "$url" >/dev/null 2>&1 &
  elif command -v firefox.exe >/dev/null 2>&1; then
    firefox.exe "${ff_args[@]}" "$url" >/dev/null 2>&1 &
  elif command -v firefox >/dev/null 2>&1; then
    firefox "${ff_args[@]}" "$url" >/dev/null 2>&1 &
  else
    echo "Firefox not found. Open: $url"
    return 1
  fi
}
# --- end mikasa ---
