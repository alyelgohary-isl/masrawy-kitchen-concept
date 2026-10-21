#!/usr/bin/env bash
# Publish the site to GitHub Pages.
#   tools/deploy.sh <owner> <repo> [public|private]
# Needs either `gh` logged in, or GH_TOKEN (a token with repo + admin rights) in the environment / .env.
# What it does: checks the site builds, creates the repo if missing, copies the tracking IDs
# from .env (PUBLIC_GTM_ID, PUBLIC_GA4_ID, PUBLIC_GSC_VERIFICATION) to the repo's Actions
# variables, commits, pushes main, enables Pages with the Actions workflow (which builds with
# the repo's base path and those variables), waits for the first deploy and prints the URL.
set -euo pipefail
owner="${1:?owner}"; repo="${2:?repo}"; vis="${3:-public}"
root="$(cd "$(dirname "$0")/.." && pwd)"; cd "$root"
[ -f .env ] && export $(grep -E '^GH_TOKEN=' .env | xargs) 2>/dev/null || true

api() { # method path [json]
  if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
    if [ -n "${3:-}" ]; then echo "$3" | gh api -X "$1" "$2" --input - ; else gh api -X "$1" "$2"; fi
  else
    [ -n "${GH_TOKEN:-}" ] || { echo "Need gh (logged in) or GH_TOKEN"; exit 1; }
    curl -fsS -X "$1" -H "Authorization: Bearer $GH_TOKEN" -H "Accept: application/vnd.github+json" \
      "https://api.github.com$2" ${3:+-d "$3"}
  fi
}

[ -d node_modules ] || npm install --no-audit --no-fund >/dev/null
npm run build >/dev/null || { echo "Build failed: run npm run build to see why"; exit 1; }
[ -d .git ] || git init -q -b main
git add -A && git commit -qm "Deploy $(date +%F)" || true

if ! api GET "/repos/$owner/$repo" >/dev/null 2>&1 | grep -q '"id"'; then
  priv=$([ "$vis" = private ] && echo true || echo false)
  api POST "/user/repos" "{\"name\":\"$repo\",\"private\":$priv,\"has_issues\":false,\"has_wiki\":false}" >/dev/null || \
  api POST "/orgs/$owner/repos" "{\"name\":\"$repo\",\"private\":$priv}" >/dev/null || true
fi

# Tracking IDs → repo variables, before the push so the first build already has them.
# The environment wins over .env; empty values are skipped (and existing variables left alone).
envval() { [ -f .env ] && sed -n "s/^$1=\([^#[:space:]]*\).*/\1/p" .env | tail -1; }
for name in PUBLIC_GTM_ID PUBLIC_GA4_ID PUBLIC_GSC_VERIFICATION; do
  val="${!name:-$(envval "$name")}"
  [ -n "$val" ] || continue
  [[ "$val" =~ ^[A-Za-z0-9_-]+$ ]] || { echo "Tracking: $name has unexpected characters, skipped"; continue; }
  body="{\"name\":\"$name\",\"value\":\"$val\"}"
  if api PATCH "/repos/$owner/$repo/actions/variables/$name" "$body" >/dev/null 2>&1 || \
     api POST "/repos/$owner/$repo/actions/variables" "$body" >/dev/null 2>&1; then
    echo "Tracking: $name = $val"
  else
    echo "Tracking: could not set $name (token needs Variables write access); the site ships without it"
  fi
done

git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$owner/$repo.git"
git push -u origin main

# Pages via the Actions workflow (idempotent)
api POST "/repos/$owner/$repo/pages" '{"build_type":"workflow"}' >/dev/null 2>&1 || \
api PUT  "/repos/$owner/$repo/pages" '{"build_type":"workflow"}' >/dev/null 2>&1 || true

url="https://$owner.github.io/$repo/"
echo "Waiting for the first Pages deploy…"
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$url")
  [ "$code" = 200 ] && { echo "Live: $url"; exit 0; }
  sleep 15
done
echo "Pushed. Pages not yet answering at $url — check the Actions tab: https://github.com/$owner/$repo/actions"
