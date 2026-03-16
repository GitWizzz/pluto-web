import { useRef } from 'react'

interface OtpInputProps {
  value: string
  onChange: (val: string) => void
  length?: number
}

export default function OtpInput({ value, onChange, length = 6 }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, char: string) {
    const digit = char.replace(/\D/g, '').slice(0, 1)
    const arr = value.padEnd(length, '').split('')
    arr[index] = digit
    const newVal = arr.join('').slice(0, length)
    onChange(newVal)
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pasted)
    inputs.current[Math.min(pasted.length, length - 1)]?.focus()
    e.preventDefault()
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-11 h-14 text-center text-[22px] font-bold rounded-xl border outline-none transition-colors bg-[#171719] text-white ${
            value[i]
              ? 'border-[#57B854]'
              : 'border-[#2C2C2C] focus:border-[#57B854]'
          }`}
        />
      ))}
    </div>
  )
}
