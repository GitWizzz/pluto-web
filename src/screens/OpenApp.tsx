import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useBookingStore } from '../store/bookingStore'
import { openAppOrFallback, PLAY_STORE_URL, APP_STORE_URL } from '../utils/deepLink'

export default function OpenApp() {
  const navigate = useNavigate()
  const { requestUuid } = useBookingStore()
  const [attempted, setAttempted] = useState(false)

  useEffect(() => {
    if (!requestUuid) navigate('/')
  }, [requestUuid, navigate])

  async function handleOpenApp() {
    if (!requestUuid) return
    setAttempted(true)
    await openAppOrFallback(requestUuid)
  }

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col">

      {/* Navbar */}
      <header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center gap-2.5">
        <img src="/assets/pluto_logo.png" alt="Pluto" className="h-7 w-auto" />
        
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">

          {/* Success badge */}
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>

          <div>
            <h1 className="text-white font-bold text-[26px] mb-2">Request Submitted!</h1>
            <p className="text-[#555] text-[14px] leading-relaxed max-w-[280px] mx-auto">
              Our team will review your request. Once approved, complete your booking in the Pluto app.
            </p>
          </div>

          {requestUuid && (
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl px-4 py-2">
              <p className="text-[11px] text-[#555] uppercase tracking-wider mb-0.5">Request ID</p>
              <p className="text-white text-[13px] font-mono">{requestUuid}</p>
            </div>
          )}

          {/* Steps */}
          <Card className="w-full bg-[#111111] border-[#1E1E1E] rounded-2xl text-left">
            <CardContent className="p-5 flex flex-col gap-4">
              <p className="text-[#555] text-[12px] uppercase tracking-wider">What happens next</p>
              {[
                { step: '1', text: 'Admin reviews & approves your request' },
                { step: '2', text: 'Open Pluto app to choose your time slot' },
                { step: '3', text: 'Complete payment inside the app' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step}
                  </span>
                  <p className="text-[#808080] text-[13px] leading-relaxed">{text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Open app button */}
          <Button
            onClick={handleOpenApp}
            className="w-full h-12 rounded-xl text-[15px] font-semibold bg-primary hover:bg-primary/85 text-white shadow-[0_4px_20px_rgba(87,184,84,0.2)]"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Open Pluto App
          </Button>

          {/* Store links after attempt */}
          {attempted && (
            <div className="w-full flex flex-col gap-2">
              <p className="text-[#444] text-[12px]">Don't have the app?</p>
              <div className="flex gap-2">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-[#2C2C2C] rounded-xl py-2.5 text-[13px] font-medium text-[#808080] hover:text-white hover:border-[#3A3A3A] flex items-center justify-center gap-1.5 transition-colors"
                >
                  Play Store
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-[#2C2C2C] rounded-xl py-2.5 text-[13px] font-medium text-[#808080] hover:text-white hover:border-[#3A3A3A] flex items-center justify-center gap-1.5 transition-colors"
                >
                  App Store
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="text-[#444] hover:text-[#808080] text-[13px] transition-colors"
          >
            Book another ride
          </button>

        </div>
      </main>
    </div>
  )
}
