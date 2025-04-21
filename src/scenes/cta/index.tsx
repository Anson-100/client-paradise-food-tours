import CheckDatesAction from "@/shared/CheckDatesAction"

const CTA = () => {
  return (
    <section className=" relative isolate mx-auto max-w-2xl lg:max-w-7xl px-6 lg:px-8 py-26">
      <section className="bg-teal-500/20 rounded-lg">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Hungry for more? <br />
            Book a tour!
          </h2>

          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
            <CheckDatesAction />
          </div>
        </div>
      </section>
    </section>
  )
}

export default CTA
