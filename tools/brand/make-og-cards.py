#!/usr/bin/env python3
"""Generates 1200x630 share cards in the new identity.

1200x630 is the ratio every platform crops to, so building the card at that size
means nothing is cropped in transit. The portrait photo is composed *into* the
card rather than handed to the platforms raw -- a 9:16 source given straight to
a 1.91:1 crop keeps a horizontal band through the middle and loses the face.

Output is JPEG: the one format no scraper has ever had trouble with.
"""
import os
from PIL import Image, ImageDraw, ImageFont

FONTS = os.path.expanduser("~/Library/Fonts")
BOLD = os.path.join(FONTS, "RedHatDisplay-Bold.ttf")
MED = os.path.join(FONTS, "RedHatDisplay-Medium.ttf")
TEXT = os.path.join(FONTS, "RedHatText-Regular.ttf")
REPO = "/Users/mono/Documents/Programs/manojitballav.github.io"
PHOTO = os.path.join(REPO, "images/mono-2026.jpg")

W, H = 1200, 630
BG = (11, 11, 16)
INK = (244, 244, 246)
DIM = (150, 150, 165)
ACC = (124, 58, 237)
PAD = 76
PANEL = 512                      # width of the photo panel on the right

# Where the subject sits in the source, as fractions of its height. The crop is
# centred on this rather than on the image, so the face never drifts out.
SUBJECT_Y = 0.51


def _wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def photo_panel(w, h):
    """Crop the portrait to the panel's aspect, centred on the subject."""
    im = Image.open(PHOTO).convert("RGB")
    sw, sh = im.size
    target = w / h
    ch = int(sw / target)
    if ch <= sh:
        cy = int(sh * SUBJECT_Y)
        top = max(0, min(sh - ch, cy - ch // 2))
        im = im.crop((0, top, sw, top + ch))
    else:
        cw = int(sh * target)
        left = max(0, (sw - cw) // 2)
        im = im.crop((left, 0, left + cw, sh))
    return im.resize((w, h), Image.LANCZOS)


def card(title, kicker="", domain="manojitballav.com", out="og.jpg",
         photo=True, max_lines=3):
    img = Image.new("RGB", (W, H), BG)

    if photo:
        img.paste(photo_panel(PANEL, H), (W - PANEL, 0))
        # Feather the seam so the photo does not butt hard against the type.
        fade = 190
        grad = Image.new("L", (fade, 1))
        for x in range(fade):
            grad.putpixel((x, 0), int(255 * (1 - x / fade) ** 1.35))
        grad = grad.resize((fade, H))
        img.paste(Image.new("RGB", (fade, H), BG), (W - PANEL, 0), grad)

    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 6], fill=ACC)

    text_w = (W - PANEL - PAD - 40) if photo else (W - PAD * 2)

    d.text((PAD, PAD), "MONO", font=ImageFont.truetype(BOLD, 44), fill=INK)
    if kicker:
        d.text((PAD, PAD + 70), kicker.upper(),
               font=ImageFont.truetype(MED, 22), fill=ACC)

    top = PAD + (146 if kicker else 116)
    bottom = H - PAD - 44
    for size in range(60, 29, -3):
        tf = ImageFont.truetype(BOLD, size)
        lines = _wrap(d, title, tf, text_w)
        lh = int(size * 1.2)
        if len(lines) <= max_lines and top + len(lines) * lh <= bottom:
            break
    for i, ln in enumerate(lines[:max_lines]):
        d.text((PAD, top + i * lh), ln, font=tf, fill=INK)

    d.text((PAD, H - PAD - 24), domain,
           font=ImageFont.truetype(TEXT, 24), fill=DIM)

    img.save(out, "JPEG", quality=86, optimize=True, progressive=True)
    return out, os.path.getsize(out)


CARDS = [
    ("og-default.jpg", "Product leader building consumer entertainment platforms", "", True),
    ("og-portfolio.jpg", "33 products launched across smart TVs, projectors and streaming",
     "Portfolio", True),
    ("og-devices.jpg", "Every Google certified Android device, searchable", "Tool", False),
    ("og-blog.jpg", "Writing on display technology, CTV and building for India",
     "Blog", True),
]

if __name__ == "__main__":
    os.makedirs("assets/og", exist_ok=True)
    for name, title, kicker, photo in CARDS:
        p, size = card(title, kicker, out=f"assets/og/{name}", photo=photo)
        print(f"  {size/1024:>6.0f} KB  {p}{'' if photo else '   (no photo)'}")
