import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"
import useGetSceneContent from "@/hooks/useGetSceneContent"
// >>> CHECK THIS IMPORT PATH <<<
import TestimonialCard from "./testimonialCard"
// >>> Ensure TestimonialCard.tsx exists at this path <<<

import useGetCloudImage from "@/hooks/useGetCloudImage"

// Define the necessary types directly in this file
type Testimonial = {
  body: string
  author: {
    name: string
    avatar: string
  }
}

type TestimonialSceneContent = {
  sceneTitle: string
  tagline: string
  testimonials: Testimonial[]
  sectionImage: string
}

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionThree = ({ setSelectedPage }: Props) => {
  const { content, isLoading } = useGetSceneContent("sectionthree")

  const testimonialContent = content as TestimonialSceneContent | null

  const sectionImageUrl = useGetCloudImage(
    testimonialContent?.sectionImage ?? ""
  )

  if (isLoading) {
    return <div>Loading Testimonials...</div>
  }

  if (
    !testimonialContent ||
    !testimonialContent.testimonials ||
    testimonialContent.testimonials.length === 0
  ) {
    return null
  }

  return (
    <section id="sectionthree" className="relative isolate pb-12 w-full">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionThree)}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <SceneHeader
              sceneTitle={testimonialContent.sceneTitle}
              tagline={testimonialContent.tagline}
            />
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-12 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonialContent.testimonials.map(
                (testimonial: Testimonial, index: number) => (
                  // Using the imported TestimonialCard component
                  <TestimonialCard key={index} testimonial={testimonial} />
                )
              )}
            </div>
            <div className="mt-12 text-center">
              <p className="text-base text-gray-600">
                Want to see more?
                <a
                  href="https://www.google.com/search?sca_esv=b8426464e8db000c&sxsrf=AHTn8zpckk6IW9Tmb2u-ZhoEjEfTHCSmiw:1746023531164&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzSayfQ46PWFQLJFJHOj2hXSRxhJPnE6yvcv3-tUxuBdYfWBaN8Od84WRw5CEtrnKQGwm0EFPY4iR-OZyZiVmvUmPxwmACAroIbG22maaRBVP2CZw2g%3D%3D&q=Driven+Foodie+Tours+Reviews&sa=X&ved=2ahUKEwiQw-DC_P-MAxWaSjABHapsII4Q0bkNegQILhAD&biw=1920&bih=919&dpr=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 font-semibold hover:underline ml-1"
                >
                  Check out more reviews on Google.
                </a>
              </p>
            </div>
          </div>
        </div>{" "}
      </motion.div>{" "}
      <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          alt={testimonialContent.sceneTitle || "Section Image"}
          src={sectionImageUrl}
          className="aspect-[5/3] sm:aspect-[5/2] sm:rounded-2xl lg:rounded-none  w-full object-cover  transition-transform duration-700 xl:rounded-3xl"
        />
      </div>
    </section>
  )
}

export default SectionThree
