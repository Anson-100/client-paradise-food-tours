import React from "react"
import { ClockIcon, FireIcon } from "@heroicons/react/24/outline"
import useGetCloudImage from "@/hooks/useGetCloudImage"

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
}

type Props = {
  tour: TourCard
  index: number
  onChange: (update: { field: keyof TourCard; value: string | boolean }) => void

  dragOverKey: string | null
  setDragOverKey: (key: string | null) => void
  stagedImages: { [key: string]: File | null }
  handleDrop: (e: React.DragEvent<HTMLElement>, key: string) => void

  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
}

const TourGridCard: React.FC<Props> = ({
  tour,
  index,
  onChange,
  dragOverKey,
  setDragOverKey,
  stagedImages,
  handleDrop,
  handleFileUpload,
}) => {
  const imageKey = `image-${index}`
  const imageUrl = stagedImages[imageKey]
    ? URL.createObjectURL(stagedImages[imageKey]!)
    : useGetCloudImage(tour.image)

  return (
    <li className="relative transition-all duration-200">
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
        className={`relative group transition-all duration-200 ${
          dragOverKey === imageKey ? "ring-4 ring-teal-500 ring-offset-2" : ""
        } ${!tour.visible ? "filter grayscale opacity-50" : ""}`}
      >
        <img
          src={imageUrl}
          alt={`Image for ${tour.title}`}
          className="bg-zinc-900 aspect-3/2 w-full rounded-2xl object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
          <label className="text-sm bg-white/90 hover:bg-white p-2 m-2 rounded cursor-pointer">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileUpload(e, imageKey)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div
          className={`flex justify-between items-start gap-2 ${
            !tour.visible ? "filter grayscale opacity-50" : ""
          }`}
        >
          <input
            type="text"
            value={tour.title}
            onChange={e => onChange({ field: "title", value: e.target.value })}
            className="h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 text-lg font-semibold tracking-tight flex-1"
          />
          <input
            type="text"
            value={tour.price}
            onChange={e => onChange({ field: "price", value: e.target.value })}
            className="h-auto p-2 w-20 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 text-base font-bold"
          />
        </div>
        <textarea
          value={tour.desc}
          onChange={e => onChange({ field: "desc", value: e.target.value })}
          rows={2}
          className={`h-auto p-2 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 w-full text-md resize-none ${
            !tour.visible ? "filter grayscale opacity-50" : ""
          }`}
        />
        <div
          className={`flex items-center gap-4 text-sm text-gray-500 ${
            !tour.visible ? "filter grayscale opacity-50" : ""
          }`}
        >
          <span className="flex items-center gap-1">
            <ClockIcon className="w-5 h-5" />
            <input
              type="text"
              value={tour.duration}
              onChange={e =>
                onChange({ field: "duration", value: e.target.value })
              }
              className="h-auto p-1 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 w-20"
            />
          </span>
          <span className="flex items-center gap-1">
            <FireIcon className="w-5 h-5" />
            <input
              type="text"
              value={tour.type}
              onChange={e => onChange({ field: "type", value: e.target.value })}
              className="h-auto p-1 bg-blue-50 border border-blue-200 rounded-md shadow-inner text-blue-700 w-20"
            />
          </span>
        </div>
        {tour.status === "active" ? (
          <div className="flex gap-2 pt-4 font-semibold">
            <div className="h-auto p-2 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
              Check Dates Button
            </div>
            <div className="h-auto p-2 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
              Learn More Button
            </div>
          </div>
        ) : (
          <div className="text-gray-400 font-medium pt-4 text-sm">
            (COMING SOON)
          </div>
        )}{" "}
        <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2 ">
            <input
              type="checkbox"
              checked={tour.status === "active"}
              onChange={e =>
                onChange({
                  field: "status",
                  value: e.target.checked ? "active" : "upcoming",
                })
              }
              className="w-4 h-4"
            />
            <label className=" font-semibold text-zinc-700">Active?</label>
          </div>
          <div className="flex items-center  gap-2">
            <input
              type="checkbox"
              checked={tour.visible !== false}
              onChange={e =>
                onChange({ field: "visible", value: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className=" font-semibold text-zinc-700">Visible?</label>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TourGridCard
