// Nominatim (OpenStreetMap) — free, no API key required
const BASE = 'https://nominatim.openstreetmap.org'

export interface PlaceSuggestion {
  placeId: string
  name: string
  address: string
  latitude: number
  longitude: number
}

export async function searchPlaces(query: string): Promise<PlaceSuggestion[]> {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '5',
    countrycodes: 'in',
    addressdetails: '1',
  })
  const res = await fetch(`${BASE}/search?${params}`, {
    headers: { 'Accept-Language': 'en', 'User-Agent': 'PlutoRidesWeb/1.0' },
  })
  const data: any[] = await res.json()
  return data.map((r) => ({
    placeId: String(r.place_id),
    name: r.name || r.display_name.split(',')[0],
    address: r.display_name,
    latitude: parseFloat(r.lat),
    longitude: parseFloat(r.lon),
  }))
}
