// ModalContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react"
import ReactDOM from "react-dom"
import CheckDatesDialog from "@/components/CheckDatesDialog" // Assuming this is the correct path

type ModalContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRootRef = useRef(document.createElement("div"))

  useEffect(() => {
    if (modalRootRef.current) {
      document.body.appendChild(modalRootRef.current)
      return () => {
        document.body.removeChild(modalRootRef.current)
      }
    }
  }, [])

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      {isOpen &&
        modalRootRef.current &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-zinc-100 bg-opacity-50 z-50"
            onMouseDown={e => {
              if (e.target === e.currentTarget) {
                setIsOpen(false)
              }
            }}
          >
            <CheckDatesDialog onClose={() => setIsOpen(false)} />
          </div>,
          modalRootRef.current
        )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
