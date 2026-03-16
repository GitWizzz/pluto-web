import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { X, MapPin, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { searchPlaces } from '@/api/places'
import type { PlaceSuggestion } from '@/api/places'

interface SelectedLocation {
  address: string
  latitude: number
  longitude: number
}

interface Props {
  label: string
  placeholder: string
  value: string
  icon: ReactNode
  inputClassName?: string
  onSelect: (loc: SelectedLocation) => void
  onClear: () => void
}

export default function LocationSearch({ label, placeholder, value, icon, inputClassName, onSelect, onClear }: Props) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setSuggestions([]); setOpen(false); return }
    setLoading(true)
    try {
      const results = await searchPlaces(q)
      setSuggestions(results)
      setOpen(results.length > 0)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  function handleChange(v: string) {
    setQuery(v)
    if (!v.trim()) { onClear(); setSuggestions([]); setOpen(false) }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(v), 400)
  }

  function handleSelect(s: PlaceSuggestion) {
    setQuery(s.name)
    setOpen(false)
    setSuggestions([])
    onSelect({ address: s.name, latitude: s.latitude, longitude: s.longitude })
  }

  function handleClear() {
    setQuery('')
    setSuggestions([])
    setOpen(false)
    onClear()
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 relative">
      <Label className="text-[12px] font-medium text-[#808080]">{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
        <Input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className={cn(
            'pl-10 pr-9 bg-[#0A0A0A] border-[#2C2C2C] text-white placeholder:text-[#3A3A3A] h-11 rounded-xl transition-colors',
            inputClassName
          )}
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555] animate-spin" />
        )}
        {!loading && query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3A3A3A] hover:text-[#808080] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#141414] border border-[#2C2C2C] rounded-xl shadow-2xl z-50 overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s.placeId}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s) }}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[#1E1E1E] transition-colors border-b border-[#1A1A1A] last:border-0"
            >
              <MapPin className="w-4 h-4 text-[#555] mt-0.5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-white text-[13px] font-medium truncate">{s.name}</span>
                <span className="text-[#555] text-[11px] truncate">{s.address}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
