import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

import ServiceImage from "@/assets/serviceImage.png"

import SceneHeader from "@/shared/SceneHeader"

import {
  FunnelIcon,
  HomeModernIcon,
  BugAntIcon,
} from "@heroicons/react/20/solid"

const features = [
  {
    name: "Lawn Mowing & Maintenance.",
    description:
      "Regular mowing, edging, and trimming to keep your lawn looking pristine.",
    icon: HomeModernIcon,
  },
  {
    name: "Weed Control & Fertilization.",
    description:
      "Customized treatments to eliminate weeds and promote lush, healthy grass.",
    icon: BugAntIcon,
  },
  {
    name: "Aeration & Overseeding.",
    description:
      "Improving soil health and thickening your lawn for stronger, greener grass.",
    icon: FunnelIcon,
  },
]

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionOne = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="sectionone"
      className="min-h-[100vh] overflow-hidden relative isolate"
    >
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8 "
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionOne)}
      >
        {/* BG DESIGN PATTERN================================== */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-neutral-400/40 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] "
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-neutral-200">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <SceneHeader
                sceneTitle="Services"
                tagline="Lawn care made easy. Results you can see."
              />
              <p className="mt-6 text-lg/8 text-zinc-600 hidden sm:inline-block">
                A well-maintained lawn isn’t just about looks—it’s about
                creating a healthy, thriving outdoor space. Our expert team
                ensures your yard stays green, lush, and weed-free, so you can
                enjoy a beautiful lawn without the hassle.
              </p>
              <dl className="mt-10 max-w-xl space-y-6 text-base/7 text-zinc-600 lg:max-w-none">
                {features.map(feature => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-zinc-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 w-5 text-emerald-500"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first sm:pt-24 xl:pt-32">
            <img
              alt="Product screenshot"
              src={ServiceImage}
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionOne
