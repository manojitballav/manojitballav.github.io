# Brand assets

The logo is generated, not hand-drawn, so it can be regenerated exactly.

- `make-logo.py` — outlines the wordmark and builds the symbol.
  Outputs `assets/wordmark.svg` and `assets/symbol.svg`.
- `make-icons.py` — rasterises the symbol into the favicon and app-icon set.

```sh
python3 -m venv .venv && ./.venv/bin/pip install fonttools cairosvg pillow
./.venv/bin/python make-logo.py && ./.venv/bin/python make-icons.py
cp assets/wordmark.svg ../../images/logo-wordmark.svg
cp assets/symbol.svg   ../../images/logo-symbol.svg
cp assets/favicon.svg  ../../images/favicon.svg
cp assets/favicon-*.png assets/apple-touch-icon.png assets/android-chrome-*.png ../../images/
cp assets/favicon.ico ../../favicon.ico && cp assets/favicon.ico ../../images/favicon.ico
```

## The mark

**Wordmark** — MONO set in Red Hat Display Bold at -2% tracking and converted to
outlines. Red Hat Display is licensed under the SIL Open Font Licence, so it is free
to use in a logo commercially. The outlined file carries no font dependency.

**Symbol** — "Assembly": the same face's M cut into three vertical slices and
reassembled slightly out of true. Kerf 3 units, offsets -3.0 / +3.5 / -1.5 on a
60-unit box. Half those values just read as a rendering glitch, so the cuts have to
be obvious to look deliberate.

Both use `fill="currentColor"`, so the page decides the colour and dark mode needs
no `invert()` filter. The header renders the wordmark as a CSS mask for this reason.

## Usage

Wordmark and symbol are **alternates, never a lockup** — the symbol is the wordmark
compressed to its first letter. Using both together says the M twice.

- Wordmark wherever a word fits: desktop header, email signature, slides, share cards.
- Symbol in square or tight frames: favicon, app icon, avatars, mobile header.
- Minimums: wordmark 11px cap height, symbol 16px. Clear space: one cap height.

Font files are not vendored here — `make-logo.py` reads Red Hat Display Bold from
`~/Library/Fonts`. Download it from Google Fonts if regenerating on another machine.
