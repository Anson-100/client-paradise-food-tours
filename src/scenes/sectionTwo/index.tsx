import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionTwo = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="sectiontwo"
      className="min-h-full relative isolate overflow-hidden"
    >
      {/* <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
        />
      </div> */}
      <motion.div
        className="overflow-hidden relative isolate"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionTwo)}
      >
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <SceneHeader
            sceneTitle="About Paradise Food Tours"
            tagline="Rooted in flavor. Built on local love."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-6 lg:grid-rows-2">
            {/* CONTENT CONTAINER============= */}
            <div className="flex p-px lg:col-span-4">
              <div className="overflow-hidden w-full md:h-70 rounded-lg border bg-zinc-50 border-gray-200 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] ">
                <div className="p-8">
                  <h3 className="text-sm font-semibold text-gray-500">
                    The Founder’s Foodie Journey
                  </h3>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
                    From small-town roots to Southwest Florida flavor.
                  </p>
                  <p className="mt-3 max-w-2xl text-base text-gray-700 leading-relaxed">
                    Liz Valdez moved from rural Ohio to Naples in 2009 and
                    instantly fell in love with the bold, local flavors. What
                    started as curiosity turned into a mission: help others
                    explore the most authentic eats Southwest Florida has to
                    offer.
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGE CONTAINER========= */}
            <div className="flex p-px lg:col-span-2">
              <div className="overflow-hidden rounded-lg w-full bg-zinc-900 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
                <div className="bg-zinc-900 aspect-3/2 w-full h-full rounded-2xl flex items-center justify-center text-2xl text-gray-400">
                  IMG
                </div>
              </div>
            </div>
            {/* IMAGE CONTAINER========= */}
            <div className="flex p-px lg:col-span-2">
              <div className="overflow-hidden rounded-lg w-full bg-zinc-900 ring-1 ring-white/15 lg:rounded-bl-[2rem]">
                <div className="bg-zinc-900 aspect-3/2 w-full h-full rounded-2xl flex items-center justify-center text-2xl text-gray-400">
                  IMG
                </div>
              </div>
            </div>
            {/* CONTENT CONTAINER============= */}
            <div className="flex p-px lg:col-span-4">
              <div className="overflow-hidden w-full rounded-lg border border-gray-200 bg-zinc-50 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
                <div className="p-8">
                  <h3 className="text-sm font-semibold text-gray-500">
                    Where your story begins
                  </h3>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
                    Real food. Real people. Memorable experiences.
                  </p>
                  <p className="mt-3 max-w-2xl text-base text-gray-700 leading-relaxed">
                    Paradise Food Tours is your inside guide to the best local
                    eats. Whether you’re a visitor or a local, we take you
                    beyond the tourist traps to experience the real flavors of
                    Southwest Florida. Every tour is curated for connection,
                    culture, and seriously good food.
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
