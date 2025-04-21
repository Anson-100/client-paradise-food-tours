import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

import IMG1 from "@/assets/stockTour1.jpg"

import CheckDatesAction from "@/shared/CheckDatesAction"

import Greeting from "./greeting"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    // <section
    //   id="home"
    //   className="min-h-[100vh] relative isolate overflow-hidden bg-cover bg-center "
    //   style={{
    //     backgroundImage: `url(${sunset})`,
    //   }}
    // >
    //   {/* Dark gradient overlay */}
    //   <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/80 to-white/20 z-0" />

    //   <motion.div
    //     className="relative z-10 gap-4 flex flex-col items-center justify-center text-center min-h-screen px-4 w-full"
    //     onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
    //   >
    //     <img
    //       src={LogoMain}
    //       alt="Paradise FT Logo"
    //       className="h-60 md:h-84 drop-shadow-lg"
    //     />
    //     <p className="text-zinc-700 font-semibold text-md md:text-lg mb-6 max-w-xs md:max-w-lg">
    //       Locally curated food tours through Southwest Florida.
    //     </p>
    //     <CheckDatesAction />
    //   </motion.div>
    // </section>
    <section id="home">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
        className="relative"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 sm:pt-14 lg:w-full lg:max-w-2xl ">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-gray-100 lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="mb-6 sm:mb-10 flex">
                  <Greeting />
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                  Taste your way through paradise
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  Handcrafted food tours across Naples, Bonita, Marco Island &
                  Fort Myers. Local flavors, unforgettable stops, and zero
                  driving stress — we handle it all.
                </p>

                <div className="mt-10 flex items-center gap-x-6">
                  <CheckDatesAction />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            alt=""
            src={IMG1}
            className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Home
