import { StarIcon } from "@heroicons/react/24/solid"
import React from "react"
import useGetCloudImage from "@/hooks/useGetCloudImage"

type Testimonial = {
  body: string
  author: {
    name: string
    avatar: string
  }
}

type Props = {
  testimonial: Testimonial
  index: number
  onChange: (update: { field: "body" | "name"; value: string }) => void
  dragOverKey: string | null
  setDragOverKey: (key: string | null) => void
  stagedImages: { [key: string]: File | null }
  handleDrop: (e: React.DragEvent<HTMLElement>, key: string) => void
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
}

const TestimonialGridCard: React.FC<Props> = ({
  testimonial,
  index,
  onChange,
  dragOverKey,
  setDragOverKey,
  stagedImages,
  handleDrop,
  handleFileUpload,
}) => {
  const imageKey = `testimonial-avatar-${index}`
  const avatarImageUrl = stagedImages[imageKey]
    ? URL.createObjectURL(stagedImages[imageKey]!)
    : useGetCloudImage(testimonial.author.avatar)

  return (
    <div className="pt-8 sm:inline-block sm:w-full sm:px-4">
      <figure className="rounded-2xl bg-gray-50 shadow-sm p-8 text-sm/6">
        <div className="flex mb-2 gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-3 text-yellow-500" />
          ))}
        </div>

        <blockquote className="text-gray-900">
          <textarea
            value={testimonial.body}
            onChange={e => onChange({ field: "body", value: e.target.value })}
            className="w-full bg-blue-50 border border-blue-200 rounded-md shadow-inner p-2 text-blue-700 resize-none"
            rows={4}
          />
        </blockquote>

        <figcaption className="mt-4 flex items-center gap-x-4">
          <div className="flex flex-col items-center gap-1">
            <div
              onDragEnter={e => {
                e.preventDefault()
                setDragOverKey(imageKey)
              }}
              onDragOver={e => {
                e.preventDefault()
                setDragOverKey(imageKey)
              }}
              onDragLeave={() => setDragOverKey(null)}
              onDrop={e => {
                handleDrop(e, imageKey)
                setDragOverKey(null)
              }}
              className={`relative rounded-full overflow-hidden transition-all duration-200 ${
                dragOverKey === imageKey
                  ? "ring-4 ring-teal-500 ring-offset-2"
                  : ""
              }`}
            >
              <img
                alt={`Avatar of ${testimonial.author.name}`}
                src={avatarImageUrl}
                className="w-10 h-10 aspect-square rounded-full object-cover bg-gray-100"
              />
            </div>

            <label className="text-xs bg-white/90 hover:bg-white px-2 py-1 rounded cursor-pointer shadow-sm border border-blue-200">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFileUpload(e, imageKey)}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={testimonial.author.name}
            onChange={e => onChange({ field: "name", value: e.target.value })}
            className="bg-blue-50 border border-blue-200 rounded-md shadow-inner p-2 text-blue-700 font-semibold w-full"
          />
        </figcaption>
      </figure>
    </div>
  )
}

export default TestimonialGridCard
