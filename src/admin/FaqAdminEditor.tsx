import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"
import Hint from "./Hint"

const TAGLINE_MAX = 44
const QUESTION_MAX = 80
const ANSWER_MAX = 300

const TAGLINE_MIN = 20
const QUESTION_MIN = 10
const ANSWER_MIN = 30

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

    // validate lengths before saving
    const isInvalid =
      formData.tagline.length < TAGLINE_MIN ||
      formData.tagline.length > TAGLINE_MAX ||
      formData.items.some(
        i =>
          i.question.length < QUESTION_MIN ||
          i.question.length > QUESTION_MAX ||
          i.answer.length < ANSWER_MIN ||
          i.answer.length > ANSWER_MAX
      )

    if (isInvalid) {
      setUploadMessage({
        type: "error",
        text: "Please make sure all fields are within required character limits.",
      })
      setIsUploading(false)
      return
    }

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
          <div className="w-full p-3 mb-4  rounded-md text-center font-semibold tracking-tight text-zinc-700">
            {formData.sceneTitle}
          </div>

          {/* TAGLINE – hover shows rules */}
          <div className="relative group mb-10">
            <input
              type="text"
              value={formData.tagline}
              onChange={e => handleTopLevelChange("tagline", e.target.value)}
              maxLength={TAGLINE_MAX}
              className="w-full p-3 bg-blue-100 border border-blue-300 rounded-md text-center text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl"
              placeholder="Tagline"
            />
            <Hint text={`Tagline · Max ${TAGLINE_MAX} chars`} />
          </div>
        </div>

        <div className="space-y-10">
          {formData.items.map((item, index) => (
            <div key={item.id} className="p-4 ">
              <div className="text-sm font-semibold text-gray-500 mb-2">
                Question {index + 1}
              </div>
              <div className="relative group mb-3">
                <input
                  type="text"
                  value={item.question}
                  onChange={e =>
                    handleItemChange(item.id, "question", e.target.value)
                  }
                  maxLength={QUESTION_MAX}
                  className="w-full p-2 bg-blue-100 border border-blue-300 rounded-md text-lg font-semibold"
                  placeholder="Question"
                />
                <Hint text={`Question · max ${QUESTION_MAX} chars`} />
              </div>
              <div className="relative group">
                <textarea
                  value={item.answer}
                  onChange={e =>
                    handleItemChange(item.id, "answer", e.target.value)
                  }
                  maxLength={ANSWER_MAX}
                  rows={4}
                  className="w-full p-2 bg-blue-100 border border-blue-300 rounded-md text-base"
                  placeholder="Answer"
                />
                <Hint text={`Answer · max ${ANSWER_MAX} chars`} />
              </div>
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
