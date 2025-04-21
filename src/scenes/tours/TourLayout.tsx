import { useParams } from "react-router-dom"
import Footer from "../footer"
import { StarIcon } from "@heroicons/react/20/solid"
import { tours } from "./tourData"
import { SelectedPage } from "@/shared/types"
import useGetTourPhotos from "@/hooks/useGetTourPhotos"
import CheckDatesAction from "@/shared/CheckDatesAction"

// type Tour = {
//   slug: string
//   name: string
//   title: string
//   heroText: string
//   ctaLine: string
//   duration: string
//   stops: number
//   guests: string
//   cost: string
//   about: string[]
//   galleryImages: string[]
//   bannerImage: string
//   included: {
//     value: string
//     name: string
//   }[]
//   testimonial: {
//     quote: string
//     name: string
//     role: string
//     avatar: string
//   }
// }

const TourLayout = () => {
  const { slug } = useParams()
  const tour = tours.find(t => t.slug === slug)

  console.log("slug:", slug)
  console.log("tour:", tour)

  if (!tour) return <div className="p-10 text-xl">Tour not found.</div>

  const galleryImages = useGetTourPhotos(tour.galleryImages)

  const {
    name,
    title,
    heroText,
    ctaLine,
    duration,
    stops,
    guests,
    cost,
    about,
    bannerImage,
    included,
    testimonial,
  } = tour

  console.log("Fetched gallery images:", galleryImages)

  return (
    <div className="w-full relative isolate">
      {/* BG BLUR======================== */}
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
      <div className="mx-auto max-w-2xl lg:max-w-7xl py-24 sm:py-32">
        {/* HEADER */}
        <div className="max-w-4xl px-6 lg:px-8">
          <p className="text-base/7 font-semibold text-zinc-600">{name}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 mb-12 text-xl/8 text-balance text-gray-700">
            {heroText}
          </p>
          <CheckDatesAction />
        </div>

        {/* ABOUT + GALLERY */}
        <section className="my-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 px-6 lg:px-8">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
              About the tour
            </h2>
            {about.map((paragraph, i) => (
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
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-zinc-800">Duration</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {duration}
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-zinc-800">Tasting Stops</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {stops}
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-zinc-800">Guests Per Tour</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {guests}
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-zinc-800">Cost per guest</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {cost}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* INCLUDED */}
        <section className="py-24 sm:py-32">
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
                {included.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-white/5 p-8"
                  >
                    <dd className="text-3xl font-semibold tracking-tight text-gray-800">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-sm/6 font-semibold text-gray-600">
                      {stat.name}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* BANNER IMAGE */}
        <div className=" xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src={bannerImage}
            className="aspect-5/2 w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* TESTIMONIAL */}
        <section className="px-6 py-24 sm:py-32 lg:px-8">
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
            <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9">
              <p>{testimonial.quote}</p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-x-6">
              <img
                alt=""
                src={testimonial.avatar}
                className="size-12 rounded-full bg-gray-50"
              />
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
        <section className="bg-teal-500/20 rounded-lg mx-6 lg:mx-8">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Hungry for more? <br />
              {ctaLine}
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
              <CheckDatesAction />
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
