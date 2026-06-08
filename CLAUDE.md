# Liberation Language Labs — Design System

A modern, accessible, high-end product design language: **calm, affirming brand warmth** with a restrained **console/HUD edge**. It pairs the *personality* of the AQaddoura HUD system (two-tone display type, mono-caps labels, corner-bracket framing, side-rail accents) with the *engineering rigor* of the Sentry design analysis (explicit token scales, single-primary CTA hierarchy, two-polarity canvas, "two leading worlds", accent scarcity, accessibility-first).

> **Core idea:** it's a *system*, not a single color or a pile of effects. Hold the **structure** — token scales, type hierarchy, single-CTA discipline, two-polarity surfaces — and apply the brand **violet `#9b42b6`** (sourced from `public/assets/css/style.min.css` → `--bs-primary`) with restraint. Swap the accent to re-skin; never break the structure or the accessibility contract.

> **Audience note:** Liberation Language Labs serves families and neurodivergent clients. **Accessibility and calm are product requirements, not polish.** Beauty here means clarity, generous space, confident type, and *optional* flourish — never motion that can't be turned off (see §10). Sources: AQaddoura HUD · Sentry DESIGN.md analysis · brand `style.min.css`.

---

## 1. Principles

1. **Two-polarity canvas.** Every surface commits to **one** polarity — light (brand-native, default) or dark (plum-tinted HUD). Never blend the two in a single band. Light owns content/transactional surfaces; dark owns cinematic hero/feature moments.
2. **One primary action per view.** A single, unmistakable filled CTA. Everything else is secondary (outline) or tertiary (ghost/link). Authority comes from hierarchy, not from many loud buttons.
3. **Accent scarcity.** Treat the violet accent — and especially the amber *highlight chip* — as rare. Aim for **one signature accent moment per viewport**. Rarity is what makes it read as intentional.
4. **Two leading worlds.** Marketing/prose runs airy (`line-height ~1.7–2.0`); functional UI runs dense (`~1.4–1.5`). The leading difference is deliberate and load-bearing.
5. **Depth from layering, not heavy shadow.** Prefer surface steps, hairlines, and subtle texture over big drop shadows. Violet-tinted shadows are reserved for true elevation (modals, hover-lift).
6. **Accessibility is the floor.** WCAG **AA minimum** for all text/controls (target AAA for body), visible focus, 44px targets, and motion that fully respects `prefers-reduced-motion`. A composition that fails these is off-brand by definition.
7. **Signature, not costume.** HUD elements (corner brackets, side rails, scanlines, mono labels) are *seasoning* — 1–2 per view, never required, always optional/calm.

---

## 2. Color System

Brand palette extracted from `style.min.css`. **Do not introduce new hues** beyond these — extra accents dilute the violet-led signature.

| Role | Token | Value | Source |
|------|-------|-------|--------|
| **Accent / primary** | `--acc` | `#9b42b6` (violet) | `--bs-primary` |
| Accent — soft | `--acc-soft` | `#bb63d4` | tint |
| Accent — deep | `--acc-deep` | `#5e2473` | shade (text-on-light safe) |
| Accent glow | `--glow` | `rgba(155,66,182,0.40)` | primary @ 40% |
| Secondary | `--secondary` | `#3d759c` (steel blue) | `--bs-secondary` |
| Tertiary / link-hover | `--teal` | `#3da1a5` (teal) | `--bs-link-hover-color` |
| **Highlight chip** | `--amber` | `#f7ab1e` (amber) | brand highlight |
| Ink / heading | `--txt` | `#293039` | `--bs-dark` |
| Body text | `--txt2` | `#51565d` | `--bs-body-color` |
| Muted text | `--muted` | `#8c8f92` | most-used grey |
| Border / line | `--line` / `--line-soft` | `#c9ced3` / `#e0e4e8` | `--bs-border-color` |

