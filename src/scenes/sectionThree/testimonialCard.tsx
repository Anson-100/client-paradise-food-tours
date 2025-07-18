// src/components/TestimonialCard.tsx
import { StarIcon } from "@heroicons/react/24/solid"
import React from "react"

// import useGetCloudImage from "@/hooks/useGetCloudImage"

type Testimonial = {
  body: string
  author: {
    name: string
    avatar: string // This is the filename for the avatar image
  }
}

type Props = {
  testimonial: Testimonial
}

const TestimonialCard: React.FC<Props> = ({ testimonial }) => {
  // const avatarImageUrl = useGetCloudImage(testimonial.author.avatar)

  return (
    // This div structure matches the outer div for each testimonial in your SectionThree map
    <div className="pt-8 sm:inline-block sm:w-full sm:px-4">
      <figure className="rounded-2xl bg-gray-50 shadow-sm p-8 text-[15px]/6">
        {" "}
        <div className="flex gap-1">
          <StarIcon className="h-4 text-yellow-500" />
          <StarIcon className="h-4 text-yellow-500" />
          <StarIcon className="h-4 text-yellow-500" />
          <StarIcon className="h-4 text-yellow-500" />
          <StarIcon className="h-4 text-yellow-500" />
        </div>{" "}
        <blockquote className="text-gray-900 mt-4">
          {/* Display the testimonial body */}
          <p>{`“${testimonial.body}”`}</p>
        </blockquote>{" "}
        <figcaption className="mt-4 flex items-center gap-x-4">
          {/* Use the image URL obtained from the hook */}
          {/* <img
            alt={`Avatar of ${testimonial.author.name}`}
            src={avatarImageUrl}
            className="size-10 rounded-full bg-gray-50 object-cover"
          /> */}
          <div className="flex flex-col">
            {/* Display the author's name */}

            <div className="font-semibold text-gray-900">
              {testimonial.author.name}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  )
}

export default TestimonialCard
