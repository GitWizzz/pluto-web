import { useState } from 'react'
import type { LocationDetails } from '../store/bookingStore'

interface LocationInputProps {
  placeholder: string
  label: string
  value: LocationDetails | null
  onChange: (loc: LocationDetails) => void
  dotColor: 'green' | 'red'
}

export default function LocationInput({ placeholder, label, value, onChange, dotColor }: LocationInputProps) {
  const [inputValue, setInputValue] = useState(value?.address ?? '')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const address = e.target.value
    setInputValue(address)
    if (address.trim()) {
      onChange({ address, latitude: 0, longitude: 0 })
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-widest text-[#808080] px-1">
        {label}
      </span>
      <div className="flex items-center gap-3 bg-[#111111] rounded-xl px-4 py-3.5 focus-within:ring-1 focus-within:ring-[#57B854] transition-all">
        <span
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            dotColor === 'green'
              ? 'bg-[#57B854] shadow-[0_0_6px_rgba(87,184,84,0.6)]'
              : 'bg-[#FF4747] shadow-[0_0_6px_rgba(255,71,71,0.6)]'
          }`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-[15px] font-medium placeholder-[#555] outline-none"
        />
        {inputValue && (
          <button
            onClick={() => { setInputValue(''); onChange({ address: '', latitude: 0, longitude: 0 }) }}
            className="text-[#555] text-[18px] leading-none shrink-0"
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