**Surfaces — light (default canvas):** background `#ffffff` · subtle `#f6f8fb` · soft `#eef3f7`. Cards are white separated by **hairlines**, not tonal fills.

**Surfaces — dark (plum-tinted HUD):** background `#0d0a12` · panel `#141019` · card `#1b1622` · line `rgba(255,255,255,0.09)` · text `#ffffff` / secondary `#c9b9d4` / muted `#8f8499`.

**Semantic state** (read as *state*, not brand — keep stable across re-skins): success `#22C55E` · warning/in-flight `#f7ab1e` · queued/neutral `#475569` · error `#dc4b48`. **Never signal state with color alone** — pair with an icon, label, or shape.

**Focus ring:** `--ring: rgba(155,66,182,0.55)` → render as `outline: 2px solid var(--acc); outline-offset: 2px`. Must keep ≥3:1 against its background in both polarities.

**Accent-text contrast rules** (memorize):
- On **white**: `--txt` (AAA), `--txt2` (AAA), `--acc #9b42b6` (AA ~4.6:1, ok for ≥16px/bold or large). For small accent text use **`--acc-deep #5e2473`**. `--muted #8c8f92` is **large-text/non-essential only** (~3.4:1).
- On **plum-dark**: body `#ffffff`/`#c9b9d4`; accent *text* uses the brighter **`#cf86e6`** or `--acc-soft` (the base violet is too dim on dark).
- `--amber` and the lime-style chip are **chip backgrounds with ink text**, never text on white.

---

## 3. Typography

