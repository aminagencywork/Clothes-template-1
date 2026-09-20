# Screenshot Analysis — Categories Screen

Reference: `design-requirement/design-image/categories-screen.png`, 941×1672, mobile portrait, top scroll, single screenshot. Scale via `--u = width/941`.

## Structure
```
Screen
├── Header: "Categories" serif ≈72px (x52,y100) + subtitle 27px muted | cart circle (x795–890) with brown badge "3"
├── Search pill x52–890, y236–315 (h80) "Search for categories..."
├── Filter icons y345–495: 6 circles ≈110px (All active brown; Men, Women, Kids, Shoes, Accessories) + label 24px
├── Card grid, 2 cols (x37–465 / 477–905), gap 12/13, card h≈255 (last row ≈218), radius ≈28
│   Men's Clothing, Women's Clothing, Kids Collection, Shoes Collection, Accessories, New Arrivals ("New" badge)
│   each: serif title 36px (2 lines), "Explore Now" 21px muted, white 50px chevron circle, photo on right half fading left
├── Offer banner x43–902, y1293–1498, olive #857a55: eyebrow, "Upgrade Your Style" serif white, "Get up to 40% Off", white "Shop Now →" pill, model photo, "Style More You"
└── Bottom nav: Categories active, Cart badge 3
```
## Tokens
Reuse home tokens; olive banner `#857a55`; card gradient `#f4efe6 → #e7dfd0`.

## Assets
Card and banner photos cropped from the screenshot (text/buttons avoided). Approximation; replace with originals.

## Responsive / states
Observed: mobile only. Inferred: 430px column, nav fixed; icon row scrolls if narrow. Visible: "All" filter active, Categories tab active. Inferred behavior: icon filter narrows cards; search filters by title.

## Uncertainties
| Item | Confidence | Decision |
|---|---|---|
| Icon glyphs (women/shoes) | Low | lucide PersonStanding / Footprints |
| Last card row height (≈218 vs 255) | Medium | uniform 255 |
| New Arrivals group | Low | grouped under Women for filtering |
