import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"
import useGetCloudImage from "@/hooks/CMSuseGetCloudImage"
import Hint from "./Hint"
import useCompressImageUpload from "@/hooks/useCompressImageUpload"

const HomeAdminEditor = () => {
  const { content, isLoading } = useGetSceneContent("home")
  const { compressImage } = useCompressImageUpload()

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    galleryImages: [],
  })

  const [stagedImages, setStagedImages] = useState<{
    [key: string]: File | null
  }>({
    "image-0": null,
    "image-1": null,
    "image-2": null,
    "image-3": null,
    "image-4": null,
  })

  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [dragOverKey, setDragOverKey] = useState<string | null>(null)

  useEffect(() => {
    if (content) {
      setFormData(content)
    }
  }, [content])

  const img0 = useGetCloudImage(formData.galleryImages?.[0] || "")
  const img1 = useGetCloudImage(formData.galleryImages?.[1] || "")
  const img2 = useGetCloudImage(formData.galleryImages?.[2] || "")
  const img3 = useGetCloudImage(formData.galleryImages?.[3] || "")
  const img4 = useGetCloudImage(formData.galleryImages?.[4] || "")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
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
    // Perform manual min/max validation
    const titleLength = formData.title.trim().length
    const subtitleLength = formData.subtitle.trim().length

    if (titleLength < 30 || titleLength > 40) {
      setUploadMessage({
        type: "error",
        text: "Title must be between 30 and 40 characters.",
      })
      return
    }

    if (subtitleLength < 150 || subtitleLength > 180) {
      setUploadMessage({
        type: "error",
        text: "Subtext must be between 150 and 180 characters.",
      })
      return
    }

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

        const res = await fetch(
          "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-images",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: "home",
              index: key,
              filename: `${key}.${file.name.split(".").pop()}`,
              fileBase64: base64,
            }),
          }
        )

        if (!res.ok) throw new Error(`Upload failed for image ${key}`)
      }

      const textRes = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "home", data: formData }),
        }
      )

      if (!textRes.ok) throw new Error("Failed to update JSON")

      setUploadMessage({ type: "success", text: "All uploads complete!" })
    } catch (err) {
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading || !content) return null

  return (
    <section id="home">
      <motion.div>
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-28">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  {/* ───────────── Title ───────────── */}
                  <div className="relative">
                    <Hint text="Min 30  /  Max 40" />
                    <textarea
                      value={formData.title}
                      onChange={e => handleInputChange(e, "title")}
                      rows={2}
                      maxLength={40}
                      className="mt-4 resize-none h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 w-full text-5xl sm:text-7xl font-semibold tracking-tight text-pretty leading-tight"
                    />
                  </div>

                  {/* ──────────── Subtitle ─────────── */}
                  <div className="relative mt-6">
                    <Hint text="Min 150  /  Max 180" />
                    <textarea
                      value={formData.subtitle}
                      onChange={e => handleInputChange(e, "subtitle")}
                      rows={3}
                      maxLength={180}
                      className="mt-4 resize-none h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 w-full text-lg font-medium sm:max-w-md sm:text-xl/8 lg:max-w-none text-pretty"
                    />
                  </div>

                  {/* ───────────── Buttons ──────────── */}
                  <div className="mt-10 flex items-center gap-x-2">
                    <div className="h-auto p-2 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                      Check Dates Button
                    </div>
                    <div className="h-auto p-2 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                      Learn More Button
                    </div>
                  </div>
                </div>

                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-2 lg:pl-0">
                  <div className="relative ml-auto w-50 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div
                      className={`relative transition-all duration-200 ${
                        dragOverKey === "image-0"
                          ? "ring-4 ring-teal-500 ring-offset-2"
                          : ""
                      }`}
                      onDragOver={e => {
                        e.preventDefault()
                        setDragOverKey("image-0")
                      }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={e => {
                        handleDrop(e, "image-0")
                        setDragOverKey(null)
                      }}
                    >
                      <Hint text="Desktop image" />

                      <img
                        alt=""
                        src={
                          stagedImages["image-0"]
                            ? URL.createObjectURL(stagedImages["image-0"])
                            : img0
                        }
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                        <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFileUpload(e, "image-0")}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mr-auto w-50 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36 relative">
                    <Hint text="Aspect ratio: 2/3" text2="2w → 3h ↑" />

                    {["image-1", "image-2"].map((key, i) => (
                      <div
                        key={key}
                        className={`relative transition-all duration-200 ${
                          dragOverKey === key
                            ? "ring-4 ring-teal-500 ring-offset-2"
                            : ""
                        }`}
                        onDragOver={e => {
                          e.preventDefault()
                          setDragOverKey(key)
                        }}
                        onDragLeave={() => setDragOverKey(null)}
                        onDrop={e => {
                          handleDrop(e, key)
                          setDragOverKey(null)
                        }}
                      >
                        <img
                          alt=""
                          src={
                            stagedImages[key]
                              ? URL.createObjectURL(stagedImages[key] as File)
                              : i === 0
                                ? img1
                                : img2
                          }
                          className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                          <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleFileUpload(e, key)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-50 flex-none space-y-8 pt-32 sm:pt-0">
                    {["image-3", "image-4"].map((key, i) => (
                      <div
                        key={key}
                        className={`relative transition-all duration-200 ${
                          dragOverKey === key
                            ? "ring-4 ring-teal-500 ring-offset-2"
                            : ""
                        }`}
                        onDragOver={e => {
                          e.preventDefault()
                          setDragOverKey(key)
                        }}
                        onDragLeave={() => setDragOverKey(null)}
                        onDrop={e => {
                          handleDrop(e, key)
                          setDragOverKey(null)
                        }}
                      >
                        <img
                          alt=""
                          src={
                            stagedImages[key]
                              ? URL.createObjectURL(stagedImages[key] as File)
                              : i === 0
                                ? img3
                                : img4
                          }
                          className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                          <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleFileUpload(e, key)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="px-4">
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
      </motion.div>
    </section>
  )
}

export default HomeAdminEditor
