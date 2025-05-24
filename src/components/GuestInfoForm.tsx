// src/components/GuestInfoForm.tsx
import React, { useState } from "react"

type Props = {
  productId: string
  date: string
  slot: string
  onBooked: (bookingId: string) => void
  onClose: () => void
}

function GuestInfoForm({ productId, date, slot, onBooked, onClose }: Props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with peekClient.book(...) later
    onBooked("demo-booking-id")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Your Info</h2>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded"
        >
          Book Now
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default GuestInfoForm
