import { useState, useRef, useEffect } from "react"
import { ChevronUpDownIcon } from "@heroicons/react/16/solid"
import { CheckIcon } from "@heroicons/react/20/solid"

type Option = {
  id: number
  name: string
  count: number
}

type CustomDropdownProps = {
  options: Option[]
  selected: Option
  onSelect: (option: Option) => void
}

function CustomDropdown({ options, selected, onSelect }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: Option) => {
    onSelect(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative mt-3 w-64" ref={dropdownRef}>
      <button
        className="grid w-full cursor-default grid-cols-1 rounded-md py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 bg-zinc-50 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500 sm:text-md/6 font-semibold"
        onClick={handleButtonClick}
      >
        <span className="col-start-1 row-start-1 truncate pr-6">
          {selected.name}
        </span>
        <ChevronUpDownIcon
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
          {options.map(option => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-teal-500 data-focus:text-white data-focus:outline-hidden hover:bg-zinc-800 hover:text-gray-100" // Added hover effect
            >
              <span
                className={
                  selected.id === option.id ? "font-semibold" : "font-normal"
                }
              >
                {option.name}
              </span>{" "}
              <span className="text-gray-400">({option.count})</span>
              {selected.id === option.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-500">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomDropdown
