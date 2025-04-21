import { useEffect, useState, useRef, ReactNode } from "react"
import ReactDOM from "react-dom"
import ActionButton from "./ActionButton"
import CheckDatesDialog from "@/components/CheckDatesDialog"

type Props = {
  customButton?: (onClick: () => void) => ReactNode
}

const CheckDatesAction = ({ customButton }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRoot = useRef(document.createElement("div"))

  useEffect(() => {
    document.body.appendChild(modalRoot.current)
    return () => {
      document.body.removeChild(modalRoot.current)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <>
      {customButton ? (
        customButton(() => setIsOpen(true))
      ) : (
        <ActionButton onClick={() => setIsOpen(true)}>Check dates</ActionButton>
      )}

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onMouseDown={e => {
              if (e.target === e.currentTarget) {
                setIsOpen(false)
              }
            }}
          >
            <CheckDatesDialog onClose={() => setIsOpen(false)} />
          </div>,
          modalRoot.current
        )}
    </>
  )
}

export default CheckDatesAction
