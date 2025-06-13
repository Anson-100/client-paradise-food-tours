import { StarIcon } from "@heroicons/react/20/solid"
import useGetTourPhotos from "@/hooks/CMSuseGetTourPhotos"
import useCompressImageUpload from "@/hooks/useCompressImageUpload"
import { useState, useEffect } from "react"
import useGetSingleTourImage from "@/hooks/CMSuseGetSingleTourImage"
import Hint from "./Hint"

type Props = {
  tour: {
    slug: string
    name: string
    title: string
    heroText: string
    about: string[]
    aboutText?: { col1: string; col2: string } // Removed photo
    included: { value: string; name: string }[]
    testimonial: {
      quote: string
      name: string
      role: string
      avatar: string
    }
    ctaLine: string
    galleryImages: string[]
    bannerImage: string
    aboutPhoto?: string // <-- Add this line
    details: { name: string; value: string }[] // ✅ add this
  }
}

const TourAdminEditor = ({ tour }: Props) => {
  const aboutKey = `${tour.slug}-aboutPhoto`

  const galleryImages = useGetTourPhotos(tour.galleryImages)
  const bannerImage = useGetSingleTourImage(tour.bannerImage)
  const avatarImage = useGetSingleTourImage(tour.testimonial.avatar)
  const aboutPhoto = useGetSingleTourImage(aboutKey)

  const { compressImage } = useCompressImageUpload()
  const [formData, setFormData] = useState({
    ...tour,
    aboutText:
      typeof tour.aboutText === "object" && tour.aboutText !== null
        ? tour.aboutText // already proper shape
        : {
            // was a string or undefined
            col1: typeof tour.aboutText === "string" ? tour.aboutText : "",
            col2: "",
          },
  })

  // const [stagedImages, setStagedImages] = useState<(File | null)[]>(() =>
  //   Array(tour.galleryImages.length).fill(null)
  // )

  const [stagedImages, setStagedImages] = useState<{
    [key: string]: File | null
  }>(() => {
    const initial: { [key: string]: File | null } = {}
    tour.galleryImages.forEach((_, i) => {
      initial[i] = null
    })
    initial["banner"] = null
    initial["avatar"] = null

    initial["aboutPhoto"] = null

    return initial
  })

  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    setStagedImages(prev => ({
      ...prev,
      [index]: file,
    }))
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const compressed = await compressImage(file)
      setStagedImages(prev => ({ ...prev, [key]: compressed }))
    } catch (err) {
      console.error("❌ Compression or staging failed", err)
      setUploadMessage({
        type: "error",
        text: `Image ${key} could not be processed.`,
      })
    }
  }

  const handleSaveChanges = async () => {
    /* ───────────── 1. TEXT GUARD-RAILS ───────────── */
    const titleLen = formData.title.trim().length
    const heroLen = formData.heroText.trim().length
    const ctaLen = formData.ctaLine.trim().length
    const quoteLen = formData.testimonial.quote.trim().length

    if (titleLen < 20 || titleLen > 60) {
      setUploadMessage({
        type: "error",
        text: "Title must be between 20 – 60 characters.",
      })
      return
    }

    if (heroLen < 60 || heroLen > 160) {
      setUploadMessage({
        type: "error",
        text: "Hero text must be between 60 – 160 characters.",
      })
      return
    }

    for (let i = 0; i < formData.about.length; i++) {
      const pLen = formData.about[i].trim().length
      if (pLen < 120 || pLen > 200) {
        setUploadMessage({
          type: "error",
          text: `“What to expect” paragraph ${i + 1} must be 120 – 200 characters.`,
        })
        return
      }
    }

    if (
      formData.aboutText.col1.trim().length < 250 ||
      formData.aboutText.col1.trim().length > 520
    ) {
      setUploadMessage({
        type: "error",
        text: "About text (left column) must be 250 – 520 characters.",
      })
      return
    }

    if (
      formData.aboutText.col2.trim().length < 250 ||
      formData.aboutText.col2.trim().length > 520
    ) {
      setUploadMessage({
        type: "error",
        text: "About text (right column) must be 250 – 520 characters.",
      })
      return
    }

    if (quoteLen < 60 || quoteLen > 180) {
      setUploadMessage({
        type: "error",
        text: "Testimonial quote must be 60 – 180 characters.",
      })
      return
    }

    if (ctaLen < 30 || ctaLen > 80) {
      setUploadMessage({
        type: "error",
        text: "CTA line must be 30 – 80 characters.",
      })
      return
    }

    /* ───────────── 2. ORIGINAL UPLOAD / SAVE FLOW ───────────── */
    setIsUploading(true)
    setUploadMessage(null)

    try {
      /* ---------- image uploads ---------- */
      for (const [key, file] of Object.entries(stagedImages)) {
        if (!file) continue

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () =>
            resolve((reader.result as string).split(",")[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        const imgRes = await fetch(
          "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-images",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: tour.slug,
              index: key,
              filename: `${key}.${file.name.split(".").pop()}`,
              fileBase64: base64,
            }),
          }
        )

        if (!imgRes.ok) {
          const errText = await imgRes.text()
          throw new Error(`Upload failed for image ${key}: ${errText}`)
        }
      }

      /* ---------- JSON save ---------- */
      const jsonRes = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: tour.slug,
            data: formData,
          }),
        }
      )

      if (!jsonRes.ok) {
        const errText = await jsonRes.text()
        throw new Error(`Text update failed: ${errText}`)
      }

      setUploadMessage({ type: "success", text: "All uploads complete!" })
    } catch (err) {
      console.error("❌ Upload error:", err)
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    return () => {
      Object.values(stagedImages).forEach(file => {
        if (file) URL.revokeObjectURL(file as any)
      })
    }
  }, [stagedImages])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof tour,
    index?: number,
    subField?: string
  ) => {
    setFormData(prev => {
      if (field === "about" && index !== undefined) {
        const updatedArray = [...prev.about]
        updatedArray[index] = e.target.value
        return { ...prev, about: updatedArray }
      }
      if (field === "details" && index !== undefined && subField) {
        const updatedArray = [...prev.details]
        updatedArray[index] = {
          ...updatedArray[index],
          [subField]: e.target.value,
        }
        return { ...prev, details: updatedArray }
      }

      if (field === "included" && index !== undefined && subField) {
        const updatedArray = [...prev.included]
        updatedArray[index] = {
          ...updatedArray[index],
          [subField]: e.target.value,
        }
        return { ...prev, included: updatedArray }
      }
      if (field === "aboutText" && subField) {
        return {
          ...prev,
          aboutText: { ...prev.aboutText, [subField]: e.target.value },
        }
      }

      if (field === "testimonial" && subField) {
        return {
          ...prev,
          testimonial: { ...prev.testimonial, [subField]: e.target.value },
        }
      }
      return { ...prev, [field]: e.target.value }
    })
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl lg:max-w-7xl pt-24 sm:pt-32">
        {/* HEADER */}
        <div className="max-w-4xl px-6 lg:px-8 space-y-6">
          <div className="font-bold text-base w-full">{formData.name}</div>

          {/* Title */}
          <div className="relative group">
            <textarea
              value={formData.title}
              onChange={e => handleInputChange(e, "title")}
              maxLength={60}
              className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 w-full text-4xl font-semibold tracking-tight text-pretty sm:text-5xl resize-none"
            />
            <Hint text="Main title · max 60 chars" className="-top-5 left-2" />
          </div>

          {/* Hero text */}
          <div className="relative group">
            <textarea
              value={formData.heroText}
              onChange={e => handleInputChange(e, "heroText")}
              maxLength={160}
              className="h-auto p-2 bg-blue-50 border text-xl border-blue-200 rounded-md shadow-inner text-blue-700 font-medium w-full resize-none"
            />
            <Hint
              text="Hero sub-text · max 160 chars"
              className="-top-5 left-2"
            />
          </div>

          <div className="pt-4">
            <div className="h-auto p-2 w-64 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
              Check Dates Button
            </div>
          </div>
        </div>

        {/* ABOUT + GALLERY + DETAILS */}
        <section className="my-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 px-6 lg:px-8">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty ">
              What to expect
            </h2>
            {formData.about.map((text, i) => (
              <div
                key={i}
                className={`relative group ${i === 1 ? "mt-6" : "mt-8"}`}
              >
                <textarea
                  value={text}
                  onChange={e => handleInputChange(e, "about", i)}
                  maxLength={200}
                  rows={4}
                  className="p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 font-medium px-4 w-full resize-none"
                />
                <Hint
                  text={`Paragraph ${i + 1} · max 200 chars`}
                  className="-top-5 left-4"
                />
              </div>
            ))}
          </div>

          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 ${
                    i % 2 !== 0 ? "-mt-8 lg:-mt-40" : ""
                  }`}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleDrop(e, i)}
                >
                  <img
                    alt=""
                    src={
                      stagedImages[i]
                        ? URL.createObjectURL(stagedImages[i])
                        : img
                    }
                    className="block size-full object-cover pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Hint
                      text="Aspect ratio · 1 / 1"
                      className="top-2 left-2"
                      always
                    />

                    <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileUpload(e, i.toString())}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500">
              Tour details
            </p>
            <hr className="mt-6 border-t border-gray-200" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {formData.details.map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-y-2 ${
                    i < formData.details.length - 1
                      ? "border-b border-dotted border-gray-200 pb-4"
                      : ""
                  }`}
                >
                  {/* Label */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={item.name}
                      onChange={e => handleInputChange(e, "details", i, "name")}
                      maxLength={15}
                      className="tracking-tight bg-blue-50 h-auto p-2 border border-blue-200 rounded-md shadow-inner text-blue-700 font-medium w-full"
                    />
                    <Hint
                      text="Label · max 15 chars"
                      className="-top-5 left-2"
                    />
                  </div>

                  {/* Value */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={item.value}
                      onChange={e =>
                        handleInputChange(e, "details", i, "value")
                      }
                      maxLength={8}
                      className="bg-blue-50 h-auto p-2 border border-blue-200 rounded-md shadow-inner text-blue-700 w-full text-6xl font-semibold tracking-tight"
                    />
                    <Hint text="Value · max 8" className="-top-5 left-2" />
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>
        {/* ---------- NEW: About-Text editor ---------- */}
        <section className="mx-6 lg:mx-8 mt-20 space-y-8">
          <h2 className="text-2xl font-semibold text-pretty">
            About Text (NEW)
          </h2>

          {/* two-column grid so it mirrors front-end layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="relative group">
              <textarea
                value={formData.aboutText.col1}
                onChange={e =>
                  handleInputChange(e, "aboutText", undefined, "col1")
                }
                maxLength={520}
                rows={10}
                placeholder="2 short paragraphs • stay inside the box"
                className="w-full p-3 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 font-medium resize-none"
              />
              <Hint
                text="Left column · max 520 chars"
                className="-top-5 left-2"
              />
            </div>

            {/* Column 2 */}
            <div className="relative group">
              <textarea
                value={formData.aboutText.col2}
                onChange={e =>
                  handleInputChange(e, "aboutText", undefined, "col2")
                }
                maxLength={520}
                rows={10}
                placeholder="2 short paragraphs • stay inside the box"
                className="w-full p-3 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 font-medium resize-none"
              />
              <Hint
                text="Right column · max 520 chars"
                className="-top-5 left-2"
              />
            </div>
          </div>

          {/* optional photo */}
          <div className="xl:mx-auto xl:max-w-7xl xl:px-8 mt-24">
            <div className="relative aspect-[5/2] w-full overflow-hidden rounded-3xl">
              <img
                alt=""
                src={
                  stagedImages["aboutPhoto"]
                    ? URL.createObjectURL(stagedImages["aboutPhoto"])
                    : aboutPhoto
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Hint
                  text="Aspect ratio · 2/3"
                  text2="5w → 2h ↑"
                  className="top-2"
                  always
                />

                <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                  Upload About Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, "aboutPhoto")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* INCLUDED */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-pretty ">
                  What's included
                </h2>
                <p className="mt-4 text-lg/8 text-gray-600">
                  Every tour includes great food, good company, and zero hassle.
                </p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {formData.included.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-xl shadow-inner p-6 space-y-4 font-semibold"
                  >
                    {/* Top (value) */}
                    <div className="relative group w-full">
                      <input
                        type="text"
                        value={item.value}
                        onChange={e =>
                          handleInputChange(e, "included", i, "value")
                        }
                        maxLength={12}
                        className="w-full text-3xl p-2 bg-white border border-blue-100 rounded-md text-center text-blue-700"
                      />
                      <Hint text="Title · max 12 " className="-top-5 left-2" />
                    </div>

                    {/* Bottom (name) */}
                    <div className="relative group w-full">
                      <input
                        type="text"
                        value={item.name}
                        onChange={e =>
                          handleInputChange(e, "included", i, "name")
                        }
                        maxLength={26}
                        className="h-auto w-full p-2 bg-white border border-blue-100 rounded-md text-center text-blue-600"
                      />
                      <Hint
                        text="Sub-text · max 26 "
                        className="-top-5 left-2"
                      />
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* BANNER */}
        {/* <div className="xl:mx-auto xl:max-w-7xl xl:px-8 mt-24">
        <img
          alt=""
          src={formData.bannerImage}
          className="aspect-5/2 w-full object-cover xl:rounded-3xl"
        />
      </div> */}
        <div className="xl:mx-auto xl:max-w-7xl xl:px-8 mt-24">
          <div className="relative aspect-[5/2] w-full overflow-hidden rounded-3xl">
            <img
              alt=""
              src={
                stagedImages["banner"]
                  ? URL.createObjectURL(stagedImages["banner"])
                  : bannerImage
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Hint
                text="Aspect ratio · 2/3"
                text2="5w → 2h ↑"
                className="top-2"
                always
              />
              <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                Upload Banner
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, "banner")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL */}
        <section className="px-6 py-24 sm:py-32 lg:px-8">
          <figure className="mx-auto max-w-2xl space-y-10">
            <div className="flex gap-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="size-5" />
              ))}
            </div>
            {/* Quote */}
            <div className="relative group">
              <textarea
                value={formData.testimonial.quote}
                onChange={e =>
                  handleInputChange(e, "testimonial", undefined, "quote")
                }
                maxLength={180}
                rows={3}
                className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 text-base font-medium px-4 w-full resize-none"
              />
              <Hint
                text="Testimonial · max 180 chars"
                className="-top-5 left-2"
              />
            </div>
            <figcaption className="flex items-center gap-x-6">
              {/* <div className="size-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-400">
              <img
                src={formData.testimonial.avatar}
                alt="avatar"
                className="rounded-full size-full object-cover"
              />
            </div> */}
              <div className="size-12 rounded-full bg-white border border-gray-300 shadow-sm relative overflow-hidden">
                <img
                  src={
                    stagedImages["avatar"]
                      ? URL.createObjectURL(stagedImages["avatar"])
                      : avatarImage
                  }
                  alt="avatar"
                  className="rounded-full size-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, "avatar")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="space-y-1 flex flex-col gap-4">
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.testimonial.name}
                    onChange={e =>
                      handleInputChange(e, "testimonial", undefined, "name")
                    }
                    maxLength={25}
                    className="h-auto p-2 w-40 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 font-medium"
                  />
                  <Hint text="Name · max 25 " className="-top-5 left-2" />
                </div>

                {/* Role */}
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.testimonial.role}
                    onChange={e =>
                      handleInputChange(e, "testimonial", undefined, "role")
                    }
                    maxLength={25}
                    className="h-auto p-2 w-32 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-600 font-medium"
                  />
                  <Hint text="Role · max 25" className="-top-5 left-2" />
                </div>
              </div>
            </figcaption>
          </figure>
        </section>

        {/* CTA */}
        <section className="bg-blue-50/50 border border-blue-100 rounded-lg mx-6 lg:mx-8 mt-16 mb-8">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl space-y-4 text-4xl sm:text-5xl font-semibold">
              <p className="">Hungry for more?</p>
              <div className="relative group">
                <textarea
                  value={formData.ctaLine}
                  onChange={e => handleInputChange(e, "ctaLine")}
                  maxLength={80}
                  rows={2}
                  className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner flex items-center justify-center text-blue-700 w-full resize-none"
                />
                <Hint
                  text="CTA line · max 80 chars"
                  className="-top-5 left-2"
                />
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="h-auto p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-400">
                Check Dates Button
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* SUBMIT BUTTON */}
      {uploadMessage && (
        <div className="w-full flex">
          <div
            className={`mb-2 px-2 bg-white rounded border mx-auto text-center py-2 font-semibold ${
              uploadMessage.type === "success"
                ? "text-green-700 border-green-700"
                : "text-red-700 border-red-700"
            }`}
          >
            {uploadMessage.text}
          </div>
        </div>
      )}

      <button
        onClick={handleSaveChanges}
        disabled={isUploading}
        className={`w-full text-white font-medium py-2 rounded hover cursor-pointer ${
          isUploading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-550"
        }`}
      >
        {isUploading ? "Uploading..." : "Save Changes"}
      </button>
    </div>
  )
}

export default TourAdminEditor
