import { useParams } from "react-router-dom"
import Footer from "../footer"
import { StarIcon } from "@heroicons/react/20/solid"
// import { tours } from "./tourData"
import { SelectedPage } from "@/shared/types"
import useGetTourPhotos from "@/hooks/useGetTourPhotos"
import useGetSingleTourImage from "@/hooks/CMSuseGetSingleTourImage"
import useIsWalking from "@/hooks/useIsWalking"
import PeekBookButton from "@/shared/PeekBookButton"

import CheckDatesAction from "@/shared/CheckDatesAction"

import useGetTourContent from "@/hooks/CMSuseGetTourContent"

import {
  TruckIcon,
  CreditCardIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/20/solid"

const features = [
  {
    name: "Pickup & Drop-off",
    description:
      "This is a private tour with door-to-door service included within Naples. Pickup location and time will be confirmed the day prior to your tour.",
    icon: TruckIcon,
  },

  {
    name: "What to Bring",
    description:
      "Card or cash for drinks (alcoholic beverages are available for purchase at most locations). Cash gratuity for your guide and driver (customary tip is 15–20%).",
    icon: CreditCardIcon,
  },
  {
    name: "Dietary Accommodations",
    description:
      "Vegetarian options are available. Please let us know your needs in advance.",
    icon: HeartIcon,
  },
  {
    name: "What to Wear",
    description:
      "Casual attire and comfortable shoes are recommended. Minimal walking is involved, but you may briefly stand while waiting to be seated.",
    icon: UserIcon,
  },
]

const TourLayout = () => {
  const { slug } = useParams<{ slug: string }>()
  const { tour, isLoading } = useGetTourContent()
  console.log("tour slug:", tour?.slug)
  const isWalking = useIsWalking(tour?.slug)

  const galleryKeys = [0, 1, 2, 3].map(i => `${slug}-image-${i}`)
  const bannerKey = `${slug}-banner`
  // const avatarKey = `${slug}-avatar`

  const aboutPhotoKey = `${slug}-aboutPhoto`
  const aboutPhotoImg = useGetSingleTourImage(aboutPhotoKey)

  const galleryImages = useGetTourPhotos(galleryKeys)
  const bannerImg = useGetSingleTourImage(bannerKey)
  // const avatarImg = useGetSingleTourImage(avatarKey)

  if (isLoading) return <div className="p-10 text-xl">Loading tour...</div>
  if (!tour) return <div className="p-10 text-xl">Tour not found.</div>

  const {
    name,
    title,
    heroText,
    ctaLine,
    about,
    included,
    testimonial,
    aboutText,
  } = tour

  console.log("aboutText for slug:", slug, aboutText) // ✅ PLACE IT HERE

  return (
    <div className="w-full relative isolate">
      BG BLUR========================
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
      {/* 2================== */}
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
      {/* 3====================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-200 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B]"
        />
      </div>
      {/* 4========================= */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-300 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
        />
      </div>
      {/* 5========================= */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-300 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B]"
        />
      </div>
      {/* 6========================= */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-500 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B] xl:mr-[calc(50%-12rem)] xl:ml-0"
        />
      </div>
      {/* 7================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-800 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B]"
        />
      </div>
      {/* 6========================= */}
      <div className="mx-auto max-w-2xl lg:max-w-7xl py-24 sm:py-32 overflow-x-hidden sm:overflow-x-visible">
        {/* HEADER */}
        <div className="max-w-4xl px-6 lg:px-8 pt-8">
          <p
            className={`text-base/7 font-semibold ${isWalking ? "text-coral-500" : "text-teal-500"}`}
          >
            {name}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 mb-12 text-xl/8 text-balance text-gray-700">
            {heroText}
          </p>
          {isWalking ? (
            <PeekBookButton peekUrl={tour.peekUrl} />
          ) : (
            <CheckDatesAction
              tourSlug={slug ?? null} /* slug comes from the URL */
              locationKey="tour_page"
            />
          )}
        </div>
        {/* ABOUT + GALLERY */}
        <section className="my-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 px-6 lg:px-8">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
              What to expect
            </h2>

            {about.map((paragraph: string, i: number) => (
              <p
                key={i}
                className={`${i === 0 ? "mt-6" : "mt-8"} text-base/7 text-gray-600`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* SCRAPBOOK PHOTOS */}
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 ${
                    i % 2 !== 0 ? "-mt-8 lg:-mt-40" : ""
                  }`}
                >
                  <img
                    alt=""
                    src={img}
                    className="block w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      imageRendering: "crisp-edges",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500">
              Tour Details
            </p>
            <hr className="mt-6 border-t border-gray-200" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {tour.details.map(
                (item: { name: string; value: string }, i: number) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-y-2 ${
                      i < tour.details.length - 1
                        ? "border-b border-dotted border-gray-200 pb-4"
                        : ""
                    }`}
                  >
                    <dt className="text-md/6 text-zinc-800">{item.name}</dt>
                    <dd className="text-6xl font-semibold tracking-tight">
                      {item.value}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-2xl">
              About the tour
            </h1>

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2">
              <div>
                <p className="whitespace-pre-line">{aboutText.col1}</p>
              </div>
              <div>
                <p className="whitespace-pre-line">{aboutText.col2}</p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="py-18">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto ">
              <h2 className="text-2xl text-gray-900 font-semibold ">
                Checklist
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-7xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-16 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map(feature => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-lg font-semibold text-gray-900">
                      <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg ">
                        <feature.icon
                          aria-hidden="true"
                          className={`size-8 ${isWalking ? "text-coral-500" : "text-teal-500"}`}
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base/7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <h3 className="text-center pt-18">
            Do you have more than 14 guests? Call{" "}
            <span
              className={`font-semibold ${isWalking ? "text-coral-500" : "text-teal-500"}`}
            >
              866-EAT-SWFL
            </span>{" "}
            for a custom quote.
          </h3>
        </div>
        {aboutPhotoImg && (
          <div className="mt-32  xl:mx-auto xl:max-w-8xl xl:px-8">
            <img
              src={aboutPhotoImg}
              alt="About the tour"
              className="aspect-[5/3] sm:aspect-[5/2] sm:rounded-2xl lg:rounded-none  w-full object-cover  transition-transform duration-700 xl:rounded-3xl"
            />
          </div>
        )}
        {/* INCLUDED */}
        <section className="py-24 sm:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-800 sm:text-4xl">
                  What's included
                </h2>
                <p className="mt-4 text-lg/8 text-gray-600">
                  Every tour includes great food, good company, and zero hassle.
                </p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                {included.map(
                  (stat: { value: string; name: string }, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-white/20 p-8"
                    >
                      <dd className="text-3xl font-semibold tracking-tight text-gray-800">
                        {stat.value}
                      </dd>
                      <dt className="mt-1 text-sm/6 font-semibold text-gray-600">
                        {stat.name}
                      </dt>
                    </div>
                  )
                )}
              </dl>
            </div>
          </div>
        </section>
        {/* BANNER IMAGE */}
        <div className=" xl:mx-auto xl:max-w-8xl xl:px-8">
          <img
            alt=""
            src={bannerImg}
            className="aspect-[5/3] sm:aspect-[5/2] sm:rounded-2xl lg:rounded-none  w-full object-cover  transition-transform duration-700 xl:rounded-3xl"
          />
        </div>
        {/* TESTIMONIAL */}
        <section className="px-6 py-20 my-10 sm:py-32 lg:px-8 relative isolate overflow-hidden">
          {/* <div className="absolute top-0 left-1/2 -z-10 h-200 w-360 -translate-x-1/2 opacity-20 lg:left-36" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] shadow-lg ring-1 shadow-teal-500/10 ring-gray-100 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" /> */}
          <figure className="mx-auto max-w-2xl">
            <p className="sr-only">5 out of 5 stars</p>
            <div className="flex gap-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="size-5 flex-none"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9 relative">
              {/* <svg
                fill="none"
                viewBox="0 0 162 128"
                aria-hidden="true"
                className="absolute -top-12 right-12 -z-10 h-32 stroke-gray-500/10"
              >
                <path
                  d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                />
                <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
              </svg> */}
              <p>"{testimonial.quote}"</p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-x-6">
              {/* <img
                alt=""
                src={avatarImg}
                className="size-12 rounded-full bg-gray-50"
              /> */}
              <div className="text-sm/6">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="mt-0.5 text-gray-600">{testimonial.role}</div>
              </div>
            </figcaption>
          </figure>
        </section>
        {/* CTA */}
        {/* CTA (unchanged look, extra white underlay) */}
        <section className="relative mx-6 lg:mx-8">
          {/* 1 ▸ white under-plate */}
          <div className="absolute inset-0 rounded-lg bg-white" />

          {/* 2 ▸ existing translucent panel sits on top */}
          <div
            className={`relative rounded-lg
      ${isWalking ? "bg-coral-500/20" : "bg-teal-500/20"}`}
          >
            <div
              className="mx-auto max-w-7xl px-6 py-24 sm:py-32
                    lg:flex lg:items-center lg:justify-between lg:px-8"
            >
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Hungry for more? <br />
                {ctaLine}
              </h2>

              <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
                {isWalking ? (
                  <PeekBookButton peekUrl={tour.peekUrl} />
                ) : (
                  <CheckDatesAction
                    tourSlug={slug ?? null} /* slug comes from the URL */
                    locationKey="tour_page"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer
        selectedPage={SelectedPage.Home}
        setSelectedPage={function (): void {
          throw new Error("Function not implemented.")
        }}
      />
    </div>
  )
}

export default TourLayout
