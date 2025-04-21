// import { CalendarDateRangeIcon } from "@heroicons/react/24/solid"

type Props = {
  onClick?: () => void
  children?: React.ReactNode
}

const ActionButton = ({ onClick, children = "Check Dates" }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3.5 py-2.5 bg-teal-500 text-white rounded-md hover:bg-teal-550 text-md font-semibold cursor-pointer shadow"
    >
      {children}
    </button>
  )
}

export default ActionButton
