import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import useGetSceneContent from "@/hooks/useGetSceneContent"

interface PolicyItem {
  id: string
  question: string
  answer: string
}

interface FormData {
  sceneTitle: string
  tagline: string
  items: PolicyItem[]
}

const RouteOne: React.FC = () => {
  const { content, isLoading } = useGetSceneContent("routeone")
  const [formData, setFormData] = useState<FormData>({
    sceneTitle: "",
    tagline: "",
    items: [],
  })

  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (content) setFormData(content)
  }, [content])

  const handleTopLevelChange = (
    field: "sceneTitle" | "tagline",
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (
    id: string,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedItems = formData.items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )
    setFormData(prev => ({ ...prev, items: updatedItems }))
  }

  const handleSaveChanges = async () => {
    setIsUploading(true)
    setUploadMessage(null)

    try {
      const res = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/tour-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "routeone", data: formData }),
        }
      )

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`Failed to update JSON: ${errText}`)
      }

      setUploadMessage({ type: "success", text: "All changes saved!" })
    } catch (err) {
      console.error(err)
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading || !content) return null

  return (
    <section id="routeone" className="min-h-screen isolate  px-6">
      <motion.div className="w-full sm:w-3/4 mx-auto mb-4 pb-20">
        <div className="flex flex-col gap-2 pt-24 text-center">
          <input
            type="text"
            value={formData.sceneTitle}
            onChange={e => handleTopLevelChange("sceneTitle", e.target.value)}
            className="w-full p-3 mb-4 bg-blue-100 border border-blue-300 rounded-md text-center font-semibold tracking-tight text-zinc-700"
            placeholder="Scene Title"
          />

          <input
            type="text"
            value={formData.tagline}
            onChange={e => handleTopLevelChange("tagline", e.target.value)}
            className="w-full p-3 mb-10 bg-blue-100 border border-blue-300 rounded-md text-center text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl"
            placeholder="Tagline"
          />
        </div>

        <div className="space-y-10">
          {formData.items.map((item, index) => (
            <div key={item.id} className="p-4 ">
              <div className="text-sm font-semibold text-gray-500 mb-2">
                Question {index + 1}
              </div>
              <input
                type="text"
                value={item.question}
                onChange={e =>
                  handleItemChange(item.id, "question", e.target.value)
                }
                className="w-full p-2 bg-blue-100 border border-blue-300 rounded-md text-lg font-semibold mb-3"
                placeholder="Question"
              />
              <textarea
                value={item.answer}
                onChange={e =>
                  handleItemChange(item.id, "answer", e.target.value)
                }
                rows={4}
                className="w-full p-2 bg-blue-100 border border-blue-300 rounded-md text-base"
                placeholder="Answer"
              />
            </div>
          ))}
        </div>
      </motion.div>{" "}
      {uploadMessage && (
        <div className="w-full flex">
          <div
            className={`my-2 px-2 bg-white rounded border mx-auto text-center py-2 font-semibold ${
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
    </section>
  )
}

export default RouteOne
