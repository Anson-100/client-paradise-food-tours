import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"
import TourGridCard from "./TourGridCard"
import Hint from "./Hint"

import useCompressImageUpload from "@/hooks/useCompressImageUpload"

// Types

type Option = {
  id: number
  name: string
  count: number
  value: string // ← new
}

type TourCard = {
  title: string
  desc: string
  type: string
  price: string
  duration: string
  status: string
  link: string
  location: string
  image: string
  visible: boolean
  isWalking: boolean // ← new
}

type FormData = {
  sceneTitle: string
  tagline: string
  tours: TourCard[]
}

const TourGridAdminEditor = () => {
  const { content, isLoading } = useGetSceneContent("sectionone")
  const { compressImage } = useCompressImageUpload()

  const [formData, setFormData] = useState<FormData>({
    sceneTitle: "",
    tagline: "",
    tours: [],
  })

  const [dragOverKey, setDragOverKey] = useState<string | null>(null)
  const [stagedImages, setStagedImages] = useState<{
    [key: string]: File | null
  }>({})

  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  useEffect(() => {
    if (content) {
      setFormData(content)
      const initialImages: { [key: string]: File | null } = {}
      content.tours.forEach((_: any, i: any) => {
        initialImages[`image-${i}`] = null
      })
      setStagedImages(initialImages)
    }
  }, [content])

  const location: Option[] = useMemo(() => {
    const counts: Record<string, number> = {}
    formData.tours.forEach(t => {
      counts[t.location] = (counts[t.location] || 0) + 1
    })

    const locOptions = Object.entries(counts).map(([loc, count], i) => ({
      id: i + 2,
      name: `${loc} Tours`,
      count,
      value: loc,
    }))

    const walkingCount = formData.tours.filter(t => t.isWalking).length

    return [
      { id: 1, name: "All Tours", count: formData.tours.length, value: "all" },
      ...locOptions,
      {
        id: locOptions.length + 2,
        name: "Walking Tours",
        count: walkingCount,
        value: "walking",
      },
    ]
  }, [formData])

  const [selected, setSelected] = useState<Option | null>(null)

  useEffect(() => {
    if (!selected && location.length > 0) {
      setSelected(location[0])
    }
  }, [location, selected])

  const handleTourChange = (
    index: number,
    field: keyof TourCard,
    value: string | boolean // ← allow boolean
  ) => {
    const updated = [...formData.tours]
    updated[index] = { ...updated[index], [field]: value }
    setFormData(prev => ({ ...prev, tours: updated }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLElement>, // ✅ use HTMLElement instead of HTMLDivElement
    key: string
  ) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    try {
      const compressed = await compressImage(file)
      setStagedImages(prev => ({ ...prev, [key]: compressed }))
    } catch {
      setUploadMessage({
        type: "error",
        text: `Image ${key} could not be processed.`,
      })
    }
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
    } catch {
      setUploadMessage({
        type: "error",
        text: `Image ${key} could not be uploaded.`,
      })
    }
  }

  const handleSaveChanges = async () => {
    const errors: string[] = []

    // Tagline guardrails
    if (
      formData.tagline.trim().length < 25 ||
      formData.tagline.trim().length > 80
    ) {
      errors.push("Tagline must be 25-80 characters.")
    }

    // Per-tour validations
    formData.tours.forEach((t, i) => {
      const idx = i + 1
      if (t.title.trim().length < 15 || t.title.trim().length > 32)
        errors.push(`Tour ${idx}: Title must be 15-32 chars.`)
      if (t.price.trim().length < 1 || t.price.trim().length > 5)
        errors.push(`Tour ${idx}: Price must be 1-5 chars.`)
      if (t.desc.trim().length < 50 || t.desc.trim().length > 95)
        errors.push(`Tour ${idx}: Description must be 50-95 chars.`)
      if (t.duration.trim().length < 2 || t.duration.trim().length > 10)
        errors.push(`Tour ${idx}: Duration must be 2-10 chars.`)
      if (t.type.trim().length < 3 || t.type.trim().length > 15)
        errors.push(`Tour ${idx}: Type must be 3-15 chars.`)
    })

    if (errors.length) {
      setUploadMessage({ type: "error", text: errors.join(" ") })
      return
    }

    setIsUploading(true)
    setUploadMessage(null)

    try {
      console.log("🟡 Starting upload...")

      for (const [key, file] of Object.entries(stagedImages)) {
        if (!file) {
          console.warn(`⚠️ No file for ${key}, skipping...`)
          continue
        }

        const index = parseInt(key.split("-")[1])
        const tour = formData.tours[index]
        if (!tour?.image) {
          console.warn(`⚠️ Missing 'image' field for tour index ${index}`)
          continue
        }

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () =>
            resolve((reader.result as string).split(",")[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        const filename = `${tour.image}.${file.name.split(".").pop()}`
        const imageIndex = tour.image // this becomes your upload index

        console.log("📤 Uploading image:", {
          slug: "sectionone",
          index: imageIndex,
          filename,
          size: `${(file.size / 1024).toFixed(2)}KB`,
        })

        const res = await fetch(
          "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-images",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: "sectionone",
              index: imageIndex, // ⬅️ this is what the Lambda uses
              filename,
              fileBase64: base64,
            }),
          }
        )

        const resultText = await res.text()
        console.log("📬 Upload response:", {
          status: res.status,
          ok: res.ok,
          body: resultText,
        })

        if (!res.ok) {
          throw new Error(`❌ Upload failed for ${filename}: ${resultText}`)
        }
      }

      // JSON Save
      console.log("📝 Uploading updated JSON...")
      const textRes = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "sectionone", data: formData }),
        }
      )

      const jsonResult = await textRes.text()
      console.log("✅ JSON Upload response:", {
        status: textRes.status,
        ok: textRes.ok,
        body: jsonResult,
      })

      if (!textRes.ok) throw new Error("❌ Failed to update JSON")

      setUploadMessage({ type: "success", text: "Changes saved successfully!" })
    } catch (err) {
      console.error("🚨 ERROR during save:", err)
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading || !selected) return null

  const filteredTours =
    selected.value === "all"
      ? formData.tours
      : selected.value === "walking"
        ? formData.tours.filter(t => t.isWalking)
        : formData.tours.filter(t => t.location === selected.value)

  return (
    <section
      id="sectionone"
      className="min-h-[100vh] overflow-hidden relative isolate px-4"
    >
      <motion.div className="mx-auto max-w-7xl pb-12 px-5 lg:px-8">
        <div className="mb-2">
          <div className="flex flex-col gap-6 pt-24 xl:pt-30">
            {/* Scene title */}

            {/* <input
              type="text"
              value={formData.sceneTitle}
              maxLength={60}
              onChange={e => handleInputChange(e, "sceneTitle")}
              className="w-full p-2 text-blue-700 font-semibold tracking-tight"
            /> */}
            <div className="w-full p-2 text-gray-700 font-semibold tracking-tight">
              {formData.sceneTitle}
            </div>

            {/* Tagline */}
            <div className="relative group">
              <Hint text="Tagline · max 80" className="-top-6 left-2" />
              <textarea
                value={formData.tagline}
                maxLength={80}
                onChange={e => handleInputChange(e, "tagline")}
                rows={2}
                className="w-full bg-blue-50 border resize-none border-blue-200 rounded-md shadow-inner p-2 text-blue-700 text-4xl font-semibold tracking-tight sm:text-5xl"
              />
            </div>
          </div>
        </div>
        <div>
          <select
            value={selected.value}
            onChange={e => {
              const selectedOption = location.find(
                o => o.value === e.target.value
              )
              if (selectedOption) setSelected(selectedOption)
            }}
            className="w-80 p-3 border bg-white border-gray-300 rounded-md shadow-sm text-gray-800 font-semibold"
          >
            {location.map(o => (
              <option key={o.id} value={o.value}>
                {o.name} ({o.count})
              </option>
            ))}
          </select>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 mt-12">
          {filteredTours.map((tour, i) => (
            <TourGridCard
              key={tour.link}
              tour={tour}
              index={i}
              onChange={({ field, value }) => handleTourChange(i, field, value)}
              dragOverKey={dragOverKey}
              setDragOverKey={setDragOverKey}
              stagedImages={stagedImages}
              handleDrop={handleDrop}
              handleFileUpload={handleFileUpload}
            />
          ))}
        </ul>
      </motion.div>

      {uploadMessage && (
        <div className="w-full flex pt-8">
          <div
            className={`mb-4 px-2 bg-white rounded border mx-auto text-center py-2 font-semibold ${
              uploadMessage.type === "success"
                ? "text-green-700 border-green-700"
                : "text-red-700 border-red-700"
            }`}
          >
            {uploadMessage.text}
          </div>
        </div>
      )}
      <div className="">
        <button
          onClick={handleSaveChanges}
          disabled={isUploading}
          className={`w-full text-white  py-2.5 font-semibold rounded hover cursor-pointer ${
            isUploading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-550"
          }`}
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </section>
  )
}

export default TourGridAdminEditor
