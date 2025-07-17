// src/components/ContactForm.tsx
import { useForm, Controller } from "react-hook-form"
import { useState, useEffect, useMemo } from "react"
import TourSelectDropdown, { TourOption } from "./TourSelectDropdown"
import useGetSceneContent from "@/hooks/useGetSceneContent" // ⬅ fetches sectionone.json

import tourTagMap from "@/data/tourTagMap.json" // (slug  ➜ tagId map)

// ...

export interface ContactFormProps {
  actionUrl: string
  extraPayload?: {
    tagIds?: number[]
  } & Record<string, unknown>
  onSuccess?: () => void
  submitLabel?: string
  className?: string

  initialTourSlug?: string
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  groupSize: string
  tour?: string
}

const ContactForm = ({
  actionUrl,
  extraPayload,
  onSuccess,
  submitLabel = "Send message",
  className = "",

  initialTourSlug,
}: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: { tour: initialTourSlug ?? "" },
  })

  const [status, setStatus] = useState<"success" | "error" | null>(null)

  /* auto-load all tours from sectionone.json */
  const { content: scene, isLoading: toursLoading } =
    useGetSceneContent("sectionone")

  /* build dropdown options only once JSON is in */
  const autoTourOptions: TourOption[] =
    !toursLoading && scene?.tours
      ? scene.tours
          .filter((t: { visible: any }) => t.visible)
          .map((t: { title: any; slug: any }) => ({
            label: t.title,
            value: t.slug,
          }))
      : []

  /* actual list used by the dropdown: prefer the prop, else the auto list */
  const dropdownOptions = useMemo(() => autoTourOptions, [autoTourOptions])

  console.log("initialTourSlug:", initialTourSlug)
  console.log("dropdownOptions:", dropdownOptions)
  console.log("current RHF value:", watch("tour"))

  // ⬇️  put this right after you create dropdownOptions
  useEffect(() => {
    if (initialTourSlug) {
      setValue("tour", initialTourSlug, {
        shouldValidate: false,
        shouldDirty: false,
      })
    }
  }, [initialTourSlug, setValue])

  /* helper – phone formatter */
  const formatPhone = (input: string) => {
    const d = input.replace(/\D/g, "").slice(0, 10)
    const a = d.slice(0, 3)
    const b = d.slice(3, 6)
    const c = d.slice(6, 10)
    if (d.length > 6) return `${a}-${b}-${c}`
    if (d.length > 3) return `${a}-${b}`
    return a
  }

  const onSubmit = async (data: FormData) => {
    console.log("Submitted slug:", data.tour)
    console.log(
      "Resolved tagId:",
      tourTagMap[data.tour as keyof typeof tourTagMap]
    )

    /* 1 — start with interaction tag(s) that arrived from the dialog */
    const tagIds: number[] = Array.isArray(extraPayload?.tagIds)
      ? [...extraPayload.tagIds]
      : []

    /* 2 — add the tour tag chosen in the dropdown */
    if (data.tour) {
      const tourTag = tourTagMap[data.tour as keyof typeof tourTagMap]
      if (tourTag) tagIds.push(tourTag)
    }

    const payload = {
      ...extraPayload, // keep any other passthrough props
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: data.message,
      groupSize: data.groupSize,
      tour: data.tour,
      tagIds, // ← final combined list
    }
    try {
      setStatus(null)
      await fetch(actionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      setStatus("success")
      reset({ tour: initialTourSlug ?? "" })
      onSuccess?.()
    } catch (err) {
      console.error("ContactForm error:", err)
      setStatus("error")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${className}`}
    >
      {/* First / last name */}
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
          {...register("firstName", { required: "First name is required" })}
          className="mt-2 w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
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
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
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
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone (Controller so we can format) */}
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
        }) => (
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
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </div>
        )}
      />
      {/* Tour dropdown – only render when we have tourOptions */}

      {dropdownOptions.length > 0 && (
        <div className="sm:col-span-2">
          <label
            htmlFor="tour"
            className="block text-sm font-semibold text-gray-900"
          >
            Tour of interest
          </label>

          <Controller
            name="tour"
            control={control}
            rules={{ required: "Please choose a tour" }}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <>
                  <TourSelectDropdown
                    options={dropdownOptions}
                    value={dropdownOptions.find(o => o.value === value) ?? null}
                    onChange={opt => onChange(opt.value)}
                  />

                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error.message}</p>
                  )}
                </>
              )
            }}
          />
        </div>
      )}

      {/* Message */}
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
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Group size radios */}
      <fieldset className="sm:col-span-2">
        <legend className="block text-sm font-semibold text-gray-900">
          Group size
        </legend>

        <div className="mt-4 flex flex-col gap-4 text-gray-600 group">
          {["Just me", "Group of 2 – 14", "Corporate event"].map(option => (
            <label
              key={option}
              className="flex items-center gap-3 group-hover:cursor-pointer"
            >
              {/* Actual radio (still focusable, screen-reader friendly) */}
              <input
                type="radio"
                value={option}
                {...register("groupSize")}
                defaultChecked={option === "Just me"}
                className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-teal-500 checked:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden group-hover:cursor-pointer"
              />

              {/* Custom visual */}

              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Footer: success / error + button */}
      <div className="mt-8 sm:col-span-2 border-t border-gray-300 pt-6 flex flex-col items-end gap-3">
        {status === "success" && (
          <p className="text-sm font-medium text-emerald-600">Message sent!</p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600">
            Something went wrong. Try again.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto rounded-md px-5 py-2.5 font-semibold hover:cursor-pointer text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-550"
          }`}
        >
          {isSubmitting ? "Sending..." : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
