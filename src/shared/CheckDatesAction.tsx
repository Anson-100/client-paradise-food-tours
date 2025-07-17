import { useEffect, useState, useRef, ReactNode, useMemo } from "react"
import ReactDOM from "react-dom"
import ActionButton from "./ActionButton"
import CheckDatesDialog from "@/components/CheckDatesDialog"
import { AnimatePresence, motion } from "framer-motion"

// import tourTagMap from "@/data/tourTagMap.json"
import interactionTagMap from "@/data/interactionTagMap.json"

/* ─── types ────────────────────────────────────────────── */
type LocationKey = keyof typeof interactionTagMap

interface Props {
  /** slug of the tour this button belongs to, or null if not tied to a tour */
  tourSlug: string | null
  /** where this button is rendered ("tour_card" | "tour_page" | "navbar" | "hero" | "cta") */
  locationKey: LocationKey
  /** optional custom render for the button */
  customButton?: (onClick: () => void) => ReactNode
}

/* ─── component ────────────────────────────────────────── */
const CheckDatesAction = ({ tourSlug, locationKey, customButton }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRoot = useRef<HTMLDivElement>(document.createElement("div"))

  /* build the tag-array exactly once per prop change */
  const tagIds = useMemo(() => {
    const ids: number[] = []

    /* 1) always the interaction tag */
    ids.push(interactionTagMap[locationKey])

    // if (tourSlug && tourTagMap[tourSlug as keyof typeof tourTagMap]) {
    //   ids.push(tourTagMap[tourSlug as keyof typeof tourTagMap])
    // }

    return ids
  }, [locationKey])

  useEffect(() => {
    const el = modalRoot.current // cache ref
    if (!el) return // safety for SSR or very early render

    document.body.appendChild(el)

    return () => {
      document.body.removeChild(el)
    }
  }, [])

  /* close on Escape */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    if (isOpen) window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [isOpen])

  /* ─── render ─────────────────────────────────────────── */
  return (
    <>
      {customButton ? (
        customButton(() => setIsOpen(true))
      ) : (
        <ActionButton onClick={() => setIsOpen(true)}>Check dates</ActionButton>
      )}

      {ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* overlay */}
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* centered dialog */}
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.15 },
                  },
                  exit: {
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CheckDatesDialog
                  onClose={() => setIsOpen(false)}
                  tagIds={tagIds}
                  initialTourSlug={tourSlug}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body // one portal target that always exists
      )}
    </>
  )
}

export default CheckDatesAction
export type { LocationKey }
