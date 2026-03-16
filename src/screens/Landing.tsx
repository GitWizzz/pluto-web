import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, MapPin, Clock, Shield, Star, Menu, X,
  Users, Zap, CalendarDays, BadgeCheck, Smartphone, CheckCircle2, Quote
} from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ─── Static data ─────────────────────────────────────────── */

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80'

const STEPS = [
  {
    step: '01',
    icon: MapPin,
    title: 'Set your route',
    desc: 'Enter your pickup and drop location for your daily commute.',
  },
  {
    step: '02',
    icon: CalendarDays,
    title: 'Choose your schedule',
    desc: 'Pick your preferred time slot and commute days.',
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Ride every day',
    desc: 'Get a reliable cab every morning without re-booking.',
  },
]


const TESTIMONIALS = [
  {
    name: 'Rohan Mehta',
    role: 'Software Engineer · Bangalore',
    quote:
      'Pluto has completely transformed my daily commute. I no longer stress about finding a cab every morning — it just shows up.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'Product Manager · Mumbai',
    quote:
      'The shared ride option saves me ₹3,000 a month. The team pool feature is perfect for our office group commute.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
  },
  {
    name: 'Aditya Kumar',
    role: 'Data Analyst · Hyderabad',
    quote:
      'Book once, ride every day. I set up my route on Monday and I\'m sorted for the entire week. Genius.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
  },
]

const COMPANIES = ['Infosys', 'TCS', 'Wipro', 'Accenture', 'Deloitte', 'Amazon', 'Google', 'Microsoft']

const STATS = [
  { value: '10K+', label: 'Daily riders' },
  { value: '50+', label: 'Cities' },
  { value: '4.8★', label: 'Avg rating' },
]

/* ─── Component ───────────────────────────────────────────── */

