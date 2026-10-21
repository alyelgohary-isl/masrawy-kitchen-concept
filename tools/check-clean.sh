#!/usr/bin/env bash
# Refuse to scaffold, build or commit while a known repo-poisoning payload is present.
# Runs from npm predev/prebuild/prepreview, from tools/new-site.sh, from the Pages workflow
# and from .githooks/pre-commit. Background: README → Security.
#   tools/check-clean.sh [dir]        exit 1 and name the file if anything matches
set -u
root="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
bad=0
flag() { echo "check-clean: $1"; bad=1; }

# 1. Build config tails: obfuscated JS appended after a long run of tabs or spaces.
for f in "$root"/*.config.js "$root"/*.config.mjs "$root"/*.config.cjs "$root"/*.config.ts "$root"/vite.config.* "$root"/tailwind.config.* "$root"/postcss.config.*; do
  [ -f "$f" ] || continue
  if grep -q "global.i = '" "$f" || grep -q "global\['_V'\]" "$f"; then flag "payload marker in $f"; fi
  if grep -qE "[[:blank:]]{40,}[^[:blank:]]" "$f"; then flag "long whitespace run hiding code in $f"; fi
  if [ "$(wc -c <"$f")" -gt 20000 ]; then flag "$f is $(wc -c <"$f") bytes; a config file should be far smaller"; fi
done

# 2. Hidden VS Code task that runs a "font" on folder open.
t="$root/.vscode/tasks.json"
if [ -f "$t" ] && grep -qE "runOn|woff2|\.llf|fa-solid" "$t"; then flag "poisoned $t (folderOpen task)"; fi

# 3. Fake fonts: real .woff2 files start with wOF2; .llf is never a font.
while IFS= read -r f; do
  case "$f" in
    *.llf) flag "fake font $f" ;;
    *.woff2) [ "$(head -c 4 "$f" 2>/dev/null)" = "wOF2" ] || flag "$f is not a WOFF2 file" ;;
  esac
done < <(find "$root" -path "$root/node_modules" -prune -o -path "$root/.git" -prune -o \( -name "*.woff2" -o -name "*.llf" \) -type f -print 2>/dev/null)

# 4. Leftovers the spreader writes.
[ -e "$root/nul" ] && flag "stray 'nul' file (left by the spreader's 'where node >nul')"
for f in temp_auto_push.bat temp_interactive_push.bat branch_structure.json; do [ -e "$root/$f" ] && flag "spreader file $root/$f"; done
[ -d "$HOME/.node_modules" ] && flag "$HOME/.node_modules exists (second-stage install location); inspect it before building"

if [ "$bad" -ne 0 ]; then
  echo "check-clean: refusing to continue. Strip the payload (see README → Security), then rerun."
  exit 1
fi
echo "check-clean: ok ($root)"
