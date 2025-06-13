import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"
import useCompressImageUpload from "@/hooks/useCompressImageUpload"
import TestimonialGridCard from "./TestimonialGridCard"
import useGetCloudImage from "@/hooks/CMSuseGetCloudImage"

// Types

type Testimonial = {
  body: string
  author: {
    name: string
    avatar: string
  }
}

type FormData = {
  sceneTitle: string
  tagline: string
  testimonials: Testimonial[]
  sectionImage: string
}

const TestimonialAdminEditor = () => {
  const { content, isLoading } = useGetSceneContent("sectionthree")
  const { compressImage } = useCompressImageUpload()

  const [formData, setFormData] = useState<FormData>({
    sceneTitle: "",
    tagline: "",
    testimonials: [],
    sectionImage: "",
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

  const sectionImageUrl = useGetCloudImage(formData.sectionImage || "")

  useEffect(() => {
    if (content) {
      setFormData(content)
      const initial: { [key: string]: File | null } = {}
      content.testimonials.forEach((_: any, i: number) => {
        initial[`testimonial-avatar-${i}`] = null
      })
      initial["sectionImage"] = null
      setStagedImages(initial)
    }
  }, [content])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleTestimonialChange = (
    index: number,
    field: "body" | "name",
    value: string
  ) => {
    const updated = [...formData.testimonials]
    if (field === "body") {
      updated[index].body = value
    } else {
      updated[index].author.name = value
    }
    setFormData(prev => ({ ...prev, testimonials: updated }))
  }

  const handleDrop = async (e: React.DragEvent<HTMLElement>, key: string) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    try {
      const compressed = await compressImage(file)
      setStagedImages(prev => ({ ...prev, [key]: compressed }))
    } catch {
      setUploadMessage({
        type: "error",
        text: `Image ${key} could not be compressed.`,
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
        text: `Image ${key} could not be processed.`,
      })
    }
  }

  const handleSaveChanges = async () => {
    setIsUploading(true)
    setUploadMessage(null)

    try {
      for (const [key, file] of Object.entries(stagedImages)) {
        if (!file) continue

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () =>
            resolve((reader.result as string).split(",")[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        let index: string

        if (key === "sectionImage") {
          index = formData.sectionImage
        } else {
          const testimonialIndex = parseInt(key.split("-").pop() || "", 10)
          index = formData.testimonials[testimonialIndex]?.author.avatar

          if (!index) {
            throw new Error(
              `Missing avatar name for testimonial index: ${testimonialIndex}`
            )
          }
        }

        const filename = `${index}.${file.name.split(".").pop()}`

        const res = await fetch(
          "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-images",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: "sectionthree",
              index,
              filename,
              fileBase64: base64,
            }),
          }
        )

        if (!res.ok) throw new Error(`Upload failed for ${filename}`)
      }

      const res = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "sectionthree", data: formData }),
        }
      )

      if (!res.ok) throw new Error("Failed to update JSON")

      setUploadMessage({ type: "success", text: "Changes saved successfully!" })
    } catch (err) {
      console.error("Error saving changes:", err)
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) return null

  return (
    <section id="sectionthree" className="relative isolate w-full pt-20">
      <motion.div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex flex-col gap-2 max-w-2xl text-center">
            <input
              type="text"
              value={formData.sceneTitle}
              onChange={e => handleInputChange(e, "sceneTitle")}
              className="bg-blue-50 border border-blue-200 text-blue-700 rounded-md shadow-inner p-2 font-semibold tracking-tight text-center"
            />
            <textarea
              value={formData.tagline}
              onChange={e => handleInputChange(e, "tagline")}
              className="bg-blue-50 border border-blue-200 rounded-md shadow-inner p-2 text-4xl font-semibold tracking-tight text-blue-700 w-full sm:text-5xl text-center"
              rows={2}
            />
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-12 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {formData.testimonials.map((testimonial, index) => (
                <TestimonialGridCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  onChange={fieldUpdate =>
                    handleTestimonialChange(
                      index,
                      fieldUpdate.field,
                      fieldUpdate.value
                    )
                  }
                  dragOverKey={dragOverKey}
                  setDragOverKey={setDragOverKey}
                  stagedImages={stagedImages}
                  handleDrop={handleDrop}
                  handleFileUpload={handleFileUpload}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-base text-gray-400">
                Want to see more?
                <span className="text-gray-400 font-semibold ml-1">
                  See more reviews on Google
                </span>{" "}
                or{" "}
                <span className="text-gray-400 font-semibold">
                  check us out on Yelp
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div
          onDragEnter={e => {
            e.preventDefault()
            setDragOverKey("sectionImage")
          }}
          onDragOver={e => {
            e.preventDefault()
            setDragOverKey("sectionImage")
          }}
          onDragLeave={() => setDragOverKey(null)}
          onDrop={e => {
            handleDrop(e, "sectionImage")
            setDragOverKey(null)
          }}
          className={`relative transition-all duration-200 ${
            dragOverKey === "sectionImage"
              ? "ring-4 ring-teal-500 ring-offset-2"
              : ""
          }`}
        >
          <img
            alt={formData.sceneTitle || "Section Image"}
            src={
              stagedImages.sectionImage
                ? URL.createObjectURL(stagedImages.sectionImage)
                : sectionImageUrl
            }
            className="aspect-5/2 w-full object-cover xl:rounded-3xl bg-zinc-100"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity rounded-3xl">
            <label className="text-sm bg-white/90 hover:bg-white p-2 m-4 rounded cursor-pointer shadow">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFileUpload(e, "sectionImage")}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mt-20 px-4">
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

        <button
          onClick={handleSaveChanges}
          disabled={isUploading}
          className={`w-full text-white font-semibold py-2.5 rounded hover cursor-pointer ${
            isUploading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-550"
          }`}
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </section>
  )
}

export default TestimonialAdminEditor
