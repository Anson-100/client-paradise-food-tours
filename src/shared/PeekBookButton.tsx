type Props = {
  peekUrl: string
  children?: React.ReactNode
}

export default function PeekBookButton({
  peekUrl,
  children = "Check Dates",
}: Props) {
  if (!peekUrl) return null

  return (
    <div className="flex">
      <a
        href={peekUrl}
        data-button-text={children}
        data-button-style="custom"
        data-button-mode="popup"
        className="
        flex items-center gap-2 px-3.5 py-2.5
        bg-coral-500 text-white  rounded-md text-md
        font-semibold shadow hover:bg-coral-600"
      >
        {children}
      </a>
    </div>
  )
}
