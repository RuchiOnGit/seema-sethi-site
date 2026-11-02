#!/bin/bash
# Render a social post page to PNG with Remotion's headless Chrome.
#   _src/social/render.sh diwali-2026        -> diwali-2026-post.png (1080x1350) + diwali-2026-story.png (1080x1920)
set -e
cd "$(dirname "$0")"
CHROME=/Users/ruchi/video-studio/node_modules/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell
name=${1:-diwali-2026}
for f in post:1350 story:1920; do
  kind=${f%%:*}; h=${f##*:}
  "$CHROME" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=1080,$h --virtual-time-budget=8000 --screenshot="$PWD/$name-$kind.png" "file://$PWD/$name.html?$kind" 2>/dev/null
done
ls -la "$name"-*.png
