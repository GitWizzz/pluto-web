import axios from 'axios'
import { getDeviceId } from '../utils/deviceId'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.plutorides.com'
const WEB_APP_TOKEN = import.meta.env.VITE_APP_TOKEN ?? ''

// Step 1: Get initial auth token
export async function onboard(): Promise<string> {
  const res = await axios.post(
    `${BASE_URL}/onboarding`,
    {},
    {
      headers: {
        appToken: WEB_APP_TOKEN,
        deviceId: getDeviceId(),
        persona: 'CUSTOMER',
      },
    }
  )
  return res.data.authToken ?? res.data.token
}

// Step 2: Send OTP
export async function sendOtp(mobile: string, authToken: string): Promise<void> {
  await axios.post(
    `${BASE_URL}/send-otp`,
    { mobile },
    { headers: { authtoken: authToken, appToken: WEB_APP_TOKEN, deviceId: getDeviceId() } }
  )
}

// Step 3: Verify OTP → returns user auth token
export async function verifyOtp(otp: string, authToken: string): Promise<string> {
  const res = await axios.post(
    `${BASE_URL}/verify-otp`,
    { otp },
    { headers: { authtoken: authToken, appToken: WEB_APP_TOKEN, deviceId: getDeviceId() } }
  )
  return res.data.authToken ?? res.data.token
}
