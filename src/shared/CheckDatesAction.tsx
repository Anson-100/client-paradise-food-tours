import { useEffect, useState, useRef, ReactNode, useMemo } from "react"
import ReactDOM from "react-dom"
import ActionButton from "./ActionButton"
import CheckDatesDialog from "@/components/CheckDatesDialog"

import tourTagMap from "@/data/tourTagMap.json"
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

    /* 2) optionally the tour tag */
    if (tourSlug && tourTagMap[tourSlug as keyof typeof tourTagMap]) {
      ids.push(tourTagMap[tourSlug as keyof typeof tourTagMap])
    }

    return ids
  }, [tourSlug, locationKey])

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

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onMouseDown={e => e.target === e.currentTarget && setIsOpen(false)}
          >
            <CheckDatesDialog
              onClose={() => setIsOpen(false)}
              tagIds={tagIds}
            />
          </div>,
          modalRoot.current
        )}
    </>
  )
}

export default CheckDatesAction
export type { LocationKey }
