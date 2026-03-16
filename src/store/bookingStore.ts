import { create } from 'zustand'

export type RideType = 'TEAM' | 'SOLO'
export type TripType = 'ONEWAY' | 'ROUND'

// Schedule day bitmask: Sun=1, Mon=2, Tue=4, Wed=8, Thu=16, Fri=32, Sat=64
export const DAY_BITS = { Sun: 1, Mon: 2, Tue: 4, Wed: 8, Thu: 16, Fri: 32, Sat: 64 } as const

export interface LocationDetails {
  address: string
  latitude: number
  longitude: number
}

interface BookingState {
  pickup: LocationDetails | null
  drop: LocationDetails | null
  rideType: RideType
  tripType: TripType
  selectedDays: Set<number>
  authToken: string | null
  requestUuid: string | null
  pickupSlotId: string | null
  pickupTime12: string | null
  returnSlotId: string | null
  returnTime12: string | null

  setPickup: (loc: LocationDetails) => void
  setDrop: (loc: LocationDetails) => void
  setRideType: (type: RideType) => void
  setTripType: (type: TripType) => void
  toggleDay: (day: number) => void
  setAuth: (token: string) => void
  setRequestUuid: (uuid: string) => void
  setPickupSlot: (slotId: string, time12: string) => void
  setReturnSlot: (slotId: string, time12: string) => void
  swapLocations: () => void
}

export const useBookingStore = create<BookingState>((set, get) => ({
  pickup: null,
  drop: null,
  rideType: 'TEAM',
  tripType: 'ONEWAY',
  selectedDays: new Set([DAY_BITS.Mon, DAY_BITS.Tue, DAY_BITS.Wed, DAY_BITS.Thu, DAY_BITS.Fri]),
  authToken: sessionStorage.getItem('authToken'),
  requestUuid: null,
  pickupSlotId: null,
  pickupTime12: null,
  returnSlotId: null,
  returnTime12: null,

  setPickup: (loc) => set({ pickup: loc }),
  setDrop: (loc) => set({ drop: loc }),
  setRideType: (type) => set({ rideType: type }),
  setTripType: (type) => set({ tripType: type }),
  toggleDay: (day) =>
    set((s) => {
      const next = new Set(s.selectedDays)
      next.has(day) ? next.delete(day) : next.add(day)
      return { selectedDays: next }
    }),
  setAuth: (token) => {
    sessionStorage.setItem('authToken', token)
    set({ authToken: token })
  },
  setRequestUuid: (uuid) => set({ requestUuid: uuid }),
  setPickupSlot: (slotId, time12) => set({ pickupSlotId: slotId, pickupTime12: time12 }),
  setReturnSlot: (slotId, time12) => set({ returnSlotId: slotId, returnTime12: time12 }),
  swapLocations: () =>
    set({ pickup: get().drop, drop: get().pickup }),
}))
