const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pluto.rides'
const APP_STORE_URL = 'https://apps.apple.com/app/pluto-rides'

export function openAppOrFallback(requestUuid: string): Promise<boolean> {
  return new Promise((resolve) => {
    const deepLink = `plutorides://app/slots?request=${requestUuid}`
    window.location.href = deepLink
    // If app not installed, deep link silently fails — show store buttons after 1.5s
    setTimeout(() => resolve(false), 1500)
  })
}

export function getStoreUrl(): string {
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) return APP_STORE_URL
  return PLAY_STORE_URL
}

export { PLAY_STORE_URL, APP_STORE_URL }
