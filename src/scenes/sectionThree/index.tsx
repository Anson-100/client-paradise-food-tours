import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const testimonials = [
  {
    body: "Every taco spot we visited felt like a hidden gem. The tacos were bursting with flavor and the margaritas were next-level. I’d do the Taco Tour again in a heartbeat!",
    author: {
      name: "Erika Moore",
      handle: "erikamoore",
      imageUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    },
  },
  {
    body: "The Pizza Wars Tour was hilarious and delicious. We got to judge the best pizza in Naples — the competition was fierce, but my taste buds won!",
    author: {
      name: "James Carter",
      handle: "jcarter91",
      imageUrl:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    },
  },
  {
    body: "Authentic Italian cuisine, good wine, and even better company. The Italian Tour gave me a whole new appreciation for family-owned trattorias.",
    author: {
      name: "Sofia DeLuca",
      handle: "sofiadeluca",
      imageUrl:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    },
  },
  {
    body: "Such a chill afternoon. The Brewery Tour introduced us to some incredible local craft beers I’d never even heard of. Loved the casual vibe.",
    author: {
      name: "Marcus Lane",
      handle: "mlane_305",
      imageUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    },
  },
  {
    body: "I didn’t know what to expect, but Taste of Bonita was a dream. The food was fresh, creative, and everything had a local story behind it.",
    author: {
      name: "Janelle Rivers",
      handle: "janelle.riv",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    },
  },
  {
    body: "Three brunches in one morning? Yes, please. The Brunch Tour was indulgent, cozy, and absolutely delicious. I left full and happy!",
    author: {
      name: "Oliver Chen",
      handle: "oliver.eats",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    },
  },
]

const SectionThree = ({ setSelectedPage }: Props) => {
  return (
    <section id="sectionthree" className="relative isolate pb-32  w-full ">
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
        className="mx-auto max-w-7xl px-6 lg:px-8"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionThree)}
      >
        <div className="mx-auto max-w-7xl ">
          <div className="mx-auto max-w-2xl text-center">
            <SceneHeader
              sceneTitle="Guest Reviews"
              tagline="What people are saying about our food tours."
            />
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.author.handle}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure className="rounded-2xl bg-gray-50 shadow-sm p-8 text-sm/6">
                    <blockquote className="text-gray-900">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={testimonial.author.imageUrl}
                        className="size-10 rounded-full bg-gray-50 "
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author.name}
                        </div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionThree
