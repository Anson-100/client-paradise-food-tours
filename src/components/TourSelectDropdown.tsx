// src/components/TourSelectDropdown.tsx
import { useState, useRef, useEffect } from "react"
import { ChevronUpDownIcon } from "@heroicons/react/16/solid"
import { CheckIcon } from "@heroicons/react/20/solid"

export type TourOption = {
  label: string
  value: string
}

type Props = {
  options: TourOption[]
  value: TourOption | null
  onChange: (opt: TourOption) => void
}

const TourSelectDropdown = ({ options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  return (
    <div ref={ref} className="relative mt-3 w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="grid w-full cursor-default grid-cols-1 rounded-md bg-zinc-50 px-3.5 py-2  text-left  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500 sm:text-md/6"
      >
        <span className="col-start-1 row-start-1 truncate pr-6">
          {value ? value.label : "Select a tour…"}
        </span>
        <ChevronUpDownIcon
          className="col-start-1 row-start-1 size-5 justify-self-end self-center text-gray-500 sm:size-4"
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-zinc-800 hover:text-gray-100"
            >
              <span
                className={
                  value && value.value === opt.value
                    ? "font-semibold"
                    : "font-normal"
                }
              >
                {opt.label}
              </span>
              {value && value.value === opt.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-500">
                  <CheckIcon className="size-5" aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TourSelectDropdown