Three families: **Inter** (display + body), **JetBrains Mono** (labels, code, data), and **Cairo** for Arabic/RTL. Optional: **Space Grotesk** for a chunkier marketing hero display.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
<!-- Arabic: add family=Cairo:wght@300;400;600;700;800;900 · Optional hero: family=Space+Grotesk:wght@500;700 -->
```

### Scale

| Token | Size (clamp) | Weight | Line-height | Tracking | Use |
|-------|------|--------|-------------|----------|-----|
| `display-hero` | `clamp(2.75rem, 6vw, 5.5rem)` | 900 | 0.95 | -0.03em | Marketing hero (one per page). **Two-tone** or one **amber chip** keyword. |
| `display-lg` | `clamp(2rem, 4vw, 3.25rem)` | 800 | 1.05 | -0.02em | Section openers |
| `heading-xl` | `1.875rem` | 700 | 1.2 | -0.01em | Page titles |
| `heading-lg` | `1.5rem` | 700 | 1.25 | 0 | Card / section headings |
| `heading-md` | `1.25rem` | 700 | 1.3 | 0 | Sub-headings |
| `body-lg` | `1.0625rem` | 400 | **1.8** | 0 | Marketing prose (airy world) |
| `body` | `1rem` | 400 | **1.5** | 0 | Default UI body (dense world) |
| `eyebrow` | `0.8rem` | 700 | 1.4 | **0.16em** | Mono-caps label above headings |
| `label` / group-head | `0.8–0.95rem` | 800 | 1.3 | 0.14em | **Mono UPPERCASE** section labels (sidebar/dashboard) |
| `button-cap` | `0.875rem` | 700 | 1.15 | **0.02em** | Button text, UPPERCASE |
| `micro-cap` | `0.65rem` | 700 | 1.6 | 0.18em | Badges, status, tags |
| `code` | `0.9rem` | 400 | 1.5 | 0 | Code / data, JetBrains Mono |

**Rules:**
- **Two-tone hero:** first word ink/white, key word `--acc`; *or* wrap one keyword in an **amber highlight chip** (`§7`). One device per hero, never both.
- **Mono-caps labels** (eyebrows, group headings, button caps) carry the "console" cadence. When `font-weight:800` on JetBrains Mono, **load the 800 axis** (above) or it renders faux-bold.
- **Two leading worlds:** `body-lg` 1.8 for prose, `body` 1.5 for UI. Don't average them.
- **RTL / Arabic:** swap display+body to **Cairo**, set `dir="rtl"`, mirror directional CSS (`border-inline-start`, rail sides, `margin-inline`). Keep JetBrains Mono for latin/mono.

---

## 4. Spacing & Layout

**8px base scale:** `2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`. Tokens: `--sp-xxs 2 · xs 4 · sm 8 · md 12 · lg 16 · xl 24 · xxl 32 · section 96`.

- **Section rhythm:** `96px` between major bands on desktop → `48px` → `32px` on mobile.
- **Card padding:** `24–32px`; compact groups `16px`.
- **Form fields:** `8px` vertical · `12px` horizontal, min height **44px**.
- **Container:** centered, max-width `~1152px`, generous outer gutters.
- **Whitespace philosophy:** hero/feature surfaces breathe; transactional surfaces (forms, tables, pricing) tighten — users there are scanning and acting.

### Fixed sidebar / console layout (app shell + admin)

A **permanently visible, fixed, full-height** left sidebar; only the content area scrolls.

- **Pin:** `position: sticky; inset-block-start: 0; height: 100dvh` so it stays in the layout grid (never `position: fixed` with a forced grid override — that shifts content). Width via `--nav-width` (~264px). Content sits in the adjacent grid column.
- **Three zones** (flex column, `height:100%`): **brand header** (pinned top, logo + mono `● ONLINE`) → **nav scroll** (`flex:1; overflow:hidden` for a strict no-scrollbar console, or `overflow-y:auto` if items exceed the viewport) → **account footer** (pinned bottom).
- **Treatment:** panel surface, 1px inner border, an inner **accent rail** down the edge; mono-caps group labels; nav rows are **rounded pills** with a calm `background + 1px border` hover/active (no underline, no inset-shadow).
- **Responsive:** at `≤1024px` collapse to an off-canvas drawer (slide-in, dimmed overlay, hamburger). Never trap mobile users behind a forced-open panel.

---

## 5. Shape & Radius

| Token | Value | Use |
|-------|-------|-----|
| `--r-xs` | 4px | badges, status pills, **highlight chip** |
| `--r-sm` | 6px | inputs, search |
| `--r-md` | 8px | buttons, code blocks, selects |
| `--r-lg` | 10px | generic containers |
| `--r-xl` | 14px | cards, nav chrome |
| `--r-xxl` | 18px | image/media frames, large feature cards |
| `--r-full` | 9999px | avatars, dots, circular icon buttons |

**Signature asymmetric corner:** `border-radius: 40px 0 40px 0` (and `75px 0 75px 0` at hero scale) is a brand flourish carried from `--bs-border-radius-xl`. Use sparingly on hero media / feature cards.

---

## 6. Elevation & Depth

Depth comes first from **surface steps + hairlines**, then shadow. Violet-tinted shadows only for genuine lift.

| Level | Shadow | Use |
|-------|--------|-----|
| 0 | none | default surfaces (light or dark), flat-on-canvas |
| 1 | `0 1px 2px rgba(41,48,57,0.06)` | resting cards on light |
| 2 | `0 10px 30px rgba(155,66,182,0.10)` | hover-lift cards (`translateY(-4px)`) |
| 3 | `0 20px 40px rgba(155,66,182,0.18)` | modals, popovers, focused feature card |

On **dark** canvas, prefer the inner accent glow / hairline over drop shadows (shadows muddy the plum). Optional texture: faint dot/grid or a low-opacity radial accent fade for atmosphere — never enough to reduce text contrast.

---

## 7. Components

Spec format: **Default** + **states**. Every interactive element needs **`:hover`, `:active`, `:focus-visible`, and `:disabled`.**

### Buttons (single-primary hierarchy)
- **Primary** — filled `--acc`, white text, `button-cap` UPPERCASE, padding `12px 20px`, `--r-md`, min 44px tall. Hover → `--acc-soft`; active → `--acc-deep`; focus-visible → ring. One per view.
- **Secondary** — transparent fill, 1px `--acc` border, accent text. Hover → `8% accent` wash.
- **Ghost / tertiary** — no border; text/icon only; accent on hover.
- **On dark canvas** — primary may invert to a white fill with ink text (keep it the single most authoritative affordance).
- **Disabled** — `--line` fill, `--muted` text, `cursor:not-allowed`, `aria-disabled`.

### Cards
- Light: `#ffffff`, 1px `--line` border, `--r-xl`, padding `24–32px`. Hover lifts `-4px` to elevation-2.
- Dark: `#1b1622`, `rgba(255,255,255,.09)` border, inner accent rail/glow instead of shadow.
- **Featured = inversion**, not an accent border (dark tile among light, or a `--acc-deep` spotlight) — the brand voice carries the emphasis.

