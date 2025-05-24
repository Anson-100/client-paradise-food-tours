import { useState } from "react"
import ReactDOM from "react-dom"
import PeekBookButton from "./PeekBookButton"
import PeekBookingDialog from "@/components/PeekBookingDialog"

type Props = { productId: string }

export default function PeekBookAction({ productId }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  console.log("PeekBookAction isOpen =", isOpen)

  return (
    <>
      {/* this button now definitely fires */}
      <PeekBookButton onClick={open}>Check Dates</PeekBookButton>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={close}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <PeekBookingDialog productId={productId} onClose={close} />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
