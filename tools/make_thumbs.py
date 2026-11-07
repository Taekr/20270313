#!/usr/bin/env python3
"""갤러리 썸네일 만들기 (Vercel 에는 올라가지 않는 도구입니다).

images/gallery/ 의 사진을 바꾸거나 추가한 뒤, claude/web 폴더에서 실행하세요:

    python3 tools/make_thumbs.py

- images/gallery/thumb/ 에 같은 이름의 작은 정사각형 썸네일(480px)을 만듭니다.
- 원본이 너무 크면(긴 변 1600px 초과) 갤러리 사진도 1600px 로 줄여 저장합니다.
- 썸네일이 없으면 페이지가 큰 사진을 대신 쓰므로, 이 스크립트를 깜빡해도 화면은 깨지지 않습니다.
필요: Pillow (pip3 install pillow)
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
GALLERY = ROOT / 'images' / 'gallery'
THUMBS = GALLERY / 'thumb'
THUMB_SIZE = 480
FULL_MAX = 1600

THUMBS.mkdir(exist_ok=True)
for src in sorted(GALLERY.iterdir()):
    if src.suffix.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
        continue
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')

    if max(im.size) > FULL_MAX:
        im.thumbnail((FULL_MAX, FULL_MAX), Image.LANCZOS)
        im.save(src, 'JPEG', quality=82, optimize=True, progressive=True)
        print(f'줄임  {src.name} -> {im.size[0]}x{im.size[1]}')

    th = ImageOps.fit(im, (THUMB_SIZE, THUMB_SIZE), Image.LANCZOS, centering=(0.5, 0.5))
    out = THUMBS / (src.stem + '.jpg')
    th.save(out, 'JPEG', quality=80, optimize=True, progressive=True)
    print(f'썸네일 {out.relative_to(ROOT)} ({out.stat().st_size // 1024}KB)')
