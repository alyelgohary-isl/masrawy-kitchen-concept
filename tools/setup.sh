#!/usr/bin/env bash
# One-time machine setup for the motion-site tools (macOS with Homebrew).
set -euo pipefail
command -v brew >/dev/null || { echo "Install Homebrew first: https://brew.sh"; exit 1; }
brew list ffmpeg >/dev/null 2>&1 || brew install ffmpeg
brew list webp   >/dev/null 2>&1 || brew install webp          # cwebp/dwebp
command -v node  >/dev/null || brew install node
node -e 'const [a,b]=process.versions.node.split(".").map(Number); process.exit(a>22||(a===22&&b>=12)?0:1)' \
  || { echo "Astro 7 needs Node 22.12+ (have $(node -v)): brew upgrade node"; exit 1; }
python3 -c "import requests, PIL" 2>/dev/null || pip3 install --user requests pillow
# headless browser for QA screenshots (uses playwright-core + chromium headless shell)
npx --yes playwright@latest install chromium-headless-shell >/dev/null
node -e "require.resolve('playwright-core')" 2>/dev/null || npm install -g playwright-core >/dev/null
echo "ok: ffmpeg, cwebp, node, python deps, headless chromium"