### Inputs & forms
- Fill `#ffffff` (light) / `#141019` (dark), 1px `--line`, `--r-sm`, padding `8px 12px`, min 44px.
- **Focus-visible:** accent border + `--ring`. Always pair label + field; show errors with **icon + text + `--error`**, never color alone.

### Pills, badges & the highlight chip
- **Status pill:** mono `micro-cap`, 1px accent border, `8% accent` fill, `--r-full`. A live dot is **optional and reduced-motion-gated**.
- **Highlight chip** (signature, scarce): wraps **one keyword** inside a display headline — `--amber` fill, ink text, `--r-xs`, padding `0 12px` (hugs cap-height). One per viewport; a typographic device, not a button. Amber stays a *chip*, never body text.

### Navigation & links
- **Sidebar rows:** rounded pills; hover/active = soft accent background + 1px accent border (no underline, no inset shadow); roomy padding; mono-caps group labels.
- **Inline links:** persistent underline is the affordance; hover shifts to `--teal`/`--acc-soft`. Underline never removed for sighted affordance.

### Code / data
- `code` token, `#141019` fill on dark / `#f6f8fb` on light, `--r-md`, `16px` pad; never scales below readable; horizontal-scroll on overflow rather than wrap.

---

## 8. Signature HUD Elements (optional, ≤2 per view)

Calm, restrained, **always reduced-motion-gated**. Pick **one or two**, never the whole arsenal.

1. **Corner brackets** — four L-shaped accent lines framing a transparent box (`.hud-box`, below).
2. **Side rails** — thin vertical accent bars at the page edges; static glow by default, gentle pulse only if motion is allowed.
3. **Mono-caps labels** — the everyday signature; cheap, accessible, always on.
4. **Two-tone display / amber keyword chip** — the hero device.
5. **Scanline** — a 1px accent sweep; **off** under reduced-motion, and never on text-critical regions.
6. **Status pill with live dot** — `● ONLINE`; dot animation optional.

```css
/* Corner-bracket box */
.hud-box{ position:relative; padding:1.6rem; border:1px solid var(--line); border-radius:var(--r-xl); }
.hud-box::before,.hud-box::after,.hud-box>.br-tl,.hud-box>.br-br{
  content:""; position:absolute; width:14px; height:14px; border:2px solid var(--acc); }
.hud-box::before{ top:-1px; left:-1px;  border-right:none; border-bottom:none; }
.hud-box::after { top:-1px; right:-1px; border-left:none;  border-bottom:none; }
.hud-box>.br-tl { bottom:-1px; left:-1px;  border-right:none; border-top:none; }
.hud-box>.br-br { bottom:-1px; right:-1px; border-left:none;  border-top:none; }

/* Mono accent label / eyebrow */
.label{ font-family:'JetBrains Mono',monospace; font-weight:800; font-size:.8rem;
  letter-spacing:.14em; text-transform:uppercase; color:var(--label); }

/* Two-tone hero + amber keyword chip */
.hero-title{ font-weight:900; line-height:.95; letter-spacing:-.03em; font-size:clamp(2.75rem,6vw,5.5rem); }
.hero-title .accent{ color:var(--acc); }
.hero-title .chip{ background:var(--amber); color:var(--txt); border-radius:var(--r-xs); padding:0 .5rem; }

/* Status pill */
.status{ display:inline-flex; align-items:center; gap:.5rem; font-family:'JetBrains Mono',monospace;
  font-size:.65rem; letter-spacing:.16em; text-transform:uppercase; padding:.32rem .8rem;
  border-radius:var(--r-full); border:1px solid color-mix(in srgb,var(--acc) 55%,transparent);
  background:color-mix(in srgb,var(--acc) 8%,transparent); color:var(--txt); }
.status .dot{ width:8px; height:8px; border-radius:50%; background:var(--done); box-shadow:0 0 8px var(--done); }
```

