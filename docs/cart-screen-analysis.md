# Screenshot Analysis — Cart Screen

Reference: `design-requirement/design-image/product-cart-screen.png`, 941×1672, mobile portrait, top scroll, single screenshot. Scale via `--u = width/941`.

## Structure
```
Screen
├── Header y88–175: back circle (x43–131) | centered title "My Cart" serif ≈52px + "Review your items before checkout" 24px muted | "•••" circle (x809–897)
├── "3 Items" right-aligned y211
├── 3 item cards x48–897, h≈222, gap 20, radius ≈28: image x55–260 (205w, radius ≈24), serif name 30px, price 34px bold + strikethrough, "Size: S", "Color: White", 4–5 swatches 36px (selected ringed), vertical quantity pill (+ / n / −, 65×158), trash icon
│   Formal Shirt $578.90/$659.00 S White; Casual Shirt $294.29/$349.00 M Light Blue; Air Force 1 $149.00/$179.00 size 9 White Grey
├── Promo card y972–1072: tag icon circle, "Promo Code or Gift Card / Save more on your purchase", "Apply" pill
├── Order Summary y1093–1358: Subtotal (3 items) $1,022.19; Discount -$102.22 (green); Shipping $08.00; divider; Total $927.97 (bold)
├── Checkout button y1375–1462 (h88, radius ≈24, brown): lock + "Proceed to Checkout" + arrow; "Secure and encrypted payment" note with shield
└── Bottom nav: Cart active (beige pill), badge 3
```
## Derived numbers
Discount = 10% of subtotal (102.219). Total = subtotal − discount + $8 shipping = 927.97 ✓ (inferred rule).

## Assets
Item photos reuse existing product crops (Formal Shirt/Casual Shirt/sneakers).

## Responsive / states
Observed: mobile only. Inferred: 430px column; nav fixed. Inferred interactions: qty ± (1–10), trash removes, swatches select, empty state.

## Uncertainties
| Item | Confidence | Decision |
|---|---|---|
| Discount rule | Medium | flat 10% |
| Shipping "$08.00" formatting | High | rendered as $8.00 |
| Promo apply behaviour | Low | visual only |
