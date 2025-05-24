import React, { useState, useEffect } from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameDay,
  parseISO,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import peekClient from "@/lib/peekClient" // swap for your actual client path

type Props = {
  productId: string
  onDateSelect: (isoDate: string) => void
  onClose: () => void
}

export default function AvailabilityCalendar({
  productId,
  onDateSelect,
  onClose,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    peekClient
      .calendar(productId, format(currentMonth, "yyyy-MM"))
      .then((dates: string[]) => {
        if (!cancelled) setAvailableDates(new Set(dates))
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [productId, currentMonth])

  const renderHeader = () => (
    <div className="flex items-center justify-between px-4 py-2">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
      </button>
      <h2 className="text-lg font-semibold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  )

  const renderDays = () => {
    const days = []
    const start = startOfWeek(currentMonth, { weekStartsOn: 0 })
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-xs font-medium text-gray-500">
          {format(addDays(start, i), "EEEEE")}
        </div>
      )
    }
    return <div className="grid grid-cols-7 px-4">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })
    const rows = []
    let days: React.ReactNode[] = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const iso = format(day, "yyyy-MM-dd")
        const isDisabled = !availableDates.has(iso) || day < new Date()
        const isToday = isSameDay(day, new Date())

        days.push(
          <button
            key={iso}
            disabled={isDisabled}
            onClick={() => onDateSelect(iso)}
            className={`h-10 w-full p-1 text-center text-sm leading-tight
              ${
                isDisabled
                  ? "text-gray-300"
                  : "hover:bg-teal-200 focus:bg-teal-300"
              }
              ${isToday && !isDisabled ? "bg-teal-100 font-semibold" : ""}
            `}
          >
            {format(day, "d")}
          </button>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      )
      days = []
    }

    return <div className="space-y-1 p-4">{rows}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto my-8">
      {renderHeader()}
      {renderDays()}

      {loading ? (
        <div className="px-4 py-6 text-center text-gray-500">Loading...</div>
      ) : (
        renderCells()
      )}

      <div className="flex justify-end px-4 py-2">
        <button
          onClick={onClose}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  )
}
