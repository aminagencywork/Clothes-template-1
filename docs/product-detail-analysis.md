# Screenshot Analysis — Product Detail Screen

Reference: `design-requirement/design-image/product-detail-screen.png`, 941×1672, mobile portrait, top scroll, single screenshot. Scale via `--u = width/941`.

## Structure
```
Screen
├── Top bar y100–192: back circle (x49–141) | heart + share circles (x679–893), 92px
├── Gallery y215–978: main image x55–677 (622×765, radius ≈40) with "12% Off" pill (top-left), "1 / 4" counter (bottom-left), expand button (bottom-right)
│   + 4 thumbnails x693–888 (195 wide, stacked, gap 16, radius ≈26); first has brown ring (selected): front, back, collar detail, fabric
├── Title "Formal Shirt" serif ≈62px | ★ 4.8 (320)
├── Description 27px muted, 2 lines
├── Price $578.90 (56px bold) + strikethrough $659.00 + "12% Off" green-tint pill
├── Size row: "Size : S", "Size Guide ›"; chips S M L XL XXL (h68, S active brown)
├── Color row: "Color : White", 5 swatches 62px (white selected with ring), navy, olive, sand, sky
└── Bottom bar (white, radius ≈34, shadow, h≈132): quantity stepper (− 1 +) + brown "Add to cart 🛒" button
```
## Assets
Main + thumbnails cropped from the screenshot (badge/counter/expand overlays avoided). Only this product has a 4-image gallery; other products show a single image.

## Responsive / states
Observed: mobile only. Inferred: 430px column; bottom bar fixed. Visible: thumbnail 1, size S, color White selected. Interaction inferred: thumbs swap main image; chips/swatches select; stepper 1–10.

## Uncertainties
| Item | Confidence | Decision |
|---|---|---|
| Thumbnail crops | Medium | crop inside rounded corners |
| Color names | Low | hex → name map |
| Sizes for non-shirt products | Low | shoes numeric, kids years, accessories one size |
