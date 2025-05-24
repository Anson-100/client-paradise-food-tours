// src/shared/PeekBookButton.tsx
type Props = {
  onClick?: () => void
  children?: React.ReactNode
}

export default function PeekBookButton({
  onClick,
  children = "Book Tour",
}: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3.5 py-2.5 bg-coral-500 text-white rounded-md text-md font-semibold cursor-pointer shadow"
    >
      {children}
    </button>
  )
}
