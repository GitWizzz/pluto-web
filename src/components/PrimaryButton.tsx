interface PrimaryButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

export default function PrimaryButton({ label, onClick, disabled, loading }: PrimaryButtonProps) {
  const isDisabled = disabled || loading
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full rounded-full py-4 text-[17px] font-bold tracking-wide transition-all ${
        isDisabled
          ? 'bg-[#1E1E1E] text-[#555] cursor-not-allowed'
          : 'bg-[#57B854] text-white shadow-[0_4px_24px_rgba(87,184,84,0.35)] active:scale-[0.98] active:shadow-none'
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Please wait...
        </span>
      ) : label}
    </button>
  )
}
