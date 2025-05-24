// src/components/PeekBookingDialog.tsx
import { useState } from "react"
import AvailabilityCalendar from "./AvailabilityCalendar"
import SlotSelector from "./SlotSelector"
import GuestInfoForm from "./GuestInfoForm"
import BookingConfirmation from "./BookingConfirmation"

type Props = {
  productId: string
  onClose: () => void
}

export default function PeekBookingDialog({ productId, onClose }: Props) {
  const [step, setStep] = useState<"calendar" | "slot" | "info" | "confirm">(
    "calendar"
  )
  const [date, setDate] = useState<string>("")
  const [slot, setSlot] = useState<string>("")
  const [bookingId, setBookingId] = useState<string>("")

  switch (step) {
    case "calendar":
      return (
        <AvailabilityCalendar
          productId={productId}
          onDateSelect={(d: string) => {
            setDate(d)
            setStep("slot")
          }}
          onClose={onClose}
        />
      )
    case "slot":
      return (
        <SlotSelector
          productId={productId}
          date={date}
          onSlotSelect={(s: string) => {
            setSlot(s)
            setStep("info")
          }}
          onClose={onClose}
        />
      )
    case "info":
      return (
        <GuestInfoForm
          productId={productId}
          date={date}
          slot={slot}
          onBooked={(id: string) => {
            setBookingId(id)
            setStep("confirm")
          }}
          onClose={onClose}
        />
      )
    case "confirm":
      return <BookingConfirmation bookingId={bookingId} onClose={onClose} />
  }
}