---

## 9. Motion

Purposeful and short. **Easing:** `cubic-bezier(.2,.7,.2,1)` (entrances) · `ease-in-out` (loops). **Durations:** micro `120ms` · UI `180–250ms` · ambient loops `4–9s`.

```css
@keyframes rise   { from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:none} }
@keyframes pulse  { 0%,100%{opacity:.55} 50%{opacity:1} }
@keyframes scan   { 0%{transform:translateY(0);opacity:0} 10%,90%{opacity:1} 100%{transform:translateY(420px);opacity:0} }
```

**Reduced-motion contract (mandatory):** every loop, scan, pulse, blink, float, and hover-transform is disabled or stilled under the query below. This is non-negotiable for our audience.

```css
@media (prefers-reduced-motion: reduce){
  *{ animation:none !important; }
  .scan,.side-rail,.status .dot{ animation:none !important; }
  .rise{ opacity:1 !important; transform:none !important; }
  /* keep essential transitions ≤ 1 frame or remove */
}
```

---

## 10. Accessibility (non-negotiable)

- **Contrast:** body/UI text **AA (4.5:1) minimum**, target **AAA (7:1)** for sustained reading; large/bold text and UI borders **≥3:1**. Use the §2 contrast rules (e.g. `--acc-deep` for small accent text on white; `#cf86e6` for accent text on dark; `--muted` for large/non-essential only).
- **Never color alone:** state, validation, and meaning always carry an icon, label, or shape too.
- **Focus visible:** every interactive element shows `--ring` on `:focus-visible` (2px solid `--acc`, 2px offset, ≥3:1). Never remove outlines without a replacement.
- **Targets:** interactive controls **≥44×44px**; pills/badges enlarge rather than shrink on mobile.
- **Motion:** honor `prefers-reduced-motion` fully (§9). No content conveyed only through motion; nothing flashes >3×/sec.
- **Semantics & SR:** real landmarks/headings order; decorative HUD elements are `aria-hidden`; icon-only buttons get `aria-label`; forms get associated `<label>`s and `aria-describedby` for errors.
- **Calm by default:** prefer the light, low-stimulation canvas for content the audience must read; reserve dark/cinematic surfaces for marketing moments.

---

## 11. Design Tokens

