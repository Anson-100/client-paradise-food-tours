import logoNaplesIllustrated from "@/assets/logoNaplesIllustrated.png"
import logoNaplesTravel from "@/assets/logoNaplesTravel.png"
import logoUsaToday from "@/assets/logoUsaToday.png"
import logoAbc from "@/assets/logoAbc.png"

const LogoCloud = () => {
  return (
    <section className=" relative isolate overflow-hidden">
      <div className="overflow-hidden relative isolate">
        <div className="bg-zinc-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              <img
                alt="USA Today"
                src={logoUsaToday}
                width={158}
                height={48}
                className="col-span-2 max-h-14 w-full object-contain lg:col-span-1"
              />
              <img
                alt="ABC News"
                src={logoAbc}
                width={158}
                height={48}
                className="col-span-2  max-h-16 w-full object-contain sm:col-start-auto lg:col-span-1"
              />{" "}
              <img
                alt="Naples Illustrated"
                src={logoNaplesIllustrated}
                width={158}
                height={48}
                className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
              />
              <img
                alt="Naples Travel"
                src={logoNaplesTravel}
                width={158}
                height={48}
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
              />
            </div>
            <div className="mt-16 flex justify-center">
              <a
                href="https://www.naplesfloridatravelguide.com/blog/naples-florida-food-tour-driven-foodie-tours"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-full bg-zinc-800 px-4 py-1.5 text-sm/6 text-gray-300 font-normal hover:bg-zinc-700 transition-colors"
              >
                <span className="hidden md:inline">
                  Featured in major publications for unforgettable culinary
                  experiences.
                </span>{" "}
                <span className="font-semibold text-yellow-500">
                  See what the buzz is about{" "}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
