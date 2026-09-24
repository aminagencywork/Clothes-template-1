# Sign In / Sign Up – Screenshot Analysis

## 1. Reference
- `design-requirement/design-images/signin-signup-screen.png` (1312 × 1199), two mobile mockups side by side: **Log In** (left) and **Create Account** (right).
- Each phone screen is ~530 px wide (x 70→600 and x 712→1244). Scale to the project's 941-unit grid: **1 screenshot px ≈ 1.78u** (`--u`).
- Status bar / dynamic island belong to the device mockup and are not implemented.

## 2. Structure
```
Page (cream #faf6f3)
├── Hero (relative)
│   ├── Back button (circle, top-left)
│   ├── Greeting (top-right, right-aligned): title + emoji, muted subtitle
│   ├── Hero image (right ~50% of width, fades into the background)
│   ├── Logo (Hoodiez mark + wordmark + "WEAR YOUR MOOD")
│   └── Heading + supporting copy
└── Sheet (near-white, rounded top ~70u, soft top shadow)
    ├── Fields (icon + input; password has eye toggle)
    ├── [Sign in] Forgot Password? (right)   [Sign up] terms checkbox
    ├── Primary button (black pill, text + →)
    ├── Divider "or continue with"
    ├── Social buttons ×3 (Google / Apple / Facebook)
    └── Footer switch link ("Don't have an account? Sign Up" / "Already have an account? Log In")
```

## 3. Measurements (screenshot px → u)
| Element | Screenshot | Units |
|---|---|---|
| Side padding | ~30 px | 53u |
| Back button | 52 px circle, white, soft shadow | 92u |
| Greeting title / subtitle | 18 / 16 px | 32u / 28u |
| Logo wordmark | ~40 px | ~69u (HoodiezLogo stacked × 0.75) |
| "Log In" / "to your account" | 44 / 28 px | 78u / 50u |
| "Create Your Account" | 40 px, 2 lines | 72u |
| Supporting copy | 17–18 px, muted | 31u |
| Hero image | x 300→600, y 165→580 | right 0, ~52% width |
| Sheet top (sign in / sign up) | y ≈ 552 / 490 from screen top | overlaps hero by radius |
| Input | h 64 px, r 20 px, gap 16 px | 112u, r 36u, gap 26u |
| Input icon / text | 22 / 17 px | 40u / 30u |
| Primary button | h 74 px, full width | 130u, text 38u |
| Social buttons | h 60 px, 3 cols, gap 10 px | 104u, gap 18u, text 28u |
| Footer | 17 px | 30u |

## 4. Typography
Plus Jakarta Sans (project font). Headings extrabold, tight tracking; body regular muted (#6f6f6f); links/labels semibold ink.

## 5. Colours
Hero bg `#faf6f3`; sheet `#fcfbfa`; input bg `#f3f3f5`; ink `#111`; muted `#6f6f6f`; social buttons white with `black/8%` ring; checkbox ink filled.

## 6. Assets
- Hero hoodies cropped from the reference: `public/images/auth-signin.jpg` (white "Good Things Ahead"), `public/images/auth-signup.jpg` (black "Better Days Ahead"), upscaled ×2 — approximation.
- Logo: the design shows a three-stripe mark; the project already swapped to the Vyntra logo (`public/images/navbar-logo.png`), so that is reused.
- Google / Apple / Facebook marks: inline SVG (lucide has no brand icons).

## 7. Components
`AuthScreen` (`mode: "signin" | "signup"`) in `components/auth-screen.tsx`, with local `Field`, `SocialButtons`. Routes `/signin`, `/signup`. Dummy auth in `lib/auth.ts`.

## 8. Responsive
Observed: mobile only. Inferred: same 430 px max-width column as the rest of the app, `--u` scaling with container width.

## 9. States
Visible: password masked with eye toggle; terms checkbox checked. Inferred: error message on bad credentials, eye toggles visibility, pressed scale on buttons.

## 10. Implementation plan
1. Get Started on onboarding → `/signin`.
2. Sign in pre-filled with demo credentials (`demo@vyntra.com` / `vyntra123`); success → `/home`, failure → inline error.
3. Sign up validates fields + terms, stores the account locally, → `/home`.
4. Social buttons log in as the demo user.

## 11. Uncertainties
| Item | Observation | Confidence | Decision |
|---|---|---|---|
| Hero image | Only low-res in screenshot | High | Crop + upscale; replace with real photos later |
| Logo | Design shows stripes | High | Use existing Hoodiez mark for consistency |
| Forgot password | No flow shown | Low | Show demo-credentials hint |
| Back target | Not shown | Medium | History back, fallback `/` |

## 12. Checklist
- [x] Hierarchy  - [x] Geometry  - [x] Typography  - [x] Colours  - [x] Assets  - [x] Components  - [x] Responsive  - [x] States  - [x] Content  - [x] Uncertainties  - [x] Plan
