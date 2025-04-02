import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"

import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const ContactUs = ({ setSelectedPage }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: data.message,
    }

    try {
      setSubmissionStatus(null) // reset status before sending

      const res = await fetch(
        "https://m1ffj58tfe.execute-api.us-east-1.amazonaws.com/LawnHarmonySendEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      const resData = await res.json()
      console.log("Form submitted successfully:", resData.message)
      setSubmissionStatus("success") // ✅ Show confirmation
      reset()
    } catch (err) {
      console.error("Form submission error:", err)
      setSubmissionStatus("error") // ❌ Show error
    }
  }

  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null)

  return (
    <section id="contactus" className="min-h-[100vh] relative isolate ">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2"
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        <div className="relative px-6 pt-24 pb-20 sm:py-36 xl:py-40 flex items-center lg:static lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-neutral-100 ring-1 ring-neutral-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-neutral-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-neutral-200/60"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold tracking-tight text-zinc-600">
                Contact Us
              </h3>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl">
                Get in Touch
              </h2>
            </div>

            <p className="mt-6 text-lg/8 text-gray-600">
              Have questions or need a quote? We're here to help with all your
              lawn and landscaping needs. Reach out by phone, email, or the form
              on this page and we’ll get back to you soon. We look forward to
              hearing from you!
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    aria-hidden="true"
                    className="h-7 w-6 text-emerald-500"
                  />
                </dt>
                <dd>
                  555 Gulf of America Ave
                  <br />
                  Bradenton, FL 34208
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-emerald-500"
                  />
                </dt>
                <dd>
                  <a
                    href="tel:+1 (555) 234-5678"
                    className="hover:text-gray-900"
                  >
                    +1 (555) 555-5555
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-emerald-500"
                  />
                </dt>
                <dd>
                  <a
                    href="mailto:hello@example.com"
                    className="hover:text-gray-900"
                  >
                    customerservice@lawnharmony.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* CONTACT FORM=================================================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 sm:py-36 xl:py-32 2xl:py-40 my-auto"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-semibold text-zinc-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    type="text"
                    autoComplete="family-name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-zinc-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
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
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* PHONE NUMBER------------- */}
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
                  const formatPhoneNumber = (input: string) => {
                    const digits = input.replace(/\D/g, "").slice(0, 10)
                    const area = digits.slice(0, 3)
                    const middle = digits.slice(3, 6)
                    const last = digits.slice(6, 10)

                    if (digits.length > 6) return `${area}-${middle}-${last}`
                    if (digits.length > 3) return `${area}-${middle}`
                    return area
                  }

                  return (
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Phone number
                      </label>
                      <div className="mt-2.5">
                        <input
                          id="phone-number"
                          type="tel"
                          value={value || ""}
                          onChange={e =>
                            onChange(formatPhoneNumber(e.target.value))
                          }
                          {...field}
                          className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                        />
                        {error && (
                          <p className="mt-1 text-sm text-red-600">
                            {error.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                }}
              />

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-end gap-3">
              {/* Feedback Message */}
              {submissionStatus === "success" && (
                <p className="text-sm text-emerald-600 font-medium">
                  Message sent!
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="text-sm text-red-600 font-medium">
                  Error sending message. Please try again.
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`hover:cursor-pointer rounded-md px-5 py-3 w-full sm:w-auto font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Send message"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  )
}

export default ContactUs
