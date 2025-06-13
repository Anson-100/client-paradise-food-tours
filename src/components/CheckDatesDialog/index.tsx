import { useForm, Controller } from "react-hook-form"
import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

type Props = {
  onClose: () => void
  tagIds: number[]
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  groupSize: string
}

const CheckDatesDialog = ({ onClose, tagIds }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>()

  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null)

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: data.message,
      groupSize: data.groupSize,
      tagIds,
    }

    try {
      setSubmissionStatus(null)
      const res = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/checkdates-submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      const resData = await res.json()
      console.log("Form submitted successfully:", resData.message)
      setSubmissionStatus("success")
      reset()
    } catch (err) {
      console.error("Form submission error:", err)
      setSubmissionStatus("error")
    }
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden")
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 top-8 z-50 overflow-hidden  p-4">
      <div className="h-3 max-w-3xl mx-auto bg-teal-500 rounded-t-lg mx"></div>
      <div className="relative w-full max-w-3xl max-h-[80vh] bg-white shadow-xl rounded-b-lg overflow-hidden flex flex-col mx-auto">
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-gray-200 sticky top-0 bg-zinc-100 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Check date availability
          </h2>
          <p className="mt-1 text-gray-600 text-base sm:text-lg">
            Let us know what you're looking for — we’ll follow up with options
            and next steps.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition hover:cursor-pointer"
            aria-label="Close dialog"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* FORM CONTENT */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto px-6 py-8 sm:px-10 bg-zinc-100 relatie isolate"
        >
          {/* {" "}BG BLOBS================== */}
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
          </div>{" "}
          {/* 2================== */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-20 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
            />
          </div>
          {/* FORM---------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold text-gray-900"
              >
                First name
              </label>
              <input
                id="first-name"
                type="text"
                autoComplete="given-name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="mt-2 w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold text-gray-900"
              >
                Last name
              </label>
              <input
                id="last-name"
                type="text"
                autoComplete="family-name"
                {...register("lastName", { required: "Last name is required" })}
                className="mt-2 w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="mt-2 w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3}-\d{4}$/,
                  message: "Format must be 123-456-7890",
                },
              }}
              render={({
                field: { onChange, value, ...field },
                fieldState: { error },
              }) => {
                const formatPhone = (input: string) => {
                  const digits = input.replace(/\D/g, "").slice(0, 10)
                  const a = digits.slice(0, 3)
                  const b = digits.slice(3, 6)
                  const c = digits.slice(6, 10)
                  if (digits.length > 6) return `${a}-${b}-${c}`
                  if (digits.length > 3) return `${a}-${b}`
                  return a
                }

                return (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={value || ""}
                      onChange={e => onChange(formatPhone(e.target.value))}
                      {...field}
                      className="mt-2 w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {error && (
                      <p className="text-sm text-red-600 mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )
              }}
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message", { required: "Message is required" })}
                className="mt-2 w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <fieldset className="sm:col-span-2">
              <legend className="block text-sm font-semibold text-gray-900">
                Group size
              </legend>

              <div className="mt-4 flex flex-col gap-3  text-gray-600">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="Just me"
                    {...register("groupSize")}
                    defaultChecked
                    className="accent-teal-500"
                  />
                  Just me
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="Group of 2 – 14"
                    {...register("groupSize")}
                    className="accent-teal-500"
                  />
                  Group of 2 – 14
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="Corporate event"
                    {...register("groupSize")}
                    className="accent-teal-500"
                  />
                  Corporate event
                </label>
              </div>
            </fieldset>
          </div>
          <div className="mt-8 border-t border-gray-300 pt-6 flex flex-col items-end gap-3">
            {submissionStatus === "success" && (
              <p className="text-sm text-emerald-600 font-medium">
                Message sent!
              </p>
            )}
            {submissionStatus === "error" && (
              <p className="text-sm text-red-600 font-medium">
                Something went wrong. Try again.
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-md font-semibold text-white hover:cursor-pointer hover:bg-teal-550 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-5500 "
              }`}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckDatesDialog
