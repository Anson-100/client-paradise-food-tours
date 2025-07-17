// components/Hint.tsx
import { InformationCircleIcon } from "@heroicons/react/24/solid"

type Props = {
  /** Primary hint line */
  text: string
  /** Optional second line */
  text2?: string
  /** Extra utility classes */
  className?: string
  /**
   * Show hint even when the parent isn’t hovered.
   * Pass `always` to keep it visible.
   *    <Hint text="…" always />
   */
  always?: boolean
}

export default function Hint({
  text,
  text2,
  className = "",
  always = false,
}: Props) {
  const visibility = always
    ? ""
    : "opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150"

  return (
    <span className={`absolute -top-6 left-2 z-20 ${visibility} ${className}`}>
      <span className="flex items-start gap-1 px-2 py-1 rounded border border-teal-500 bg-white sm:text-xs font-semibold text-gray-700 shadow">
        <InformationCircleIcon className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
        <span>
          {text}
          {text2 && (
            <>
              <br />
              {text2}
            </>
          )}
        </span>
      </span>
    </span>
  )
}
