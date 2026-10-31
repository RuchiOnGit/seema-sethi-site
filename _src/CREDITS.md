# Image notes

- `img/a-dialogue-with-heritage.webp` — the artist's own photo of "A Dialogue with Heritage" (supplied 2026-10-31), wall cropped off.
- `img/ub-ceiling.webp` — blue-and-gold domed ceiling, stock photo from Unsplash (photographer Maksim Zinchenko, photo-1783670588051-247c1b12f7e6; Unsplash License, no credit required). Stand-in for the Taj Mahal ceiling the client pictured; swap in her own photo if she has one (re-run `_src/tools/images.py`).
- `img/ub-taj`, `ub-egypt`, `ub-tiger` — page-banner photos carried over from the original site's builder (Unsplash), cropped and recompressed.
- Every other image is carried over from the original artbyseemasethi.com.

To add or replace an image: put the file in `img/`, run `python3 _src/tools/images.py` (makes the 480/960/1440 copies and the colour map), then re-export.
