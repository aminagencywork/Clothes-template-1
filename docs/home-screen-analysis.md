# Screenshot Analysis — Home Screen

Reference: `design-requirement/design-image/home-screen.png`, 941×1672 (mobile portrait, single screenshot, top scroll). Measurements in reference px; implementation scales via `--u = width/941`.

## Structure
```
Screen
├── Header: avatar + menu pill (x50–310,y97–218) | bell w/ gold dot (x777–897)
├── Title "Find the one you prefer." serif ≈68px (x50,y250) + subtitle 27px muted | Search pill (x458–897,y306–421)
├── Category chips y516–588 (h72): All, Men's (active, brown), Women's, Kids, Shoes, Accessories; overflows right
├── "Popular Collection" serif 46px (y660) + "View All ›"
├── Product row: 3 cards (290/303/~256 w, radius ≈40), heart 64px, name 23px, price bold 29px, 3 color dots 34px; centre card taller (396 vs 375)
├── Special-offer banner x33–907,y1251–1502, bg #e9e1d1, radius 30: eyebrow, serif title, "Get up to 40% Off", "Shop Now →" pill, model photo right, "Style More You"
└── Bottom nav x35–905,y1535–1648 white, radius ≈34, shadow; Home active (beige pill)
```

## Tokens
pill `#f1ece1`, muted `#7d7a72`, brown `#7f6a3b`, gold dot `#b8955a`, banner `#e9e1d1`, ink `#231a10`. Fonts: Gloock (display), DM Sans (UI; reference sans inferred, Low confidence).

## Assets
Avatar, 3 product photos and banner model cropped from the screenshot (heart buttons cropped out and rebuilt as buttons). Approximation; replace with originals.

## Responsive / states
Observed: mobile only. Inferred: 430px max column; chip row and product row scroll horizontally; nav sticky at bottom. Visible state: "Men's" chip active, Home tab active. Hover/focus inferred.

## Uncertainties
| Item | Confidence | Decision |
|---|---|---|
| Search pill offset | Medium | Match measured px |
| Sans font | Low | DM Sans |
| Banner model crop | Medium | Crop + edge mask |
| Third card width (cut off) | Medium | 290 |