### CSS custom properties (framework-agnostic — light default, dark override)
```css
:root{
  /* surfaces — light (default) */
  --bg:#ffffff; --subtle:#f6f8fb; --soft:#eef3f7; --panel:#ffffff;
  --line:#c9ced3; --line-soft:#e0e4e8;
  --txt:#293039; --txt2:#51565d; --muted:#8c8f92;
  --label:#9b42b6;                 /* mono-caps label color (AA on white) */
  /* accent + brand supports */
  --acc:#9b42b6; --acc-soft:#bb63d4; --acc-deep:#5e2473; --glow:rgba(155,66,182,.40);
  --secondary:#3d759c; --teal:#3da1a5; --amber:#f7ab1e;
  --ring:rgba(155,66,182,.55);
  /* state */
  --done:#22C55E; --flight:#f7ab1e; --queued:#475569; --error:#dc4b48;
  /* radius */
  --r-xs:4px; --r-sm:6px; --r-md:8px; --r-lg:10px; --r-xl:14px; --r-xxl:18px; --r-full:9999px;
  /* spacing (8px base) */
  --sp-xs:4px; --sp-sm:8px; --sp-md:12px; --sp-lg:16px; --sp-xl:24px; --sp-xxl:32px; --sp-section:96px;
  /* shell */
  --nav-width:264px;
}
html[data-theme='dark']{
  --bg:#0d0a12; --subtle:#141019; --soft:#1b1622; --panel:#141019;
  --line:rgba(255,255,255,.09); --line-soft:rgba(255,255,255,.06);
  --txt:#ffffff; --txt2:#c9b9d4; --muted:#8f8499;
  --label:#cf86e6;                 /* brighter for contrast on plum-dark */
  --glow:rgba(155,66,182,.50);
}
```

### Tailwind preset
```js
// tailwind.config.js → theme.extend
colors:{
  bg:{ DEFAULT:'#ffffff', subtle:'#f6f8fb', soft:'#eef3f7' },
  bgdark:{ DEFAULT:'#0d0a12', panel:'#141019', card:'#1b1622' },
  line:{ DEFAULT:'#c9ced3', soft:'#e0e4e8', dark:'rgba(255,255,255,0.09)' },
  text:{ ink:'#293039', body:'#51565d', muted:'#8c8f92' },
  accent:{ DEFAULT:'#9b42b6', soft:'#bb63d4', deep:'#5e2473', glow:'rgba(155,66,182,0.40)' },
  brand:{ secondary:'#3d759c', teal:'#3da1a5', amber:'#f7ab1e' },
  state:{ done:'#22C55E', flight:'#f7ab1e', queued:'#475569', error:'#dc4b48' },
},
borderRadius:{ xs:'4px', sm:'6px', md:'8px', lg:'10px', xl:'14px', '2xl':'18px' },
fontFamily:{ sans:['Inter','system-ui','sans-serif'], mono:['JetBrains Mono','monospace'] },
```

---

## 12. Do's & Don'ts

**Do**
- Commit each surface to one polarity; let light own content, dark own cinematic moments.
- Keep one primary CTA, one accent moment, one hero device per view.
- Pair `button-cap` UPPERCASE + tracking on buttons; mono-caps on labels.
- Default UI body to 1.5 leading, marketing prose to 1.8.
- Earn emphasis through inversion/hierarchy before reaching for a new color.

**Don't**
- Don't add hues beyond the brand set, or put `--amber`/chip colors into body text.
- Don't force the sidebar open by overriding the layout grid or `position:fixed` — it shifts content; use `sticky` within the grid.
- Don't ship motion that ignores `prefers-reduced-motion`, or signal meaning with color alone.
- Don't stack heavy drop shadows on dark canvas; use hairlines, rails, and surface steps.
- Don't scatter HUD effects — >2 per view reads as costume, not craft.

---

## 13. Re-skin checklist

1. Replace `--acc` / `--acc-soft` / `--acc-deep` (+ `--glow`, `--label`, `--ring`) with the new hue's tint/shade — re-verify §2 contrast for both polarities.
2. Keep state colors (green/amber/grey/red) — they read as state, not brand.
3. Keep the token scales, type hierarchy, single-CTA discipline, two-polarity rule, and the **accessibility contract** unchanged.
4. Keep the signatures sparing and reduced-motion-gated.

Fidelity to the **system and the accessibility floor** — not any single color — is what makes it Liberation Language Labs.

---

*Synthesis of the AQaddoura HUD system and the Sentry DESIGN.md analysis, tuned to the Liberation Language Labs brand (`public/assets/css/style.min.css`). Accessibility-first by design.*
