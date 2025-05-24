// src/components/BookingConfirmation.tsx
import React from "react"

type Props = {
  bookingId: string
  onClose: () => void
}

function BookingConfirmation({ bookingId, onClose }: Props) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-semibold">Booking Confirmed!</h2>
      <p>Your booking ID is:</p>
      <p className="font-mono text-lg">{bookingId}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
      >
        Close
      </button>
    </div>
  )
}

export default BookingConfirmation
