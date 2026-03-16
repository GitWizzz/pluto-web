import { useNavigate } from 'react-router-dom'
import { ArrowUpDown, Navigation, MapPin, Users, User, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useBookingStore } from '../store/bookingStore'
import type { RideType, TripType } from '../store/bookingStore'
import LocationSearch from '../components/LocationSearch'

const DAYS = [
  { label: 'Mon', bit: 2 },
  { label: 'Tue', bit: 4 },
  { label: 'Wed', bit: 8 },
  { label: 'Thu', bit: 16 },
  { label: 'Fri', bit: 32 },
  { label: 'Sat', bit: 64 },
  { label: 'Sun', bit: 1 },
]

export default function BookingDetails() {
  const navigate = useNavigate()
  const {
    pickup, drop, rideType, tripType, selectedDays,
    setPickup, setDrop, setRideType, setTripType, toggleDay, swapLocations,
  } = useBookingStore()

  const canProceed = !!pickup && !!drop && selectedDays.size >= 3

  function handleSwap() {
    if (!pickup || !drop) return
    swapLocations()
  }

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col">

      {/* Navbar */}
      <header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-[#808080] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img src="/assets/pluto_logo.png" alt="Pluto" className="h-8 w-auto" />
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-lg flex flex-col gap-6">

          {/* Heading */}
          <div>
            <h1 className="text-white font-bold text-[26px]">Schedule a ride</h1>
            <p className="text-[#555] text-[13px] mt-1">Fill in your commute details to get started</p>
          </div>

          <Card className="bg-[#111111] border-[#1E1E1E] rounded-2xl">
            <CardContent className="p-6 flex flex-col gap-5">

              {/* Pickup */}
              <LocationSearch
                label="Pickup location"
                placeholder="Search your pickup address"
                value={pickup?.address ?? ''}
                icon={<Navigation className="w-4 h-4 text-primary" />}
                inputClassName="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                onSelect={(coords) => setPickup(coords)}
                onClear={() => setPickup(null as any)}
              />

              {/* Swap */}
              <div className="flex justify-center -my-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  disabled={!pickup || !drop}
                  className="h-7 w-7 rounded-full bg-[#1A1A1A] border-[#2C2C2C] text-primary hover:bg-[#222] hover:border-primary/40 disabled:opacity-30"
                >
                  <ArrowUpDown className="w-3 h-3" />
                </Button>
              </div>

              {/* Drop */}
              <LocationSearch
                label="Drop location"
                placeholder="Search your drop address"
                value={drop?.address ?? ''}
                icon={<MapPin className="w-4 h-4 text-[#FF4747]" />}
                inputClassName="focus-visible:ring-1 focus-visible:ring-[#FF4747]/50 focus-visible:border-[#FF4747]/60"
                onSelect={(coords) => setDrop(coords)}
                onClear={() => setDrop(null as any)}
              />

              <Separator className="bg-[#1E1E1E]" />

              {/* Ride Type */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-[12px] font-medium text-[#808080]">Ride type</Label>
                <div className="flex gap-2">
                  {(['TEAM', 'SOLO'] as RideType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setRideType(type)}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 h-10 rounded-full border text-[13px] font-semibold transition-all',
                        rideType === type
                          ? 'bg-primary border-primary text-white shadow-[0_2px_12px_rgba(87,184,84,0.3)]'
                          : 'bg-[#0A0A0A] border-[#2C2C2C] text-[#555] hover:border-[#3A3A3A]'
                      )}
                    >
                      {type === 'TEAM' ? <Users className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      {type === 'TEAM' ? 'Team ride' : 'Solo ride'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trip Type */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-[12px] font-medium text-[#808080]">Trip type</Label>
                <div className="flex gap-2">
                  {(['ONEWAY', 'ROUND'] as TripType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTripType(type)}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 h-10 rounded-full border text-[13px] font-semibold transition-all',
                        tripType === type
                          ? 'bg-primary border-primary text-white shadow-[0_2px_12px_rgba(87,184,84,0.3)]'
                          : 'bg-[#0A0A0A] border-[#2C2C2C] text-[#555] hover:border-[#3A3A3A]'
                      )}
                    >
                      <ArrowRight className={cn('w-3.5 h-3.5', type === 'ROUND' && 'rotate-180')} />
                      {type === 'ONEWAY' ? 'One-Way' : 'Round Trip'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commute Days */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-[12px] font-medium text-[#808080]">Commute days</Label>
                  <span className={cn('text-[11px]', selectedDays.size < 3 ? 'text-[#FF4747]' : 'text-[#555]')}>
                    {selectedDays.size < 3 ? 'select at least 3' : `${selectedDays.size} days selected`}
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS.map(({ label, bit }) => (
                    <button
                      key={bit}
                      onClick={() => toggleDay(bit)}
                      className={cn(
                        'h-9 rounded-full border text-[11px] font-semibold transition-all',
                        selectedDays.has(bit)
                          ? 'bg-primary border-primary text-white shadow-[0_2px_10px_rgba(87,184,84,0.25)]'
                          : 'bg-[#0A0A0A] border-[#2C2C2C] text-[#555] hover:border-[#3A3A3A]'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* CTA */}
          <Button
            onClick={() => canProceed && navigate('/login')}
            disabled={!canProceed}
            className={cn(
              'w-full h-12 rounded-xl text-[15px] font-semibold transition-all',
              canProceed
                ? 'bg-primary hover:bg-primary/85 text-white shadow-[0_4px_20px_rgba(87,184,84,0.2)]'
                : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
            )}
          >
            Continue →
          </Button>

          <p className="text-center text-[11px] text-[#333]">
            You'll verify your number on the next step
          </p>

        </div>
      </main>
    </div>
  )
}
