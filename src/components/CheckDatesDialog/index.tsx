import { useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ContactForm from "@/components/ContactForm"

type Props = {
  onClose: () => void
  tagIds: number[]
  initialTourSlug?: string | null
}

const CheckDatesDialog = ({ onClose, tagIds, initialTourSlug }: Props) => {
  /* ------------------------------------------------------------------ */
  /*  Escape key + body-scroll lock                                     */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    document.body.classList.add("overflow-hidden")
    return () => document.body.classList.remove("overflow-hidden")
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  /* ------------------------------------------------------------------ */
  /*  Dialog shell                                                      */
  /* ------------------------------------------------------------------ */
  return (
    <div className="fixed inset-0 top-0 z-50 p-4 pb-6  overflow-hidden">
      <div className="h-3 max-w-3xl mx-auto bg-teal-500 rounded-t-lg" />
      <div className="relative mx-auto flex max-h-full  w-full max-w-3xl flex-col overflow-hidden rounded-b-lg bg-white shadow-xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-zinc-100 px-6 py-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Check dates
          </h2>
          <p className="mt-1 text-base text-gray-600 sm:text-lg">
            Let us know what you're looking for — we’ll follow up with next
            steps
          </p>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute right-4 top-4 text-zinc-400 transition hover:cursor-pointer hover:text-zinc-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* FORM + BLOBS */}
        <div className="relative isolate overflow-y-auto bg-zinc-100 px-6 py-8 sm:px-10">
          {/* Blobs (unchanged markup) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-64 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-30 xl:justify-end"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
            />
          </div>

          {/* Shared form */}
          <ContactForm
            actionUrl="https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/checkdates-submit"
            extraPayload={{ tagIds }}
            submitLabel="Send message"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            initialTourSlug={initialTourSlug ?? undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default CheckDatesDialog
