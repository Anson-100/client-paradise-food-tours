import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"

import useCompressImageUpload from "@/hooks/useCompressImageUpload"
import useGetCloudImage from "@/hooks/CMSuseGetCloudImage"

type AboutFormData = {
  sceneTitle: string
  tagline: string
  aboutSection1: {
    heading: string
    subheading: string
    text: string
  }
  aboutSection2: {
    heading: string
    subheading: string
    text: string
  }
}

const AboutAdminEditor = () => {
  const { content, isLoading } = useGetSceneContent("sectiontwo")
  const image1 = useGetCloudImage("about-image-1")
  const image2 = useGetCloudImage("about-image-2")
  const { compressImage } = useCompressImageUpload()

  const [formData, setFormData] = useState<AboutFormData>({
    sceneTitle: "",
    tagline: "",
    aboutSection1: { heading: "", subheading: "", text: "" },
    aboutSection2: { heading: "", subheading: "", text: "" },
  })

  const [stagedImages, setStagedImages] = useState<{
    [key: string]: File | null
  }>({
    "about-image-1": null,
    "about-image-2": null,
  })

  const [dragOverKey, setDragOverKey] = useState<string | null>(null)
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (content) setFormData(content)
  }, [content])

  const handleTopLevelChange = (field: keyof AboutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = <
    Section extends keyof Pick<
      AboutFormData,
      "aboutSection1" | "aboutSection2"
    >,
    Field extends keyof AboutFormData[Section],
  >(
    section: Section,
    field: Field,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    key: string
  ) => {
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

        await fetch(
          "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-images",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: "sectiontwo",
              index: key,
              filename: `${key}.${file.name.split(".").pop()}`,
              fileBase64: base64,
            }),
          }
        )
      }

      await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "sectiontwo", data: formData }),
        }
      )

      setUploadMessage({ type: "success", text: "All changes saved!" })
    } catch (err) {
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading || !content) return null

  return (
    <section
      id="sectiontwo"
      className="min-h-full relative isolate overflow-hidden"
    >
      <motion.div className="overflow-hidden relative isolate">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col gap-2 pt-24 xl:pt-30">
            <input
              type="text"
              value={formData.sceneTitle}
              onChange={e => handleTopLevelChange("sceneTitle", e.target.value)}
              className="font-semibold tracking-tight text-blue-700 bg-blue-50 border border-blue-200 rounded-md p-2"
            />
            <input
              type="text"
              value={formData.tagline}
              onChange={e => handleTopLevelChange("tagline", e.target.value)}
              className="text-4xl font-semibold tracking-tight text-pretty text-blue-700 sm:text-5xl bg-blue-50 border border-blue-200 rounded-md p-2"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-6 lg:grid-rows-2 mb-4">
            {/* Section 1 Content */}
            <div className="flex p-px lg:col-span-4">
              <div className="overflow-hidden w-full md:h-70 rounded-lg border bg-zinc-50 border-gray-200 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
                <div className="p-8">
                  <input
                    type="text"
                    value={formData.aboutSection1.heading}
                    onChange={e =>
                      handleNestedChange(
                        "aboutSection1",
                        "heading",
                        e.target.value
                      )
                    }
                    className="text-sm font-semibold text-blue-700 w-full bg-blue-50 border border-blue-200 rounded-md p-2"
                  />
                  <input
                    type="text"
                    value={formData.aboutSection1.subheading}
                    onChange={e =>
                      handleNestedChange(
                        "aboutSection1",
                        "subheading",
                        e.target.value
                      )
                    }
                    className="mt-3 text-xl font-semibold tracking-tight text-blue-700 w-full bg-blue-50 border border-blue-200 rounded-md p-2"
                  />
                  <textarea
                    value={formData.aboutSection1.text}
                    onChange={e =>
                      handleNestedChange(
                        "aboutSection1",
                        "text",
                        e.target.value
                      )
                    }
                    className="mt-3 max-w-2xl text-base text-blue-700 leading-relaxed w-full bg-blue-50 border border-blue-200 rounded-md p-2"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            {/* IMG1====== */}
            <div className="flex p-px lg:col-span-2">
              <div
                className={`relative overflow-hidden rounded-lg w-full lg:rounded-tr-[2rem] transition-all duration-200 ${
                  dragOverKey === "about-image-1"
                    ? "ring-4 ring-teal-500 ring-offset-2"
                    : "ring-1 ring-white/15"
                }`}
                onDragOver={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDragOverKey("about-image-1")
                }}
                onDragLeave={() => setDragOverKey(null)}
                onDrop={e => {
                  handleDrop(e, "about-image-1")
                  setDragOverKey(null)
                }}
              >
                <img
                  src={
                    stagedImages["about-image-1"]
                      ? URL.createObjectURL(stagedImages["about-image-1"])
                      : image1
                  }
                  alt=""
                  className="aspect-[3/2] w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileUpload(e, "about-image-1")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* IMG2======= */}
            <div className="flex p-px lg:col-span-2">
              <div
                className={`relative overflow-hidden rounded-lg w-full lg:rounded-bl-[2rem] transition-all duration-200 ${
                  dragOverKey === "about-image-2"
                    ? "ring-4 ring-teal-500 ring-offset-2"
                    : "ring-1 ring-white/15"
                }`}
                onDragOver={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDragOverKey("about-image-2")
                }}
                onDragLeave={() => setDragOverKey(null)}
                onDrop={e => {
                  handleDrop(e, "about-image-2")
                  setDragOverKey(null)
                }}
              >
                <img
                  src={
                    stagedImages["about-image-2"]
                      ? URL.createObjectURL(stagedImages["about-image-2"])
                      : image2
                  }
                  alt=""
                  className="aspect-[3/2] w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileUpload(e, "about-image-2")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2 Content */}
            <div className="flex p-px lg:col-span-4 ">
              <div className="overflow-hidden w-full rounded-lg border bg-zinc-50 border-gray-200 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
                <div className="p-8">
                  <input
                    type="text"
                    value={formData.aboutSection2.heading}
                    onChange={e =>
                      handleNestedChange(
                        "aboutSection2",
                        "heading",
                        e.target.value
                      )
                    }
                    className="text-sm font-semibold text-blue-700 w-full bg-blue-50 border border-blue-200 rounded-md p-2"
                  />
                  <input
                    type="text"
                    value={formData.aboutSection2.subheading}
                    onChange={e =>
                      handleNestedChange(
                        "aboutSection2",
                        "subheading",
                        e.target.value
                      )
                    }
                    className="mt-3 text-xl font-semibold tracking-tight text-blue-700 w-full bg-blue-50 border border-blue-200 rounded-md p-2"
                  />
                  <textarea
                    value={formData.aboutSection2.text}
                    onChange={e =>
                      handleNestedChange(
                        "aboutSection2",
                        "text",
                        e.target.value
                      )
                    }
                    className="mt-3 max-w-2xl text-base text-blue-700 leading-relaxed w-full bg-blue-50 border border-blue-200 rounded-md p-2"
                    rows={4}
                  />
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
        </div>
      </motion.div>{" "}
      <button
        onClick={handleSaveChanges}
        disabled={isUploading}
        className={`w-full text-white font-semibold py-2.5 mx-4 rounded hover cursor-pointer ${
          isUploading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-550"
        }`}
      >
        {isUploading ? "Uploading..." : "Save Changes"}
      </button>
    </section>
  )
}

export default AboutAdminEditor
