import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Shield, Star, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import heroBg from '@/assets/hero.png'

export default function Landing() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col">

      {/* Navbar — sticky frosted glass */}
      <header className="sticky top-0 z-50 border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/80">
        <div className="flex items-center gap-2.5">
          <img src="/assets/pluto_logo.png" alt="Pluto" className="h-8 w-auto" />
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how" className="text-[#808080] hover:text-white text-[14px] transition-colors">How it works</a>
          <a href="#features" className="text-[#808080] hover:text-white text-[14px] transition-colors">Features</a>
          <Button
            variant="outline"
            className="h-8 px-4 text-[13px] border-[#2C2C2C] bg-transparent text-white hover:bg-[#1A1A1A]"
            onClick={() => navigate('/book')}
          >
            Book a ride
          </Button>
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#808080] hover:text-white transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile slide-down menu */}
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

      <main className="flex-1">

        {/* Hero — background image + gradient overlay + green glow */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 md:pt-40 md:pb-32 min-h-[75vh] md:min-h-dvh overflow-hidden"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark gradient overlay — fades image into black at top & bottom */}
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

          {/* Content */}
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
            <div className="mt-14 flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
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

        {/* How it works — dotted step connectors */}
        <section id="how" className="px-4 py-16 border-t border-[#1A1A1A]">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-center text-[28px] md:text-[36px] font-bold text-white mb-12">Three steps to your daily ride</h2>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Desktop: horizontal dotted connector through icon centres */}
              <div className="hidden md:block absolute top-[28px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] border-t-2 border-dashed border-[#2C2C2C] pointer-events-none" />

              {[
                { step: '1', icon: MapPin, title: 'Set your route', desc: 'Enter your pickup and drop location for your daily commute.' },
                { step: '2', icon: Clock, title: 'Choose your schedule', desc: 'Pick your preferred time slot and commute days.' },
                { step: '3', icon: Star, title: 'Ride every day', desc: 'Get a reliable cab every morning without re-booking.' },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div
                  key={step}
                  className="bg-[#111111] border border-[#1E1E1E] hover:border-primary/30 rounded-2xl p-6 flex flex-col gap-4 transition-colors duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 relative z-10">
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

        {/* Features — hover bg + icon glow */}
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
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(87,184,84,0.15)] group-hover:shadow-[0_0_18px_rgba(87,184,84,0.3)] transition-shadow duration-200">
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

        {/* CTA banner — rounded card with radial green glow */}
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

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <span className="text-[#444] text-[12px]">© 2025 Pluto Rides. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#444] hover:text-[#808080] text-[12px] transition-colors">Privacy</a>
          <a href="#" className="text-[#444] hover:text-[#808080] text-[12px] transition-colors">Terms</a>
        </div>
      </footer>

    </div>
  )
}
