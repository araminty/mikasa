#!/usr/bin/env bash
# afterFileEdit: expand _ma / _tsuma shorthand in planning and scene prose.
set -euo pipefail

input=$(cat)
file_path=$(printf '%s' "$input" | node -e "
let d=''
process.stdin.on('data',c=>d+=c)
process.stdin.on('end',()=>{
  try {
    const j=JSON.parse(d)
    const p=j.file_path||j.path||j.filePath||''
    process.stdout.write(p)
  } catch { process.stdout.write('') }
})
")

if [[ -z "$file_path" ]]; then
  exit 0
fi

case "$file_path" in
  */planning/*.md|*/source/scenes/*.scene.dry|*/source/scenes/*/*.scene.dry)
    node "$(dirname "$0")/../../scripts/expand-ma-shorthand.js" "$file_path" 2>/dev/null || true
    ;;
esac

exit 0
