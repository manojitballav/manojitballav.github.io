#!/usr/bin/env python3
"""Produces the shippable MONO assets: wordmark, symbol, favicons.

Wordmark  Red Hat Display Bold (SIL OFL), MONO at -2% tracking, converted to
          outlines so the finished file carries no font dependency.
Symbol    'Assembly' - the same face's M cut into three vertical slices and
          reassembled a little out of true.

Both use fill="currentColor", so the page decides the colour and dark mode needs
no invert() filter.

Positioning works off *ink* bounds, never advance widths: a glyph's advance
includes side bearings, and the O overshoots the cap line by 11 units at each
end. Sizing to the advance leaves the mark visibly off-centre and clips the O.
"""
import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

FONT = os.path.expanduser("~/Library/Fonts/RedHatDisplay-Bold.ttf")
OUT = "assets"
TRACK = -0.02
os.makedirs(OUT, exist_ok=True)

font = TTFont(FONT, lazy=False)
UPEM = font["head"].unitsPerEm
CAP = font["OS/2"].sCapHeight
gs = font.getGlyphSet()
cmap = font.getBestCmap()
hmtx = font["hmtx"]


def gname(ch):
    return cmap[ord(ch)]


def path_of(ch):
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.1f}")
    gs[gname(ch)].draw(pen)
    return pen.getCommands()


def ink_bounds(ch, dx=0.0):
    bp = BoundsPen(gs)
    gs[gname(ch)].draw(TransformPen(bp, Transform().translate(dx, 0)))
    return bp.bounds          # (xMin, yMin, xMax, yMax)


# ---------------------------------------------------------------- wordmark
def build_wordmark():
    tr = TRACK * UPEM
    x, placed, bounds = 0.0, [], []
    for ch in "MONO":
        placed.append((path_of(ch), x))
        bounds.append(ink_bounds(ch, x))
        x += hmtx[gname(ch)][0] + tr

    x0 = min(b[0] for b in bounds)
    x1 = max(b[2] for b in bounds)
    y0 = min(b[1] for b in bounds)          # below baseline (O overshoot)
    y1 = max(b[3] for b in bounds)          # above cap line (O overshoot)
    w, h = x1 - x0, y1 - y0

    body = "\n      ".join(
        f'<path transform="translate({px - x0:.1f},0)" d="{d}"/>' for d, px in placed)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" '
        f'role="img" aria-label="MONO">\n'
        f'  <title>MONO</title>\n'
        f'  <g fill="currentColor" transform="scale(1,-1) translate(0,-{y1:.0f})">\n'
        f'      {body}\n'
        f'  </g>\n'
        f'</svg>\n')
    return svg, w, h, (y1 - y0) / CAP


# ------------------------------------------------------------------ symbol
BOX = 60
M_H = 46.0                       # ink height of the M inside the box
KERF = 3.0
OFFSETS = (-3.0, 3.5, -1.5)      # per-slice vertical nudge


def build_symbol():
    d = path_of("M")
    bx0, by0, bx1, by1 = ink_bounds("M")
    s = M_H / (by1 - by0)
    ink_w = (bx1 - bx0) * s

    lo, hi = min(OFFSETS), max(OFFSETS)
    # Centre the assembled group, offsets included, in the box.
    top = (BOX - (M_H + hi - lo)) / 2 - lo
    left = (BOX - ink_w) / 2

    # Glyph transform: place ink-left at `left` and ink-top at `top`.
    gt = (f'translate({left - bx0 * s:.3f},{top + by1 * s:.3f}) '
          f'scale({s:.5f},-{s:.5f})')

    cuts = [left + ink_w * i / 3 for i in range(4)]
    clips, groups = [], []
    for i, off in enumerate(OFFSETS):
        a, b = cuts[i], cuts[i + 1]
        right = b - (KERF if i < len(OFFSETS) - 1 else 0)
        clips.append(f'    <clipPath id="mono-s{i}">'
                     f'<rect x="{a:.2f}" y="-20" width="{right - a:.2f}" '
                     f'height="{BOX + 40}"/></clipPath>')
        groups.append(
            f'    <g clip-path="url(#mono-s{i})" transform="translate(0,{off})">\n'
            f'      <g transform="{gt}"><path d="{d}"/></g>\n'
            f'    </g>')

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}" '
        f'role="img" aria-label="MONO">\n'
        f'  <title>MONO</title>\n'
        f'  <defs>\n' + "\n".join(clips) + '\n  </defs>\n'
        f'  <g fill="currentColor">\n' + "\n".join(groups) + '\n  </g>\n'
        f'</svg>\n')
    return svg, ink_w, M_H


if __name__ == "__main__":
    wm, w, h, cap_ratio = build_wordmark()
    open(f"{OUT}/wordmark.svg", "w").write(wm)

    sym, ink_w, ink_h = build_symbol()
    open(f"{OUT}/symbol.svg", "w").write(sym)

    print(f"wordmark.svg  viewBox 0 0 {w:.0f} {h:.0f}")
    print(f"              aspect {w/h:.4f}  |  box height = {cap_ratio:.4f} x cap height")
    print(f"              at 20px cap -> {20*cap_ratio:.1f}px tall, {20*cap_ratio*w/h:.1f}px wide")
    print(f"symbol.svg    viewBox 0 0 {BOX} {BOX}  ink {ink_w:.1f} x {ink_h:.1f}")
