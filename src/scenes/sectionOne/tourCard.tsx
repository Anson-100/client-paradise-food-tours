// src/components/tourCard.tsx // Using the filename you specified

import React from "react"
import { ClockIcon, FireIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import CheckDatesAction from "@/shared/CheckDatesAction" // Adjust path if needed
import PeekBookButton from "@/shared/PeekBookButton"

import useGetCloudImage from "@/hooks/useGetCloudImage" // Adjust path if needed

// Assuming TourCard type is defined and can be imported from a shared location
// If not, you can define it directly in this file or create a shared types file.
type TourCard = {
  slug: string
  peekProductId: string
  title: string
  desc: string
  type: string
  price: string
  duration: string
  status: string
  link: string
  location: string
  image: string // This is the image filename
  isWalking: boolean
  peekUrl: string
}

type Props = {
  tour: TourCard
}

const TourCard: React.FC<Props> = ({ tour }) => {
  // Renamed component to TourCard
  // Call the useGetCloudImage hook here, at the top level of this component
  const imageUrl = useGetCloudImage(tour.image)

  return (
    <li key={tour.link}>
      {" "}
      {/* Using tour.link as a potentially more stable key */}
      <img
        src={imageUrl} // Use the URL returned by the hook
        alt={`Image for ${tour.title}`} // Good practice for accessibility
        className="bg-zinc-900 aspect-3/2 w-full rounded-2xl object-cover"
      />
      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 max-w-[75%]">
            {tour.title}
          </h3>
          {tour.price && (
            <span className="text-base font-bold text-zinc-700">
              {tour.price}
            </span>
          )}
        </div>
        <p className="text-md text-gray-600">{tour.desc}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-5 h-5" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1">
            <FireIcon className="w-5 h-5" />
            {tour.type}
          </span>
        </div>
        {tour.status === "active" ? (
          <div className="flex gap-2 pt-4 font-semibold">
            {/* === CONDITIONAL BUTTON RENDERING START === */}
            {tour.isWalking ? (
              <PeekBookButton peekUrl={tour.peekUrl} />
            ) : (
              <CheckDatesAction
                tourSlug={tour.slug} /* pass the slug from the card data */
                locationKey="tour_card"
              /> // Existing action for non-walking tours
            )}
            {/* === CONDITIONAL BUTTON RENDERING END === */}
            <Link to={tour.link}>
              <button className="hover:cursor-pointer flex items-center gap-1 px-3.5 py-2.5 text-md rounded-md text-zinc-800">
                Read more <div className="text-zinc-600 text-lg">&rarr;</div>
              </button>
            </Link>
          </div>
        ) : (
          <div className="text-gray-400 font-medium pt-4 text-sm">
            (COMING SOON)
          </div>
        )}
      </div>
    </li>
  )
}

export default TourCard
