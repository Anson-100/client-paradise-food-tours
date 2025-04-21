// import { tours } from "@/scenes/tours/tourData"
import { StarIcon } from "@heroicons/react/20/solid"
import useGetTourPhotos from "@/hooks/useGetTourPhotos"
import useCompressImageUpload from "@/hooks/useCompressImageUpload"

import { useState, useEffect } from "react"

type Props = {
  tour: {
    slug: string // ← add this line
    name: string
    title: string
    heroText: string
    about: string[]
    duration: string
    stops: number
    guests: string
    cost: string
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
  }
}

const TourAdminEditor = ({ tour }: Props) => {
  const galleryImages = useGetTourPhotos(tour.galleryImages)

  const { compressImage } = useCompressImageUpload()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const newStaged = [...stagedImages]
    newStaged[index] = file
    setStagedImages(newStaged)
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const compressed = await compressImage(file)
      const newStaged = [...stagedImages]
      newStaged[index] = compressed
      setStagedImages(newStaged)
    } catch (err) {
      console.error("❌ Compression or staging failed", err)
      setUploadMessage({
        type: "error",
        text: `Image ${index + 1} could not be processed.`,
      })
    }
  }

  const [stagedImages, setStagedImages] = useState<(File | null)[]>(() =>
    Array(tour.galleryImages.length).fill(null)
  )

  const handleSaveChanges = async () => {
    setIsUploading(true)
    setUploadMessage(null)

    for (let i = 0; i < stagedImages.length; i++) {
      const file = stagedImages[i]
      if (!file) continue

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            if (!reader.result) return reject("No file result")
            resolve((reader.result as string).split(",")[1])
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        const res = await fetch(
          "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-images",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: tour.slug,
              index: i,
              filename: `image-${i}.${file.name.split(".").pop()}`,
              fileBase64: base64,
            }),
          }
        )

        if (!res.ok) {
          const errText = await res.text()
          throw new Error(errText)
        }

        const data = await res.json()
        console.log(`✅ Uploaded ${file.name} to slot ${i}`, data)
      } catch (err) {
        console.error(`❌ Failed upload for slot ${i}`, err)
        setUploadMessage({
          type: "error",
          text: `Upload failed for image ${i + 1}.`,
        })
        setIsUploading(false)
        return
      }
    }

    setIsUploading(false)
    setUploadMessage({ type: "success", text: "All uploads complete!" })
  }

  useEffect(() => {
    return () => {
      stagedImages.forEach(file => {
        if (file) URL.revokeObjectURL(file as any)
      })
    }
  }, [stagedImages])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl pt-24 sm:pt-32">
      {/* HEADER */}
      <div className="max-w-4xl px-6 lg:px-8 space-y-6">
        <div className="h-auto p-2 font-bold">{tour.name}</div>
        <div className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 text-base font-medium">
          {tour.title}
        </div>
        <div className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700  font-medium">
          {tour.heroText}
        </div>
        <div className="pt-4">
          <div className="h-auto p-2 w-64 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-400 ">
            Check Dates Button
          </div>
        </div>
      </div>

      {/* ABOUT + GALLERY + DETAILS */}
      <section className="my-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 px-6 lg:px-8">
        <div className="lg:pr-8">
          <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
            About the tour
          </h2>
          {tour.about.map((text, i) => (
            <div
              key={i}
              className={`${
                i === 1 ? "mt-6" : "mt-8"
              } h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner  text-blue-700  font-medium  px-4`}
            >
              {text}
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
                    stagedImages[i] ? URL.createObjectURL(stagedImages[i]) : img
                  }
                  className="block size-full object-cover pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileUpload(e, i)}
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
            Tour Details
          </p>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 ">
            {[
              ["Duration", tour.duration],
              ["Stops", tour.stops],
              ["Guests", tour.guests],
              ["Cost", tour.cost],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex flex-col gap-y-2 ${
                  i < 3 ? "border-b border-dotted border-gray-200 pb-4" : ""
                }`}
              >
                <dt className=" text-zinc-800 ">{label}</dt>
                <dd className="order-first  tracking-tight bg-blue-50 h-auto p-2 border border-blue-200 rounded-md shadow-inner  text-blue-700  font-medium">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
                What's included
              </h2>
              <div className="h-14 bg-blue-50 border border-blue-200 rounded-md shadow-inner flex items-center justify-center text-blue-700  font-medium">
                Every tour includes great food, good company, and zero hassle.
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {tour.included.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-xl shadow-inner p-6 space-y-2"
                >
                  <div className="h-auto w-24 p-2 bg-white border border-blue-100 rounded-md flex items-center justify-center text-blue-700  font-medium">
                    {item.value}
                  </div>
                  <div className="h-auto w-32 p-2 bg-white border border-blue-100 rounded-md flex items-center justify-center text-blue-600  font-medium">
                    {item.name}
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <div className="xl:mx-auto xl:max-w-7xl xl:px-8 mt-24">
        <img
          alt=""
          src={tour.bannerImage}
          className="aspect-5/2 w-full object-cover xl:rounded-3xl"
        />
      </div>

      {/* TESTIMONIAL */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <figure className="mx-auto max-w-2xl space-y-10">
          <div className="flex gap-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="size-5" />
            ))}
          </div>
          <div className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner  text-blue-700 text-base font-medium px-4 ">
            {tour.testimonial.quote}
          </div>
          <figcaption className="flex items-center gap-x-6">
            <div className="size-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-400 ">
              <img
                src={tour.testimonial.avatar}
                alt="avatar"
                className="rounded-full size-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="h-auto p-2 w-40 bg-blue-50 border border-blue-200 rounded-md shadow-inner  text-blue-700  font-medium">
                {tour.testimonial.name}
              </div>
              <div className="h-auto p-2 w-32 bg-blue-50 border border-blue-200 rounded-md shadow-inner  text-blue-600  font-medium">
                {tour.testimonial.role}
              </div>
            </div>
          </figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section className="bg-blue-50/50 border border-blue-100 rounded-lg mx-6 lg:mx-8 mt-16 mb-8">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="">Hungry for more?</p>
            <div className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner flex items-center justify-center text-blue-700 text-base font-medium">
              {tour.ctaLine}
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="h-auto p-2  bg-gray-100 border border-gray-300 rounded-md  text-gray-400 ">
              Check Dates Button
            </div>
          </div>
        </div>
      </section>
      {/* SUBMIT BUTTON=============== */}
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
          isUploading ? "bg-gray-400" : "bg-indigo-700 hover:bg-indigo-600"
        }`}
      >
        {isUploading ? "Uploading..." : "Save Changes"}
      </button>
    </div>
  )
}

export default TourAdminEditor
