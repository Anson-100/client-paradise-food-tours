import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"
import useGetSceneContent from "@/hooks/useGetSceneContent"

import useGetCloudImage from "@/hooks/useGetCloudImage"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionTwo = ({ setSelectedPage }: Props) => {
  const { content, isLoading } = useGetSceneContent("sectiontwo")
  const image1 = useGetCloudImage("about-image-1")
  const image2 = useGetCloudImage("about-image-2")

  if (isLoading || !content) return null

  return (
    <section
      id="sectiontwo"
      className="min-h-full relative isolate overflow-hidden"
    >
      <motion.div
        className="overflow-hidden relative isolate"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionTwo)}
      >
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <SceneHeader
            sceneTitle={content.sceneTitle}
            tagline={content.tagline}
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-6 lg:grid-rows-2">
            {/* Section 1 Content */}
            <div className="flex p-px lg:col-span-4">
              <div className="overflow-hidden w-full md:h-70 rounded-lg border bg-zinc-50 border-gray-200 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
                <div className="p-8">
                  <h3 className="text-sm font-semibold text-gray-500">
                    {content.aboutSection1.heading}
                  </h3>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
                    {content.aboutSection1.subheading}
                  </p>
                  <p className="mt-3 max-w-2xl text-base text-gray-700 leading-relaxed">
                    {content.aboutSection1.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 Image */}
            <div className="flex p-px lg:col-span-2">
              <div className="overflow-hidden rounded-lg w-full ring-1 ring-white/15 lg:rounded-tr-[2rem]">
                <img
                  src={image1}
                  alt=""
                  className="aspect-[3/2] w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Section 2 Image */}
            <div className="flex p-px lg:col-span-2">
              <div className="overflow-hidden rounded-lg w-full ring-1 ring-white/15 lg:rounded-bl-[2rem]">
                <img
                  src={image2}
                  alt=""
                  className="aspect-[3/2] w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Section 2 Content */}
            <div className="flex p-px lg:col-span-4">
              <div className="overflow-hidden w-full rounded-lg border border-gray-200 bg-zinc-50 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
                <div className="p-8">
                  <h3 className="text-sm font-semibold text-gray-500">
                    {content.aboutSection2.heading}
                  </h3>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
                    {content.aboutSection2.subheading}
                  </p>
                  <p className="mt-3 max-w-2xl text-base text-gray-700 leading-relaxed">
                    {content.aboutSection2.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionTwo
