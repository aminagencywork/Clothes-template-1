# Screenshot Analysis — Onboarding / App Interface Screen

## 1. Reference Information
- File: `design-requirement/design-image/app-interface-screen.png`
- Size: 941 × 1672 px (mobile portrait, ~9:16). One screenshot; all 8 references share this size.
- Classification: mobile. Scroll position: top, no scroll (single fixed screen).
- Limitations: no separate photo/asset files supplied; photos are cropped from the screenshot. Fonts unidentified.

## 2. Page Structure
```
Screen (941×1672, cream bg)
├── Status bar (9:41, signal/wifi/battery)   [device chrome, not implemented]
├── Photo collage
│   ├── Card A (left, rotated ≈ -8°, bleeds off left edge)
│   ├── Card B (right, rotated ≈ +8°)
│   └── Dash-dot decoration (top right)
├── Headline (staggered, mixed scale)
├── Pagination dots (3, middle active)
├── CTA "Get Started" (blob + hand-drawn outline)
└── Background decor: beige blobs (left/bottom right), black scribble line (bottom left)
```

## 3. Measurements (px in 941×1672; % = of width/height)
| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| Card A | -20 | 100 | ~415 | ~545 | rot ≈ -8°, radius ≈ 50 (inferred) |
| Card B | 390 | 230 | ~470 | ~545 | rot ≈ +8°, radius ≈ 50 |
| Dashes | 735 | 172 | 125 | 100 | 5 rows of rounded dashes, olive/grey |
| Headline | 105 | 800 | 745 | 400 | 3 lines, see typography |
| Dots | 408–532 | 1320 | 124 | 24 | 3 dots ⌀≈24, gap≈24 |
| CTA | 297 | 1405 | 345 | 140 | pill blob + outline ellipse offset |
| Blob left | -100 | 1160 | ~330 | ~500 | pale beige |
| Blob right | 770 | 1360 | 250 | 312 | pale beige |

## 4. Typography
Display high-contrast serif (looks like a "Gloock/Fraunces"-style face); inferred **Playfair Display**-like → use `Gloock` / fallback serif.

| Element | Size (of 941w) | Weight | Notes |
|---|---|---|---|
| "Start", "Version the", "Style" | ~110px (≈11.7vw) | 400 | large, dark `#221a12` |
| "finding your", "best fashion" | ~55px (≈5.8vw) | 400 | small, baseline aligned to big word |
| Button | ~48px | 400 | same serif |

Copy: line 1 `Start` + `finding your`; line 2 `Version the`; line 3 `best fashion` + `Style`. Line 1 is centered-left, line 3 right-aligned.

## 5. Colors (estimated)
- Page bg `#fbf9f4`; blob `#f4ede1`; CTA blob `#e6e0cf`; text `#231a10`; dots inactive `#d9d3c4`, active `#231a10`; dash decor `#aaa78f`; photo card bg `#d4d0bd`.
- Shadows: none visible. Radii: cards ≈ 5% of width.

## 6. Assets
- Photos: cropped from screenshot → `public/images/onboarding-photo-{1,2}.jpg` (approximation; replace with originals when supplied). Crop taken from inside rotated card, rotation and radius re-applied in CSS.
- Blobs, dashes, scribble, CTA outline: inline SVG.

## 7. Components
- `OnboardingScreen` (page composition), `PaginationDots` (count, active), `Squiggle` decorations inline. Button is a Next `Link` (target `/home` inferred).

## 8. Responsive
- Observed: mobile only. Inferred: design is authored as a phone screen; on larger viewports render it centered in a max-width 430px column. All sizes use `%`/`cqw` container units so it scales with the column.

## 9. Interaction
- Observed: dot 2 of 3 active. Inferred: dots reflect onboarding step; button navigates on. Hover/active states not visible; add subtle scale.

## 10. Implementation Plan
Container with `container-type: inline-size`; absolute-positioned elements using `cqw`/`%` from the measurements; fonts via `next/font` (Gloock); tokens in `globals.css` `@theme`; decorations as SVG.
Risks: hand-drawn scribble/outline are approximated; photo crops lower fidelity.

## 11. Uncertainties
| Item | Observation | Confidence | Decision |
|---|---|---|---|
| Font | High-contrast serif | Low | Gloock |
| Photos | Only in screenshot | Medium | Crop |
| Scribble path | Hand drawn | Low | Approximate SVG path |
| Status bar | Device chrome | High | Omit |

## 12. Completion Check
All items above completed.
