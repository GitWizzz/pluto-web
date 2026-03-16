import axios from 'axios'
import { getDeviceId } from '../utils/deviceId'
import type { LocationDetails, RideType, TripType } from '../store/bookingStore'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.plutorides.com'
const WEB_APP_TOKEN = import.meta.env.VITE_APP_TOKEN ?? ''

function headers(authToken: string) {
  return {
    authtoken: authToken,
    appToken: WEB_APP_TOKEN,
    deviceId: getDeviceId(),
    platform: 'web',
  }
}

export interface SlotItem {
  slotId: string
  time12: string
  time24: string
}

/** GET /api/v2/slots/get — fetch available pickup or return slots */
export async function getSlots(
  requestUuid: string,
  direction: 'PICKUP' | 'RETURN',
  authToken: string
): Promise<SlotItem[]> {
  const res = await axios.get(`${BASE_URL}/api/v2/slots/get`, {
    params: { requestuuid: requestUuid, direction },
    headers: headers(authToken),
  })
  return res.data.slots ?? []
}

/** POST /api/v2/slots/submit — submit selected slot(s) */
export async function submitSlots(
  requestUuid: string,
  pickupSlotId: string,
  pickupTime12: string,
  authToken: string,
  returnSlotId?: string,
  returnTime12?: string
): Promise<void> {
  await axios.post(
    `${BASE_URL}/api/v2/slots/submit`,
    {
      requestuuid: requestUuid,
      pickupSlotId,
      pickupTime12,
      returnSlotId: returnSlotId ?? null,
      returnTime12: returnTime12 ?? null,
      isAutoApproved: false,
    },
    { headers: headers(authToken) }
  )
}

/** POST /api/v2/subscription/request/create — unified single-call endpoint */
export async function createSubscriptionRequest(
  pickup: LocationDetails,
  drop: LocationDetails,
  rideType: RideType,
  tripType: TripType,
  scheduleBitmask: number,
  authToken: string
): Promise<string> {
  const res = await axios.post(
    `${BASE_URL}/api/v2/subscription/request/create`,
    {
      active_route: {
        source: pickup.address,
        destination: drop.address,
        source_latitude: pickup.latitude,
        source_longitude: pickup.longitude,
        destination_latitude: drop.latitude,
        destination_longitude: drop.longitude,
      },
      user_doorstep: {
        source: pickup.address,
        destination: drop.address,
        pickup_latitude: pickup.latitude,
        pickup_longitude: pickup.longitude,
        drop_latitude: drop.latitude,
        drop_longitude: drop.longitude,
      },
      subscription: {
        substype: rideType,
        schedule: scheduleBitmask,
        triptype: tripType,
      },
    },
    { headers: headers(authToken) }
  )
  return res.data.subscriptionRequestId
}
