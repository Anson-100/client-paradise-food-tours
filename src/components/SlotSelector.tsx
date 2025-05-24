// src/components/SlotSelector.tsx
import React from "react"

type Props = {
  productId: string
  date: string
  onSlotSelect: (slot: string) => void
  onClose: () => void
}

function SlotSelector({ productId, date, onSlotSelect, onClose }: Props) {
  // Dummy slots
  const slots = ["09:00 AM", "02:00 PM", "06:00 PM"]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select a time on {date}</h2>
      <ul className="space-y-2">
        {slots.map(s => (
          <li key={s}>
            <button
              onClick={() => onSlotSelect(s)}
              className="px-4 py-2 bg-teal-500 text-white rounded-md"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onClose} className="mt-4 text-sm text-gray-600">
        Cancel
      </button>
    </div>
  )
}

export default SlotSelector
