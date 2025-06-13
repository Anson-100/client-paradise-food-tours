import logoNaplesIllustrated from "@/assets/logoNaplesIllustrated.png"
import logoNaplesTravel from "@/assets/logoNaplesTravel.png"
import logoUsaToday from "@/assets/logoUsaToday.png"
import logoAbc from "@/assets/logoAbc.png"
import logoNaplesNews from "@/assets/naplesDailyNewsLogo.png"

const LogoCloud = () => {
  return (
    <section className=" relative isolate overflow-hidden">
      <div className="overflow-hidden relative isolate">
        {" "}
        <div className="bg-zinc-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                alt="Transistor"
                src={logoUsaToday}
                width={158}
                height={48}
                className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
              />
              <img
                alt="Reform"
                src={logoAbc}
                width={158}
                height={48}
                className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
              />
              <img
                alt="Tuple"
                src={logoNaplesIllustrated}
                width={158}
                height={48}
                className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
              />
              <img
                alt="SavvyCal"
                src={logoNaplesNews}
                width={158}
                height={48}
                className="col-span-2 max-h-16 w-full object-contain sm:col-start-2 lg:col-span-1"
              />
              <img
                alt="Statamic"
                src={logoNaplesTravel}
                width={158}
                height={48}
                className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
              />
            </div>
          </div>{" "}
          {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
