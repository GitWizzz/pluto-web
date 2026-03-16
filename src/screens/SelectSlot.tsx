import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useBookingStore } from '../store/bookingStore'
import { getSlots, submitSlots } from '../api/ride'
import type { SlotItem } from '../api/ride'

export default function SelectSlot() {
  const navigate = useNavigate()
  const {
    pickup, drop, tripType, requestUuid, authToken,
    pickupSlotId, returnSlotId,
    setPickupSlot, setReturnSlot,
  } = useBookingStore()

  const isRound = tripType === 'ROUND'

  // Which step: 'pickup' first, then 'return' for round trips
  const [step, setStep] = useState<'pickup' | 'return'>('pickup')
  const [slots, setSlots] = useState<SlotItem[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectedId = step === 'pickup' ? pickupSlotId : returnSlotId

  useEffect(() => {
    if (!requestUuid || !authToken) { navigate('/'); return }
    fetchSlots()
  }, [step])

  async function fetchSlots() {
    if (!requestUuid || !authToken) return
    setLoadingSlots(true)
    setError('')
    try {
      const direction = step === 'pickup' ? 'PICKUP' : 'RETURN'
      const data = await getSlots(requestUuid, direction, authToken)
      setSlots(data)
    } catch {
      setError('Failed to load available slots. Please try again.')
    } finally {
      setLoadingSlots(false)
    }
  }

  function handleSelectSlot(slot: SlotItem) {
    if (step === 'pickup') setPickupSlot(slot.slotId, slot.time12)
    else setReturnSlot(slot.slotId, slot.time12)
  }

  async function handleNext() {
    if (!pickupSlotId || !requestUuid || !authToken) return

    if (isRound && step === 'pickup') {
      setStep('return')
      return
    }

    // Final submit
    setSubmitting(true)
    setError('')
    try {
      const { pickupTime12, returnTime12 } = useBookingStore.getState()
      await submitSlots(
        requestUuid,
        pickupSlotId,
        pickupTime12!,
        authToken,
        isRound ? (returnSlotId ?? undefined) : undefined,
        isRound ? (returnTime12 ?? undefined) : undefined
      )
      navigate('/open-app')
    } catch {
      setError('Failed to confirm slots. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const canProceed = step === 'pickup' ? !!pickupSlotId : !!returnSlotId

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col">

      {/* Navbar */}
      <header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => step === 'return' ? setStep('pickup') : navigate('/confirm')}
          className="text-[#808080] hover:text-white transition-colors text-[14px]"
        >
          ←
        </button>
        <div className="flex items-center gap-2.5">
          <img src="/assets/pluto_logo.png" alt="Pluto" className="h-7 w-auto" />
          
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg flex flex-col gap-6">

          {/* Heading */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isRound && (
                <div className="flex gap-1">
                  <span className={cn('w-2 h-2 rounded-full', step === 'pickup' ? 'bg-primary' : 'bg-[#2C2C2C]')} />
                  <span className={cn('w-2 h-2 rounded-full', step === 'return' ? 'bg-primary' : 'bg-[#2C2C2C]')} />
                </div>
              )}
              <span className="text-[12px] text-[#808080]">
                {isRound ? (step === 'pickup' ? 'Step 1 of 2' : 'Step 2 of 2') : 'Select slot'}
              </span>
            </div>
            <h1 className="text-white font-bold text-[24px]">
              {step === 'pickup' ? 'Choose pickup time' : 'Choose return time'}
            </h1>
            <p className="text-[#555] text-[13px] mt-1">
              {step === 'pickup'
                ? `${pickup?.address ?? ''} → ${drop?.address ?? ''}`
                : `${drop?.address ?? ''} → ${pickup?.address ?? ''}`}
            </p>
          </div>

          {/* Slots grid */}
          <Card className="bg-[#111111] border-[#1E1E1E] rounded-2xl">
            <CardContent className="p-5">
              {loadingSlots ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-[#555] text-[14px]">Loading available slots…</span>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-8 h-8 text-[#333] mx-auto mb-3" />
                  <p className="text-[#555] text-[14px]">No slots available</p>
                  <button onClick={fetchSlots} className="text-primary text-[13px] mt-2 underline">
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[#555] text-[12px] mb-3">{slots.length} slots available</p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.slotId}
                        onClick={() => handleSelectSlot(slot)}
                        className={cn(
                          'flex items-center gap-1.5 h-10 px-4 rounded-full border text-[13px] font-semibold transition-all',
                          selectedId === slot.slotId
                            ? 'bg-primary border-primary text-white shadow-[0_2px_12px_rgba(87,184,84,0.3)]'
                            : 'bg-[#0A0A0A] border-[#2C2C2C] text-[#808080] hover:border-[#3A3A3A] hover:text-white'
                        )}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot.time12}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {error && (
            <p className="text-[#FF4747] text-[13px] text-center">{error}</p>
          )}

          {/* CTA */}
          <Button
            onClick={handleNext}
            disabled={!canProceed || submitting}
            className={cn(
              'w-full h-12 rounded-xl text-[15px] font-semibold transition-all',
              canProceed
                ? 'bg-primary hover:bg-primary/85 text-white shadow-[0_4px_20px_rgba(87,184,84,0.2)]'
                : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
            )}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming…
              </span>
            ) : isRound && step === 'pickup' ? (
              <span className="flex items-center gap-2">
                Next: Return slot <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              'Confirm Slot →'
            )}
          </Button>

          {/* Route summary */}
          <Separator className="bg-[#1A1A1A]" />
          <div className="flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[#808080] truncate max-w-[140px]">{pickup?.address ?? '—'}</span>
            </div>
            <ArrowRight className="w-3 h-3 text-[#444] shrink-0" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4747]" />
              <span className="text-[#808080] truncate max-w-[140px]">{drop?.address ?? '—'}</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
