# Screenshot Analysis — Profile Screen

Reference: `design-requirement/design-image/profile-screen.png`, 941×1672, mobile portrait, top scroll, single screenshot. Scale via `--u = width/941`.

## Structure
```
Screen
├── Header: "My Profile" serif ≈62px (x52,y120) + "Style reflects who you are" 27px muted | bell w/ dot (x686–778,y117–208) + settings (x805–895) circles
├── User card x45–897,y246–450 (h205, radius 30, bg pill): avatar 172px w/ white pencil badge, name (serif 39px), email, phone (27px muted), "Edit Profile ›" right
├── Stats row y470–655, 4 tiles (w≈203, gap 15, radius 30): Wishlist 12, Orders 5, Addresses 3, Payment Methods 2 (icon 50, label 24, count 23 muted)
├── Menu card x45–897,y684–1245, white, radius 30: 7 rows h≈80 with hairline dividers — Personal Information, Manage Addresses, Payment Methods, Notifications, Promo Codes, Help & Support, Logout; leading icon 40, trailing chevron
├── Offers banner y1270–1495, bg #e9e1d1: "STYLE MORE YOU", "Exclusive Offers Just for You", "Explore Now →" brown pill, model photo right, "Better Style Brighter You"
└── Bottom nav: Profile active (beige pill), Cart badge 3
```
## Assets
Avatar reused from home crop; banner model reused from home banner. Approximation.

## Responsive / states
Observed: mobile only. Inferred: 430px column, nav fixed. Visible: Profile tab active. Rows/tiles are buttons with no destination yet (inferred).

## Uncertainties
| Item | Confidence | Decision |
|---|---|---|
| Icon glyphs | Medium | lucide equivalents |
| Banner text column width | Medium | fixed positions |
| Logout behavior | Low | visual only |
