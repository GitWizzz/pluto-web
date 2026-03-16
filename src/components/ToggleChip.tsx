interface ToggleChipProps {
  label: string
  selected: boolean
  onClick: () => void
  icon?: string
}

export default function ToggleChip({ label, selected, onClick, icon }: ToggleChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold border transition-all ${
        selected
          ? 'bg-[#57B854]/15 border-[#57B854] text-[#57B854]'
          : 'bg-[#111111] border-[#2C2C2C] text-[#666]'
      }`}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className={`w-4 h-4 object-contain ${selected ? 'opacity-100' : 'opacity-40'}`}
        />
      )}
      {label}
    </button>
  )
}
