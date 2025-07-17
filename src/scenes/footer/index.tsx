import AnchorLink from "react-anchor-link-smooth-scroll"
import { SelectedPage } from "@/shared/types"
import { Link } from "react-router-dom"
import LinkFooter from "./LinkFooter"
import LogoLinkFooter from "./LogoLinkFooter"

import { useLocation } from "react-router-dom"
import CheckDatesAction from "@/shared/CheckDatesAction"

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const Footer = ({ selectedPage, setSelectedPage }: Props) => {
  const location = useLocation()
  const isTourRoute = location.pathname.startsWith("/tours/")

  return (
    <footer className="bg-zinc-900 flex flex-col">
      {isTourRoute ? (
        <button
          className="z-10 w-full bg-zinc-800 hover:bg-zinc-900 py-3 font-semibold text-center text-gray-100 hover:cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          back to top
        </button>
      ) : (
        <AnchorLink
          className="z-10 w-full bg-zinc-800 hover:bg-zinc-900 py-3 font-semibold text-center text-gray-100 hover:cursor-pointer"
          onClick={() => setSelectedPage?.(SelectedPage.Home)}
          href={`#${SelectedPage.Home}`}
        >
          back to top
        </AnchorLink>
      )}

      <div className="mx-auto max-w-7xl flex flex-col items-center overflow-hidden px-6 pt-8 gap-8 lg:px-8">
        <LogoLinkFooter />

        {isTourRoute ? (
          ""
        ) : (
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3  mt-4"
          >
            {" "}
            <LinkFooter
              scrollTo={SelectedPage.SectionOne}
              displayText="Tours"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            {/* <LinkFooter
              scrollTo={SelectedPage.SectionTwo}
              displayText="About Us"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            /> */}
            <LinkFooter
              scrollTo={SelectedPage.SectionThree}
              displayText="Reviews"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <LinkFooter
              scrollTo={SelectedPage.ContactUs}
              displayText="Contact Us"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              to="/routeTwo"
              onClick={() => {
                sessionStorage.setItem("selectedPage", "routeone")
              }}
              className="text-gray-400 group flex items-center justify-center hover:cursor-pointer hover:text-gray-300"
            >
              Privacy Policy
            </Link>{" "}
            <CheckDatesAction
              customButton={onClick => (
                <button
                  onClick={onClick}
                  className="text-gray-400 group flex items-center justify-center hover:cursor-pointer"
                >
                  <p className="group-hover:text-gray-300">Check Dates</p>
                  <span className="ml-1 text-gray-400 group-hover:text-gray-300 text-lg">
                    &rarr;
                  </span>
                </button>
              )}
              tourSlug={null}
              locationKey={"tour_card"}
            />
          </nav>
        )}
        <div className=" flex justify-center gap-x-10">
          <a
            href="https://www.instagram.com/drivenfoodietours/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300"
          >
            {" "}
            <svg fill="currentColor" viewBox="0 0 24 24" width="28" height="28">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/paradisefoodtours/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" width="28" height="28">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="https://www.youtube.com/@paradisefoodtours"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" width="28" height="28">
              <path
                fillRule="evenodd"
                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@paradisefoodtours"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 449.45 515.38"
              width="24"
              height="24"
            >
              <path
                fillRule="nonzero"
                d="M382.31 103.3c-27.76-18.1-47.79-47.07-54.04-80.82-1.35-7.29-2.1-14.8-2.1-22.48h-88.6l-.15 355.09c-1.48 39.77-34.21 71.68-74.33 71.68-12.47 0-24.21-3.11-34.55-8.56-23.71-12.47-39.94-37.32-39.94-65.91 0-41.07 33.42-74.49 74.48-74.49 7.67 0 15.02 1.27 21.97 3.44V190.8c-7.2-.99-14.51-1.59-21.97-1.59C73.16 189.21 0 262.36 0 352.3c0 55.17 27.56 104 69.63 133.52 26.48 18.61 58.71 29.56 93.46 29.56 89.93 0 163.08-73.16 163.08-163.08V172.23c34.75 24.94 77.33 39.64 123.28 39.64v-88.61c-24.75 0-47.8-7.35-67.14-19.96z"
              />
            </svg>
          </a>
        </div>

        <p className="mb-20 text-center text-sm/6 text-gray-400">
          &copy; 2025 Paradise Food Tours. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
