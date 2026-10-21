#!/usr/bin/env bash
# Split an mp4 into webp frames at the film's 12fps, keeping its aspect ratio.
#   tools/frames16.sh clip.mp4 outdir prefix [fps]      W=1920 (wide) or W=1080 (square) Q=74
set -euo pipefail
in="$1"; out="$2"; prefix="${3:-frame_}"; fps="${4:-12}"
mkdir -p "$out"; tmp="$(mktemp -d)"
w="${W:-1920}"; q="${Q:-74}"
ffmpeg -v error -i "$in" -vf "fps=$fps,scale=$w:-2:flags=lanczos" "$tmp/$prefix%04d.png"
for p in "$tmp"/*.png; do cwebp -quiet -q "$q" "$p" -o "$out/$(basename "${p%.png}").webp"; done
rm -rf "$tmp"
echo "$(ls "$out" | wc -l | tr -d ' ') frames -> $out ($(du -sh "$out" | cut -f1))"
