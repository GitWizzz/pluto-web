# Landing Page UI Enhancement Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance `src/screens/Landing.tsx` with a bold hero image, glassmorphism stats bar, dotted step connectors, hover-interactive feature cards, and a glowing CTA banner — fully responsive on mobile — without changing any content, colors, routing, or form logic.

**Architecture:** All changes are confined to `src/screens/Landing.tsx`. A new `MobileMenu` state is added locally inside the component (no new store needed). The `hero.png` asset already exists at `src/assets/hero.png` and is referenced via Vite's asset import.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, lucide-react, react-router-dom v7

---

## Chunk 1: Navbar — Sticky Frosted Glass + Mobile Menu

### Task 1: Make navbar sticky with scroll blur effect

**Files:**
- Modify: `src/screens/Landing.tsx` (header element, lines 12–27)

- [ ] **Step 1: Add sticky + scroll-aware classes to `<header>`**

Replace the existing `<header>` opening tag:
```tsx
<header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
```
With:
```tsx
<header className="sticky top-0 z-50 border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/80">
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Expected: Navbar stays fixed at top when scrolling. Background becomes slightly translucent with blur over page content.

---

### Task 2: Add mobile hamburger menu

**Files:**
- Modify: `src/screens/Landing.tsx` (add state + mobile menu JSX)

- [ ] **Step 1: Add `Menu` and `X` to the lucide-react import and add `useState`**

Replace:
```tsx
import { ArrowRight, MapPin, Clock, Shield, Star } from 'lucide-react'
```
With:
```tsx
import { useState } from 'react'
import { ArrowRight, MapPin, Clock, Shield, Star, Menu, X } from 'lucide-react'
```

- [ ] **Step 2: Add `menuOpen` state inside the component**

After `const navigate = useNavigate()` add:
```tsx
const [menuOpen, setMenuOpen] = useState(false)
```

- [ ] **Step 3: Add hamburger button to navbar (mobile only)**

Inside `<header>`, after the `<nav className="hidden md:flex ...">` block, add:
```tsx
<button
  className="md:hidden text-[#808080] hover:text-white transition-colors"
  onClick={() => setMenuOpen(o => !o)}
  aria-label="Toggle menu"
>
  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
