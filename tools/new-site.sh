#!/usr/bin/env bash
# Start a new site from this template.
#   tools/new-site.sh <target-dir>
# Copies the Astro project (pages, components, styles, tools, workflow) and installs
# dependencies; content, brand and frames are left to the motion-website skill.
set -euo pipefail
src="$(cd "$(dirname "$0")/.." && pwd)"; dst="${1:?target dir}"
mkdir -p "$dst"
rsync -a \
  --exclude .git --exclude node_modules --exclude dist --exclude .astro \
  --exclude work --exclude videos --exclude key_frames --exclude .env \
  "$src"/ "$dst"/
mkdir -p "$dst"/work
chmod +x "$dst"/tools/*.sh
(cd "$dst" && npm install --no-audit --no-fund >/dev/null)
echo "New site scaffolded at $dst."
echo "Next: .env (KIE_API_KEY, GH_TOKEN, PUBLIC_GTM_ID / PUBLIC_GA4_ID / PUBLIC_GSC_VERIFICATION), src/site.config.ts, then follow the motion-website skill. Preview: npm run dev"
