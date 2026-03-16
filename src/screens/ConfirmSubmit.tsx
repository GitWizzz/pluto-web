import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Loader2, ArrowRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useBookingStore } from '../store/bookingStore'
import { createSubscriptionRequest, getSlots, submitSlots } from '../api/ride'
import type { SlotItem } from '../api/ride'

type Phase = 'creating' | 'pickup-slots' | 'return-slots' | 'submitting'

const DAY_LABELS: Record<number, string> = { 1: 'Sun', 2: 'Mon', 4: 'Tue', 8: 'Wed', 16: 'Thu', 32: 'Fri', 64: 'Sat' }

export default function ConfirmSubmit() {
  const navigate = useNavigate()
  const {
    pickup, drop, rideType, tripType, selectedDays, authToken,
    requestUuid, pickupSlotId, returnSlotId,
    setRequestUuid, setPickupSlot, setReturnSlot,
  } = useBookingStore()

  const isRound = tripType === 'ROUND'
  const [phase, setPhase] = useState<Phase>('creating')
  const [slots, setSlots] = useState<SlotItem[]>([])
  const [error, setError] = useState('')

  // For TEAM rides: randomize seat count per slot (matching app behavior)
  const seatCounts = useMemo(() => {
    const map: Record<string, number> = {}
    slots.forEach((s) => {
      const h = parseInt(s.time24.split(':')[0])
      const isPeak = (h >= 7 && h <= 10) || (h >= 17 && h <= 20)
      map[s.slotId] = isPeak ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 3) + 1
    })
    return map
  }, [slots])

  const selectedId = phase === 'pickup-slots' ? pickupSlotId : returnSlotId
  const canConfirm = phase === 'pickup-slots' ? !!pickupSlotId : !!returnSlotId

  // Step 1: auto-create subscription on mount
  useEffect(() => {
    if (!pickup || !drop || !authToken) { navigate('/'); return }
    createRequest()
  }, [])

  async function createRequest() {
    if (!pickup || !drop || !authToken) return
    setError('')
    try {
      const scheduleBitmask = [...selectedDays].reduce((acc, bit) => acc | bit, 0)
      const uuid = await createSubscriptionRequest(pickup, drop, rideType, tripType, scheduleBitmask, authToken)
      setRequestUuid(uuid)
      await fetchSlots(uuid, 'PICKUP')
      setPhase('pickup-slots')
    } catch {
      setError('Failed to load your booking. Please go back and try again.')
    }
  }

  async function fetchSlots(uuid: string, direction: 'PICKUP' | 'RETURN') {
    const data = await getSlots(uuid, direction, authToken!)
    setSlots(data)
  }

  async function handleConfirm() {
    if (!pickupSlotId || !requestUuid || !authToken) return

    if (isRound && phase === 'pickup-slots') {
      // Move to return slot selection
      setSlots([])
      await fetchSlots(requestUuid, 'RETURN')
      setPhase('return-slots')
      return
    }

    // Final submit
    setPhase('submitting')
    setError('')
    try {
      const { pickupTime12, returnTime12 } = useBookingStore.getState()
      await submitSlots(
        requestUuid,
        pickupSlotId,
        pickupTime12!,
        authToken,
        isRound ? (returnSlotId ?? undefined) : undefined,
        isRound ? (returnTime12 ?? undefined) : undefined,
      )
      navigate('/open-app')
    } catch {
      setError('Failed to confirm. Please try again.')
      setPhase(isRound ? 'return-slots' : 'pickup-slots')
    }
  }

  const dayLabels = [1, 2, 4, 8, 16, 32, 64]
    .filter((b) => selectedDays.has(b))
    .map((b) => DAY_LABELS[b])
    .join(', ')

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col">

      {/* Navbar */}
      <header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => phase === 'return-slots' ? setPhase('pickup-slots') : navigate('/login')}
          className="text-[#808080] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img src="/assets/pluto_logo.png" alt="Pluto" className="h-8 w-auto" />
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg flex flex-col gap-5">

          {/* Heading */}
          <div>
            <h1 className="text-white font-bold text-[24px]">Confirm your ride</h1>
            <p className="text-[#555] text-[13px] mt-1">
              {phase === 'creating' ? 'Setting up your request…'
                : phase === 'pickup-slots' ? 'Choose your pickup time slot'
                : phase === 'return-slots' ? 'Choose your return time slot'
                : 'Confirming your booking…'}
            </p>
          </div>

          {/* Booking summary card */}
          <Card className="bg-[#111111] border-[#1E1E1E] rounded-2xl">
            <CardContent className="p-5 flex flex-col gap-4">

              {/* Route */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  <p className="text-white text-[14px] font-medium truncate">{pickup?.address ?? '—'}</p>
                </div>
                <div className="ml-[4px] w-[1.5px] h-4 bg-[#2C2C2C]" />
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4747] shrink-0" />
                  <p className="text-white text-[14px] font-medium truncate">{drop?.address ?? '—'}</p>
                </div>
              </div>

              <Separator className="bg-[#1A1A1A]" />

              {/* Details row */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-col">
                  <p className="text-[#555] text-[11px] uppercase tracking-wider mb-0.5">Ride</p>
                  <p className="text-white text-[13px] font-semibold">{rideType === 'TEAM' ? 'Team' : 'Solo'}</p>
                </div>
                <div className="w-px h-8 bg-[#1E1E1E]" />
                <div className="flex flex-col">
                  <p className="text-[#555] text-[11px] uppercase tracking-wider mb-0.5">Trip</p>
                  <p className="text-white text-[13px] font-semibold">{tripType === 'ONEWAY' ? 'One-Way' : 'Round'}</p>
                </div>
                <div className="w-px h-8 bg-[#1E1E1E]" />
                <div className="flex flex-col min-w-0">
                  <p className="text-[#555] text-[11px] uppercase tracking-wider mb-0.5">Days</p>
                  <p className="text-white text-[13px] font-semibold truncate">{dayLabels}</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Slot picker */}
          <Card className="bg-[#111111] border-[#1E1E1E] rounded-2xl">
            <CardContent className="p-5 flex flex-col gap-4">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-[15px] font-semibold">
                    {phase === 'return-slots' ? 'Return time' : 'Pickup time'}
                  </p>
                  <p className="text-[#555] text-[12px]">
                    {phase === 'return-slots'
                      ? `${drop?.address?.split(',')[0]} → ${pickup?.address?.split(',')[0]}`
                      : `${pickup?.address?.split(',')[0]} → ${drop?.address?.split(',')[0]}`}
                  </p>
                </div>
                {isRound && (
                  <div className="flex gap-1">
                    <span className={cn('w-2 h-2 rounded-full', phase === 'pickup-slots' || phase === 'creating' ? 'bg-primary' : 'bg-[#2C2C2C]')} />
                    <span className={cn('w-2 h-2 rounded-full', phase === 'return-slots' ? 'bg-primary' : 'bg-[#2C2C2C]')} />
                  </div>
                )}
              </div>

              <Separator className="bg-[#1A1A1A]" />

              {phase === 'creating' || slots.length === 0 && phase !== 'return-slots' ? (
                <div className="flex items-center justify-center py-8 gap-2">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-[#555] text-[13px]">Loading available slots…</span>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-7 h-7 text-[#333] mx-auto mb-2" />
                  <p className="text-[#555] text-[13px]">No slots available</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => {
                    const isSelected = selectedId === slot.slotId
                    const seats = seatCounts[slot.slotId] ?? 2
                    const lowSeat = rideType === 'TEAM' && seats === 1
                    return (
                      <button
                        key={slot.slotId}
                        onClick={() => phase === 'pickup-slots'
                          ? setPickupSlot(slot.slotId, slot.time12)
                          : setReturnSlot(slot.slotId, slot.time12)
                        }
                        className={cn(
                          'flex flex-col items-start gap-1 px-4 py-3 rounded-xl border text-left transition-all',
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-[0_2px_12px_rgba(87,184,84,0.3)]'
                            : 'bg-[#0A0A0A] border-[#2C2C2C] text-[#808080] hover:border-[#3A3A3A] hover:text-white'
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <Clock className={cn('w-3.5 h-3.5', isSelected ? 'text-white' : 'text-[#555]')} />
                          <span className={cn('text-[14px] font-bold', isSelected ? 'text-white' : 'text-white/80')}>{slot.time12}</span>
                        </div>
                        {rideType === 'TEAM' && (
                          <div className="flex items-center gap-1">
                            <Users className={cn('w-3 h-3', isSelected ? 'text-white/80' : lowSeat ? 'text-orange-400' : 'text-primary')} />
                            <span className={cn('text-[11px]', isSelected ? 'text-white/80' : lowSeat ? 'text-orange-400' : 'text-[#555]')}>
                              {seats} seat{seats > 1 ? 's' : ''} left
                            </span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

            </CardContent>
          </Card>

          {error && <p className="text-[#FF4747] text-[13px]">{error}</p>}

          {/* CTA */}
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm || phase === 'creating' || phase === 'submitting'}
            className={cn(
              'w-full h-12 rounded-xl text-[15px] font-semibold transition-all',
              canConfirm && phase !== 'creating'
                ? 'bg-primary hover:bg-primary/85 text-white shadow-[0_4px_20px_rgba(87,184,84,0.2)]'
                : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
            )}
          >
            {phase === 'submitting' ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" /> Confirming…
              </span>
            ) : isRound && phase === 'pickup-slots' ? (
              <span className="flex items-center gap-2 justify-center">
                Next: Return slot <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              'Confirm Booking →'
            )}
          </Button>

        </div>
      </main>
    </div>
  )
}