export default function Landing() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-surface flex flex-col overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/80">
        <div className="flex items-center gap-2.5">
          <img src="/assets/pluto_logo.png" alt="Pluto" className="h-8 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how" className="text-[#808080] hover:text-white text-[14px] transition-colors">How it works</a>
          <a href="#features" className="text-[#808080] hover:text-white text-[14px] transition-colors">Features</a>
          <a href="#reviews" className="text-[#808080] hover:text-white text-[14px] transition-colors">Reviews</a>
          <Button
            variant="outline"
            className="h-8 px-4 text-[13px] border-border bg-transparent text-white hover:bg-[#1A1A1A]"
            onClick={() => navigate('/book')}
          >
            Book a ride
          </Button>
        </nav>
        <button
          className="md:hidden text-[#808080] hover:text-white transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden sticky top-[57px] z-40 bg-black/95 backdrop-blur-md border-b border-[#1A1A1A] px-6 py-4 flex flex-col gap-4">
          <a href="#how" className="text-[#808080] hover:text-white text-[15px] transition-colors py-1" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#features" className="text-[#808080] hover:text-white text-[15px] transition-colors py-1" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#reviews" className="text-[#808080] hover:text-white text-[15px] transition-colors py-1" onClick={() => setMenuOpen(false)}>Reviews</a>
          <Button
            variant="outline"
            className="w-full h-10 text-[14px] border-border bg-transparent text-white hover:bg-[#1A1A1A]"
            onClick={() => { setMenuOpen(false); navigate('/book') }}
          >
            Book a ride
          </Button>
        </div>
      )}

      <main className="flex-1">

        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 md:pt-44 md:pb-36 min-h-[80vh] md:min-h-dvh overflow-hidden"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.92) 100%)',
            }}
          />
          {/* Green radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 48%, rgba(87,184,84,0.10), transparent)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Smart Daily Commute
            </span>

            <h1 className="text-[38px] sm:text-[52px] md:text-[68px] font-bold text-white leading-[1.04] tracking-tight">
              Your daily ride,<br />
              <span className="text-primary">scheduled ahead.</span>
            </h1>

            <p className="mt-6 text-[#A0A0A0] text-[15px] md:text-[18px] leading-relaxed max-w-xl">
              Book a shared or solo cab for your regular commute. Set it once, ride every day.
              Affordable, reliable, and always on time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full sm:w-auto px-2 sm:px-0">
              <Button
                onClick={() => navigate('/book')}
                className="w-full sm:w-auto h-12 px-8 text-[15px] font-semibold bg-primary hover:bg-primary/85 text-white shadow-[0_4px_28px_rgba(87,184,84,0.40)] rounded-xl"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 text-[15px] font-semibold border-[#3C3C3C] bg-black/30 text-white hover:bg-[#1A1A1A] rounded-xl backdrop-blur-sm"
              >
                <Smartphone className="w-4 h-4 mr-2" /> Download App
              </Button>
            </div>

            {/* Glass stats strip */}
            <div className="mt-14 flex items-stretch bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center px-8 py-4 ${i < STATS.length - 1 ? 'border-r border-white/10' : ''}`}
                >
                  <span className="text-white font-bold text-[24px] md:text-[28px] leading-none">{value}</span>
                  <span className="text-[#666] text-[11px] mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trusted By ── */}
        <section className="py-10 border-y border-[#1A1A1A] overflow-hidden">
          <p className="text-center text-[11px] font-semibold text-[#444] uppercase tracking-widest mb-6">
            Trusted by employees at
          </p>
          {/* Infinite scroll marquee */}
          <div className="relative">
            <div
              className="flex items-center gap-8 animate-[marquee_22s_linear_infinite] w-max"
            >
              {[...COMPANIES, ...COMPANIES].map((name, i) => (
                <span
                  key={i}
                  className="text-[#555] text-[14px] font-semibold whitespace-nowrap hover:text-[#888] transition-colors px-1"
                >
                  {name}
                </span>
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="px-4 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-center text-[28px] md:text-[40px] font-bold text-white mb-4">Three steps to your daily ride</h2>
            <p className="text-center text-[#555] text-[15px] max-w-md mx-auto mb-16">
              From setup to daily rides — the simplest commute booking experience.
            </p>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Desktop dotted connector */}
              <div className="hidden md:block absolute top-[36px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] border-t-2 border-dashed border-[#252525] pointer-events-none" />

              {STEPS.map(({ step, icon: Icon, title, desc }) => (
                <div
                  key={step}
                  className="group relative bg-[#0E0E0E] border border-[#1E1E1E] hover:border-primary/30 rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 overflow-hidden"
                >
                  {/* Giant muted step number background */}
                  <span
                    className="absolute top-3 right-4 text-[72px] font-black text-white/3 leading-none select-none pointer-events-none"
                  >
                    {step}
                  </span>

                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_rgba(87,184,84,0.2)] transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[11px] text-primary font-semibold uppercase tracking-wider mb-2">Step {step}</p>
                    <h3 className="text-white font-semibold text-[17px] mb-2">{title}</h3>
                    <p className="text-[#555] text-[13px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="px-4 py-20 md:py-28 border-t border-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-center text-[28px] md:text-[40px] font-bold text-white mb-4">Why riders choose Pluto</h2>
            <p className="text-center text-[#555] text-[15px] max-w-md mx-auto mb-14">
              Built for the daily commuter — reliable, affordable, and effortless.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: BadgeCheck,
                  title: 'Verified drivers',
                  desc: 'All drivers are background-checked and rated by the community.',
                  tag: 'Trusted',
                },
                {
                  icon: Clock,
                  title: 'Always on time',
                  desc: 'Scheduled pickups so you never miss your office hours.',
                  tag: 'Reliable',
                },
                {
                  icon: Users,
                  title: 'Shared & solo rides',
                  desc: 'Split the cost with teammates or book a solo cab.',
                  tag: 'Flexible',
                },
                {
                  icon: MapPin,
                  title: 'Door-to-door',
                  desc: 'Pickup and drop exactly where you need, every single day.',
                  tag: 'Convenient',
                },
                {
                  icon: Zap,
                  title: 'Instant confirmation',
                  desc: 'Your ride is confirmed in seconds — no waiting, no uncertainty.',
                  tag: 'Fast',
                },
                {
                  icon: Shield,
                  title: 'Safe every ride',
                  desc: 'Live trip tracking and emergency contacts for every journey.',
                  tag: 'Secure',
                },
              ].map(({ icon: Icon, title, desc, tag }) => (
                <div
                  key={title}
                  className="group relative bg-[#0C0C0C] border border-[#1E1E1E] rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                  {/* Icon header zone */}
                  <div
                    className="relative flex items-center justify-center h-32 overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, rgba(87,184,84,0.10) 0%, rgba(87,184,84,0.03) 50%, transparent 100%)',
                    }}
                  >
                    {/* Faint grid pattern */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(87,184,84,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(87,184,84,0.08) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    {/* Big faded icon behind */}
                    <Icon className="absolute w-24 h-24 text-primary/5 pointer-events-none" />
                    {/* Active icon circle */}
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0C0C0C] border border-primary/25 flex items-center justify-center shadow-[0_0_0_6px_rgba(87,184,84,0.06)] group-hover:shadow-[0_0_0_8px_rgba(87,184,84,0.10),0_0_20px_rgba(87,184,84,0.2)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Divider with tag */}
                  <div className="flex items-center gap-3 px-5">
                    <div className="flex-1 h-px bg-[#1E1E1E] group-hover:bg-primary/20 transition-colors duration-300" />
                    <span className="text-[10px] font-semibold text-primary/60 uppercase tracking-widest shrink-0">{tag}</span>
                    <div className="flex-1 h-px bg-[#1E1E1E] group-hover:bg-primary/20 transition-colors duration-300" />
                  </div>

                  {/* Text body */}
                  <div className="px-5 pt-4 pb-6">
                    <h3 className="text-white font-semibold text-[16px] mb-2">{title}</h3>
                    <p className="text-[#555] text-[13px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="reviews" className="px-4 py-20 md:py-28 border-t border-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">Reviews</p>
            <h2 className="text-center text-[28px] md:text-[40px] font-bold text-white mb-4">Loved by daily commuters</h2>
            <p className="text-center text-[#555] text-[15px] max-w-md mx-auto mb-16">
              Thousands of riders trust Pluto to get them to work on time, every day.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map(({ name, role, quote, rating, avatar }) => (
                <div
                  key={name}
                  className="group flex flex-col gap-5 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-primary/20 rounded-2xl p-6 transition-all duration-300"
                >
                  {/* Quote icon */}
                  <Quote className="w-7 h-7 text-primary/30 group-hover:text-primary/50 transition-colors duration-300 shrink-0" />

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-[#A0A0A0] text-[14px] leading-relaxed flex-1">
                    "{quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#1A1A1A]">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                    <div>
                      <p className="text-white text-[13px] font-semibold">{name}</p>
                      <p className="text-[#555] text-[11px]">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── App Download ── */}
        <section className="px-4 py-20 md:py-28 border-t border-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <div
              className="rounded-3xl border border-[#1E1E1E] overflow-hidden grid grid-cols-1 md:grid-cols-2"
              style={{ background: '#0D0D0D' }}
            >
              {/* Left — text */}
              <div className="flex flex-col justify-center px-8 md:px-12 py-12">
                <span className="inline-block text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6 w-fit">
                  Mobile App
                </span>
                <h2 className="text-[26px] md:text-[34px] font-bold text-white leading-tight mb-4">
                  Manage your commute<br />from your pocket.
                </h2>
                <p className="text-[#555] text-[14px] leading-relaxed mb-8">
                  Track your ride in real time, manage your schedule, and get notified before every pickup — all from the Pluto app.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-border hover:border-[#3C3C3C] rounded-xl px-4 py-3 transition-all duration-200 text-left">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#1A1A1A] rounded-lg">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#666]">Download on the</p>
                      <p className="text-white text-[13px] font-semibold">App Store</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-border hover:border-[#3C3C3C] rounded-xl px-4 py-3 transition-all duration-200 text-left">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#1A1A1A] rounded-lg">
                      <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4CAF50" d="M1.22 0c-.03.1-.05.2-.05.31v23.38c0 .11.02.21.05.31l.11.11 13.08-13.08v-.15L1.33-.11z"/><path fill="#FFC107" d="M18.43 8.88l-4.02-4.02-.15.14v.15l4.02 4.02.09-.05 1.96-1.12c.56-.32.56-.84 0-1.15l-1.96-1.12-.09.05z"/><path fill="#FF3D00" d="M18.52 15.12l-1.96-1.12-4.11 4.11.11.11 13.08-13.08-.11-.11z"/><path fill="#3F51B5" d="M1.22 23.69c.1.06.22.1.35.1.2 0 .4-.07.56-.2l15.32-8.74-2.17-2.17z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#666]">Get it on</p>
                      <p className="text-white text-[13px] font-semibold">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Right — visual */}
              <div
                className="relative flex items-center justify-center min-h-65 md:min-h-0 overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 70% at 60% 50%, rgba(87,184,84,0.12) 0%, transparent 70%), #0A0A0A',
                }}
              >
                {/* Decorative phone frame */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div
                    className="w-48 h-85 rounded-[36px] border-2 border-border bg-[#111] flex flex-col overflow-hidden shadow-[0_0_60px_rgba(87,184,84,0.15)]"
                  >
                    {/* Phone top bar */}
                    <div className="flex items-center justify-center pt-3 pb-2 shrink-0">
                      <div className="w-16 h-1.5 rounded-full bg-border" />
                    </div>
                    {/* Screen content mock */}
                    <div className="flex-1 bg-surface mx-1.5 rounded-3xl overflow-hidden flex flex-col px-3 pt-4 pb-3 gap-3">
                      <div className="text-[9px] text-[#555]">Your ride today</div>
                      <div className="bg-[#141414] rounded-xl p-3 flex flex-col gap-2 border border-[#1E1E1E]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <div className="h-1.5 w-full rounded-full bg-[#2A2A2A]" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#555] shrink-0" />
                          <div className="h-1.5 w-3/4 rounded-full bg-[#2A2A2A]" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="h-1.5 w-12 rounded-full bg-[#2A2A2A]" />
                          <div className="h-3 w-16 rounded-full bg-[#1E1E1E]" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary/60" />
                        </div>
                      </div>
                      <div
                        className="mt-auto rounded-xl py-2 text-center text-[9px] font-semibold text-white"
                        style={{ background: '#57B854' }}
                      >
                        Ride confirmed · 8:30 AM
                      </div>
                    </div>
                    {/* Home indicator */}
                    <div className="flex items-center justify-center py-2 shrink-0">
                      <div className="w-10 h-1 rounded-full bg-border" />
                    </div>
                  </div>
                </div>
                {/* Floating ping dots */}
                <div className="absolute top-1/3 left-12 w-2 h-2 rounded-full bg-primary/40 animate-ping" />
                <div className="absolute bottom-1/3 right-12 w-1.5 h-1.5 rounded-full bg-primary/30 animate-ping [animation-delay:0.6s]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="px-4 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-3xl border border-[#1E1E1E] px-8 py-14 text-center relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(87,184,84,0.08) 0%, transparent 70%), #0D0D0D',
              }}
            >
              <span className="inline-block text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
                Get started today
              </span>
              <h2 className="text-[28px] md:text-[40px] font-bold text-white mb-4 leading-tight">
                Ready to simplify<br />your commute?
              </h2>
              <p className="text-[#555] text-[15px] mb-8 max-w-sm mx-auto">
                Book your first ride in under 2 minutes.
              </p>
              <Button
                onClick={() => navigate('/book')}
                className="h-12 px-10 text-[15px] font-semibold bg-primary hover:bg-primary/85 text-white shadow-[0_4px_28px_rgba(87,184,84,0.35)] rounded-xl"
              >
                Book a ride now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1A1A1A] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/assets/pluto_logo.png" alt="Pluto" className="h-6 w-auto opacity-60" />
            <span className="text-[#444] text-[12px]">© 2025 Pluto Rides. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[#444] hover:text-text-muted text-[12px] transition-colors">Privacy</a>
            <a href="#" className="text-[#444] hover:text-text-muted text-[12px] transition-colors">Terms</a>
            <a href="#" className="text-[#444] hover:text-text-muted text-[12px] transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
