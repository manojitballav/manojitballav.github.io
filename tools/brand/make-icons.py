#!/usr/bin/env python3
"""Rasterises the symbol into the favicon / app-icon set.

Transparent PNGs carry the mark in near-black, which is right for light browser
chrome. The Apple and Android icons get an opaque ground instead, because iOS
composites transparency onto black and Android masks the icon to a shape.
"""
import io, os
import cairosvg
from PIL import Image

SRC = "assets/symbol.svg"
OUT = "assets"
INK = "#111114"
PAPER = "#ffffff"

svg = open(SRC).read()


def render(px, fill=INK, bg=None, pad=0.0):
    """Render the symbol at px. `pad` insets the mark as a fraction of the size."""
    s = svg.replace('fill="currentColor"', f'fill="{fill}"')
    if pad:
        # Shrink the artwork inside the viewBox by widening it symmetrically.
        grow = 60 * pad / (1 - 2 * pad)
        s = s.replace('viewBox="0 0 60 60"',
                      f'viewBox="{-grow:.2f} {-grow:.2f} {60+2*grow:.2f} {60+2*grow:.2f}"')
    png = cairosvg.svg2png(bytestring=s.encode(), output_width=px, output_height=px)
    img = Image.open(io.BytesIO(png)).convert("RGBA")
    if bg:
        ground = Image.new("RGBA", img.size, bg)
        ground.alpha_composite(img)
        img = ground
    return img


def main():
    made = []

    # Browser favicons: transparent, no padding - the tab is already tiny.
    for px in (16, 32, 48, 96):
        p = f"{OUT}/favicon-{px}x{px}.png"
        render(px).save(p)
        made.append(p)

    # .ico bundles the three sizes Windows and older browsers ask for.
    ico = f"{OUT}/favicon.ico"
    render(48).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])
    made.append(ico)

    # Apple touch icon: opaque, and inset so iOS's rounding does not clip the mark.
    p = f"{OUT}/apple-touch-icon.png"
    render(180, bg=PAPER, pad=0.14).save(p)
    made.append(p)

    # Android / PWA: opaque, matching the manifest background.
    for px in (192, 512):
        p = f"{OUT}/android-chrome-{px}x{px}.png"
        render(px, bg=PAPER, pad=0.12).save(p)
        made.append(p)

    # SVG favicon. currentColor means nothing to a favicon renderer, so the fill
    # is explicit and flips on the OS colour scheme (a favicon cannot see the
    # site's own data-theme toggle).
    fav = (svg.replace('fill="currentColor"', 'fill="var(--fg)"')
              .replace('<title>MONO</title>',
                       '<title>MONO</title>\n  <style>'
                       f':root{{--fg:{INK}}}'
                       '@media (prefers-color-scheme:dark){:root{--fg:#f4f4f6}}'
                       '</style>'))
    p = f"{OUT}/favicon.svg"
    open(p, "w").write(fav)
    made.append(p)

    for p in made:
        print(f"  {os.path.getsize(p):>7,} B  {p}")


if __name__ == "__main__":
    main()
