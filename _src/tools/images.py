#!/usr/bin/env python3
"""Image pipeline for the Seema Sethi site (run after adding, replacing or removing a file in img/).

    python3 _src/tools/images.py

- makes smaller WebP copies in img/w480, img/w960 and img/w1440 when the original is wider than 1.15x that size
- deletes copies whose original is gone (or no longer wide enough)
- rewrites _src/imgmap.js: {name: [ext, width, height, average colour]}; the colour is the placeholder the page
  shows while a photo loads (left empty for images with transparency, which sit on the page colour)

ffmpeg comes from the video-studio repo (it has libwebp); sips (macOS) reads sizes.
"""
import json, os, re, shutil, subprocess, sys

SITE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IMG = os.path.join(SITE, 'img')
FF = '/Users/ruchi/video-studio/node_modules/ffmpeg-static/ffmpeg'
TIERS = (480, 960, 1440)
ORIGINALS = ('.webp', '.jpg', '.jpeg', '.png')


def sips(path):
    out = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'hasAlpha', path],
                         capture_output=True, text=True).stdout
    w = int(re.search(r'pixelWidth: (\d+)', out).group(1))
    h = int(re.search(r'pixelHeight: (\d+)', out).group(1))
    return w, h, 'hasAlpha: yes' in out


def ffmpeg(*args):
    subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def average_colour(path):
    raw = subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-i', path, '-vf', 'scale=1:1:flags=area',
                          '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         capture_output=True, check=True).stdout
    return '#%02x%02x%02x' % tuple(raw[:3])


def main():
    names = {}
    for f in sorted(os.listdir(IMG)):
        base, ext = os.path.splitext(f)
        if ext.lower() in ORIGINALS and os.path.isfile(os.path.join(IMG, f)):
            names[base] = f
    imgmap, made, dropped = {}, 0, 0
    for base, f in names.items():
        src = os.path.join(IMG, f)
        w, h, alpha = sips(src)
        imgmap[base] = [os.path.splitext(f)[1][1:], w, h, '' if alpha else average_colour(src)]
        for t in TIERS:
            out = os.path.join(IMG, f'w{t}', base + '.webp')
            if w > t * 1.15:
                if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
                    os.makedirs(os.path.dirname(out), exist_ok=True)
                    ffmpeg('-i', src, '-vf', f'scale={t}:-2:flags=lanczos', '-c:v', 'libwebp',
                           *(['-pix_fmt', 'yuva420p'] if alpha else []), '-quality', '72', '-compression_level', '6', out)
                    made += 1
            elif os.path.exists(out):
                os.remove(out); dropped += 1
    for t in TIERS:
        d = os.path.join(IMG, f'w{t}')
        for f in sorted(os.listdir(d)) if os.path.isdir(d) else []:
            if os.path.splitext(f)[0] not in names:
                os.remove(os.path.join(d, f)); dropped += 1
    with open(os.path.join(SITE, '_src', 'imgmap.js'), 'w') as fh:
        fh.write('const IMG=' + json.dumps(imgmap, separators=(',', ':')) + ';')
    print(f'{len(imgmap)} images, {made} copies made, {dropped} removed')


if __name__ == '__main__':
    main()