</button>
```

- [ ] **Step 4: Add mobile slide-down menu panel**

Just after the closing `</header>` tag, add:
```tsx
{/* Mobile nav menu */}
{menuOpen && (
  <div className="md:hidden sticky top-[57px] z-40 bg-black/95 backdrop-blur-md border-b border-[#1A1A1A] px-6 py-4 flex flex-col gap-4">
    <a
      href="#how"
      className="text-[#808080] hover:text-white text-[15px] transition-colors py-1"
      onClick={() => setMenuOpen(false)}
    >
      How it works
    </a>
    <a
      href="#features"
      className="text-[#808080] hover:text-white text-[15px] transition-colors py-1"
      onClick={() => setMenuOpen(false)}
    >
      Features
    </a>
    <Button
      variant="outline"
      className="w-full h-10 text-[14px] border-[#2C2C2C] bg-transparent text-white hover:bg-[#1A1A1A]"
      onClick={() => { setMenuOpen(false); navigate('/book') }}
    >
      Book a ride
    </Button>
  </div>
)}
```

- [ ] **Step 5: Verify in browser at mobile viewport (< 768px)**

Expected: Hamburger icon appears, tapping opens/closes the slide-down nav. Links close the menu when tapped.

- [ ] **Step 6: Commit**
```bash
git add src/screens/Landing.tsx
git commit -m "feat: sticky frosted navbar + mobile hamburger menu"
```

---

## Chunk 2: Hero Section — Background Image + Gradient Overlay + Green Glow

### Task 3: Hero background image with gradient overlay

**Files:**
- Modify: `src/screens/Landing.tsx` (hero `<section>`, line 31)

- [ ] **Step 1: Import hero image**

At the top of the file, after the existing imports, add:
```tsx
import heroBg from '@/assets/hero.png'
```

- [ ] **Step 2: Wrap the outer `<div>` to be `relative` and restructure hero section**

The outermost `<div>` already has `flex flex-col` — it needs `relative` for the hero overlay to work. Change:
```tsx
<div className="min-h-dvh bg-[#0A0A0A] flex flex-col">
```
To:
```tsx
<div className="min-h-dvh bg-[#0A0A0A] flex flex-col relative">
```

- [ ] **Step 3: Replace hero `<section>` with image background version**

Replace the entire hero `<section>` (lines 31–76) with:
```tsx
{/* Hero */}
<section
  className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 md:pt-40 md:pb-32 min-h-[75vh] md:min-h-dvh overflow-hidden"
  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Dark gradient overlay: top+bottom fade to black */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.88) 100%)',
    }}
  />
  {/* Green radial glow behind headline */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'radial-gradient(ellipse 55% 35% at 50% 45%, rgba(87,184,84,0.09), transparent)',
    }}
  />

  {/* Content — z-10 so it sits above overlays */}
  <div className="relative z-10 flex flex-col items-center">
    <span className="inline-block text-[12px] font-semibold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
      Smart Daily Commute
    </span>
    <h1 className="text-[36px] md:text-[64px] font-bold text-white leading-[1.05] tracking-tight max-w-3xl">
      Your daily ride,<br />
      <span className="text-primary">scheduled ahead.</span>
    </h1>
    <p className="mt-6 text-[#A0A0A0] text-[15px] md:text-[18px] leading-relaxed max-w-xl">
      Book a shared or solo cab for your regular commute. Set it once, ride every day.
      Affordable, reliable, and always on time.
    </p>

    <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full sm:w-auto px-4 sm:px-0">
      <Button
        onClick={() => navigate('/book')}
        className="w-full sm:w-auto h-12 px-8 text-[15px] font-semibold bg-primary hover:bg-primary/85 text-white shadow-[0_4px_24px_rgba(87,184,84,0.35)] rounded-xl"
      >
        Get Started <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <Button
        variant="outline"
        className="w-full sm:w-auto h-12 px-8 text-[15px] font-semibold border-[#2C2C2C] bg-transparent text-[#808080] hover:text-white hover:bg-[#1A1A1A] rounded-xl"
      >
        Download App
      </Button>
    </div>

    {/* Stats — glassmorphism strip */}
    <div className="mt-14 flex items-center gap-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {[
        { value: '10K+', label: 'Daily riders' },
        { value: '50+', label: 'Cities' },
        { value: '4.8★', label: 'Avg rating' },
      ].map(({ value, label }, i) => (
        <div key={label} className={`flex flex-col items-center px-7 py-4 ${i < 2 ? 'border-r border-white/10' : ''}`}>
          <span className="text-white font-bold text-[22px] md:text-[26px]">{value}</span>
          <span className="text-[#666] text-[11px] mt-0.5">{label}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Verify in browser**

Expected:
- Desktop: Full viewport hero with `hero.png` visible in the mid-zone, text readable on top
- Mobile: Image shows, buttons are full-width, stats bar fits cleanly
- Gradient fades image into black at top and bottom

- [ ] **Step 5: Commit**
```bash
git add src/screens/Landing.tsx
git commit -m "feat: hero background image with gradient overlay, green glow, glass stats"
```

---

## Chunk 3: How It Works — Dotted Step Connectors

### Task 4: Add dotted connector line between steps

**Files:**
- Modify: `src/screens/Landing.tsx` (How it works section, lines 79–102)

- [ ] **Step 1: Replace the How it works section**

Replace the entire `{/* How it works */}` section with:
```tsx
{/* How it works */}
<section id="how" className="px-4 py-16 border-t border-[#1A1A1A]">
  <div className="max-w-4xl mx-auto">
    <p className="text-center text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
    <h2 className="text-center text-[28px] md:text-[36px] font-bold text-white mb-12">Three steps to your daily ride</h2>

    {/* Steps grid with connector */}
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Desktop horizontal dotted connector line */}
      <div className="hidden md:block absolute top-[28px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] border-t-2 border-dashed border-[#2C2C2C] pointer-events-none" />

      {/* Mobile vertical dotted connector line */}
      <div className="md:hidden absolute left-[27px] top-[56px] bottom-[56px] border-l-2 border-dashed border-[#2C2C2C] pointer-events-none" />

      {[
        { step: '1', icon: MapPin, title: 'Set your route', desc: 'Enter your pickup and drop location for your daily commute.' },
        { step: '2', icon: Clock, title: 'Choose your schedule', desc: 'Pick your preferred time slot and commute days.' },
        { step: '3', icon: Star, title: 'Ride every day', desc: 'Get a reliable cab every morning without re-booking.' },
      ].map(({ step, icon: Icon, title, desc }) => (
        <div
          key={step}
          className="bg-[#111111] border border-[#1E1E1E] hover:border-primary/30 rounded-2xl p-6 flex flex-col gap-4 transition-colors duration-200 md:relative"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 relative z-10 bg-[#111111]">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] text-primary font-semibold uppercase tracking-wider mb-1">Step {step}</p>
            <h3 className="text-white font-semibold text-[16px] mb-1">{title}</h3>
            <p className="text-[#555] text-[13px] leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected:
- Desktop: Three cards in a row. A dotted line runs horizontally through the center of the icon circles connecting them.
- Mobile: Cards stack vertically. A dotted line runs vertically on the left side.
- Hovering a card shows a subtle green border.

- [ ] **Step 3: Commit**
```bash
git add src/screens/Landing.tsx
git commit -m "feat: dotted step connectors in how-it-works section"
```

---

## Chunk 4: Features + CTA Banner Polish

### Task 5: Feature cards with hover left-accent and icon glow

**Files:**
- Modify: `src/screens/Landing.tsx` (Features section, lines 104–128)

- [ ] **Step 1: Replace Features section**

Replace the entire `{/* Features */}` section with:
```tsx
{/* Features */}
<section id="features" className="px-4 py-16 border-t border-[#1A1A1A]">
  <div className="max-w-4xl mx-auto">
    <p className="text-center text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
    <h2 className="text-center text-[28px] md:text-[36px] font-bold text-white mb-12">Why riders choose Pluto</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { icon: Shield, title: 'Verified drivers', desc: 'All drivers are background-checked and rated by the community.' },
        { icon: Clock, title: 'Always on time', desc: 'Scheduled pickups so you never miss your office hours.' },
        { icon: Star, title: 'Shared & solo rides', desc: 'Split the cost with teammates or book a solo cab.' },
        { icon: MapPin, title: 'Door-to-door', desc: 'Pickup and drop exactly where you need, every day.' },
      ].map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="group flex items-start gap-4 bg-[#111111] border border-[#1E1E1E] hover:bg-[#161616] hover:border-primary/25 rounded-2xl p-5 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(87,184,84,0.15)] group-hover:shadow-[0_0_16px_rgba(87,184,84,0.3)] transition-shadow duration-200">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-[14px] mb-0.5">{title}</h3>
            <p className="text-[#555] text-[13px] leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: Hovering a feature card shows background darken, green border glow on icon circle intensifies, border subtly greens.

---

### Task 6: CTA banner with radial green glow card

**Files:**
- Modify: `src/screens/Landing.tsx` (CTA banner section, lines 130–142)

- [ ] **Step 1: Replace CTA banner section**

Replace the entire `{/* CTA banner */}` section with:
```tsx
{/* CTA banner */}
<section className="px-4 py-16 border-t border-[#1A1A1A]">
  <div className="max-w-2xl mx-auto">
    <div
      className="rounded-3xl border border-[#1E1E1E] px-8 py-12 text-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(87,184,84,0.07) 0%, transparent 70%), #0D0D0D',
      }}
    >
      <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-4">Ready to simplify your commute?</h2>
      <p className="text-[#555] text-[15px] mb-8">Book your first ride in under 2 minutes.</p>
      <Button
        onClick={() => navigate('/book')}
        className="h-12 px-10 text-[15px] font-semibold bg-primary hover:bg-primary/85 text-white shadow-[0_4px_24px_rgba(87,184,84,0.3)] rounded-xl"
      >
        Book a ride now <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: CTA section has a dark rounded card with a subtle green atmospheric glow in the background center. Content unchanged.

- [ ] **Step 3: Final full-page review**

Check:
- [ ] Desktop (1280px): Hero image visible, navbar sticky, stats glassmorphism strip, dotted horizontal connectors, feature hover states, CTA glow card
- [ ] Tablet (768px): All sections reflow correctly
- [ ] Mobile (375px): Hamburger menu works, hero buttons full-width stacked, step connector vertical, feature cards single column

- [ ] **Step 4: Commit**
```bash
git add src/screens/Landing.tsx
git commit -m "feat: feature card hover polish + CTA glow banner"
```

---

## Final Notes

- No new files created (hero.png already exists, all changes in Landing.tsx)
- No routing changes
- No store changes
- No content/copy changes
- Colors: exclusively uses existing palette (`#57B854`, `#0A0A0A`, `#111111`, `#1E1E1E`, `#2C2C2C`, `#555`, `#808080`)
