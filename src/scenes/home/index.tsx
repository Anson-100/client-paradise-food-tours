import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import AnchorLink from "react-anchor-link-smooth-scroll"
// import { StarIcon } from "@heroicons/react/24/solid"

import CheckDatesAction from "@/shared/CheckDatesAction"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"
import useGetCloudImage from "@/hooks/useGetCloudImage"
import useMediaQuery from "@/hooks/useMediaQuery"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  const isAboveLargeScreens = useMediaQuery("(min-width:1024px)")
  const { content, isLoading } = useGetSceneContent("home")
  // inside Home.tsx, remove the JSON dependency and do this:

  const img0 = useGetCloudImage("home-image-0")
  const img1 = useGetCloudImage("home-image-1")
  const img2 = useGetCloudImage("home-image-2")
  const img3 = useGetCloudImage("home-image-3")
  const img4 = useGetCloudImage("home-image-4")

  if (isLoading || !content) return null

  return (
    <section id="home" className="">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Home)}>
        {isAboveLargeScreens ? (
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-20 z-20 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute top-0 right-0 left-1/2 z-20 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            >
              <div
                style={{
                  clipPath:
                    "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                }}
                className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] opacity-30"
              />
            </div>
            <div className="mx-auto max-w-7xl">
              <div className="relative  pt-14 lg:w-full lg:max-w-2xl">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-y-0 right-8 z-10 hidden h-full w-80 translate-x-1/2 transform fill-gray-100 lg:block"
                >
                  <polygon points="0,0 90,0 50,100 0,100" />
                </svg>

                <div className="relative px-6 py-32 sm:py-36 lg:px-8 3xl:py-56 lg:pr-0 z-30">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                    <div className="hidden sm:mb-16 sm:flex">
                      {/* <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                          Anim aute id magna aliqua ad ad non deserunt sunt.{" "}
                          <a
                            href="#"
                            className="font-semibold whitespace-nowrap text-indigo-600"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            Read more <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div> */}
                    </div>
                    <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                      {content.title}
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                      {content.subtitle}
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                      <CheckDatesAction tourSlug={null} locationKey="hero" />
                      <AnchorLink
                        className="font-semibold text-center hover:cursor-pointer"
                        onClick={() =>
                          setSelectedPage?.(SelectedPage.SectionTwo)
                        }
                        href={`#${SelectedPage.SectionTwo}`}
                      >
                        Learn more <span aria-hidden="true">→</span>
                      </AnchorLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                loading="eager" // force fetch in the first wave
                fetchPriority="high" // bump ahead of everything else
                alt=""
                src={img0}
                className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
              />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden relative isolate">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-64 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
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
              className="absolute inset-x-0 top-20 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            >
              <div
                style={{
                  clipPath:
                    "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                }}
                className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] opacity-30"
              />
            </div>
            <div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 2xl:pt-28">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none 2xl:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl lg:pt-20 2xl:pt-0">
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl mt-2">
                    {content.title}
                  </h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                    {content.subtitle}
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <CheckDatesAction tourSlug={null} locationKey="hero" />
                    <AnchorLink
                      className="font-semibold text-center hover:cursor-pointer"
                      onClick={() => setSelectedPage?.(SelectedPage.SectionTwo)}
                      href={`#${SelectedPage.SectionTwo}`}
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </AnchorLink>
                  </div>
                </div>
                {/* IMAGES=================== */}
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-2 lg:pl-0">
                  <div className="ml-auto w-44 sm:w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src={img0}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>

                  <div className="mr-auto w-44 sm:w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src={img1}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src={img2}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>

                  <div className="w-44 sm:w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src={img3}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src={img4}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default Home
