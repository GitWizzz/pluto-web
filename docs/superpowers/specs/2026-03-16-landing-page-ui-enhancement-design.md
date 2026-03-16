# Landing Page UI Enhancement — Design Spec
**Date:** 2026-03-16
**Scope:** `/` — Landing page only
**Approach:** Bold Hero Image (Uber-inspired, dark theme, fully responsive)

---

## Constraints
- Colors unchanged: background `#000000`/`#0A0A0A`, primary green `#57B854`, surfaces `#111111`–`#1E1E1E`
- All existing text content, nav links, section copy, CTAs unchanged
- All routing and flow unchanged
- Form types/fields unchanged (no forms on Landing)
- Font: HelveticaNeue (unchanged)

---

## Section-by-section Design

### 1. Navbar
- Add `sticky top-0 z-50` positioning
- On scroll: `backdrop-blur-md bg-black/80 border-b border-[#1A1A1A]` — frosted glass effect
- Mobile: hide nav links, show hamburger icon (`Menu` from lucide-react). Tapping opens a slide-down menu overlay with links stacked vertically + "Book a ride" button full-width
- Desktop: unchanged layout

### 2. Hero Section
- Full viewport height (`min-h-dvh`)
- `hero.png` as CSS `background-image` with `bg-cover bg-center`
- Two-layer gradient overlay:
  - `linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 100%)`
  - Ensures top/bottom bleed into black, image visible in middle band
- Green radial glow behind headline: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(87,184,84,0.1), transparent)`
- All existing content (badge, h1, p, buttons) unchanged — just layered on top
- Mobile: `min-h-[75vh]`, heading scales `text-[32px]`, buttons stack vertically full-width

### 3. Stats Bar
- Move from inline floats to a dedicated glassmorphism card strip
- `bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-5`
- Sits inside a `max-w-lg mx-auto` container below the hero buttons
- Dividers: `border-r border-white/10` (last one hidden)
- Mobile: 3-column grid stays, just tighter padding

### 4. How It Works — Step Cards
- Add a horizontal dotted connector line between the 3 step icon circles on desktop
  - Implemented as an `absolute` positioned `border-t-2 border-dashed border-[#2C2C2C]` line spanning the grid, vertically centered on the icons
- Mobile: vertical dotted line on the left connecting the steps (absolute positioned)
- Cards: add `hover:border-primary/30 transition-colors duration-200`
- Step number label kept, icon circle slightly larger (`w-12 h-12`)

### 5. Features Grid
- Cards: add `hover:bg-[#161616] transition-colors duration-200`
- Add `border-l-2 border-transparent hover:border-primary transition-all duration-200` left accent
- Icon circle: add `shadow-[0_0_12px_rgba(87,184,84,0.2)]` subtle green glow
- Layout unchanged (2×2 desktop, 1 col mobile)

### 6. CTA Banner
- Wrap content in a `rounded-3xl border border-[#1E1E1E]` card
- Background: `radial-gradient(ellipse at center, rgba(87,184,84,0.08) 0%, transparent 70%)` inside the card
- This creates a subtle green atmospheric glow behind the headline
- Content and button unchanged

### 7. Footer
- Unchanged

---

## Responsive Breakpoints
| Breakpoint | Behavior |
|---|---|
| `< md` (< 768px) | Hamburger menu, hero text 32px, buttons full-width stacked, steps single col with vertical connector |
| `md` (768px+) | Nav links visible, hero text 64px, buttons inline, steps 3-col with horizontal connector |

---

## Assets
- `hero.png` already exists at `src/assets/hero.png` — used as hero background
- No new assets needed

---

## What Does NOT Change
- Route structure
- Text content (headings, descriptions, labels)
- Button actions / navigation targets
- Color palette
- Font family
- Component props / API calls
