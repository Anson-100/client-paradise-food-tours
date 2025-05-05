import AnchorLink from "react-anchor-link-smooth-scroll"
import { SelectedPage } from "@/shared/types"
import { Link } from "react-router-dom"
import LinkFooter from "./LinkFooter"
import LogoLinkFooter from "./LogoLinkFooter"
import IconFB from "@/assets/IconFB.svg"
import IconInsta from "@/assets/IconInsta.svg"
import IconYT from "@/assets/IconYT.svg"
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

      <div className="mx-auto max-w-7xl flex flex-col items-center overflow-hidden px-6 pt-8 gap-4 lg:px-8">
        <LogoLinkFooter />
        <div className=" flex justify-center gap-x-10">
          <a
            href="https://www.instagram.com/drivenfoodietours/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="opacity-80 hover:opacity-100">
              <img
                src={IconInsta}
                alt="Instagram"
                className="w-8 h-8 hover:cursor-pointer"
              />
            </span>
          </a>

          <a
            href="https://www.facebook.com/drivenfoodietours/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="opacity-80 hover:opacity-100">
              <img
                src={IconFB}
                alt="Facebook"
                className="w-8 h-8 hover:cursor-pointer"
              />
            </span>
          </a>

          <a
            href="https://www.youtube.com/watch?v=JSHtesXvNlw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="opacity-80 hover:opacity-100">
              <img
                src={IconYT}
                alt="YouTube"
                className="w-8 h-8 hover:cursor-pointer"
              />
            </span>
          </a>
        </div>
        {isTourRoute ? (
          ""
        ) : (
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm/6 mt-4"
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
              className="text-gray-100 group flex items-center justify-center hover:cursor-pointer hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            <CheckDatesAction
              customButton={onClick => (
                <button
                  onClick={onClick}
                  className="text-gray-100 group flex items-center justify-center hover:cursor-pointer"
                >
                  <p className="group-hover:underline">Check Dates</p>
                  <span className="ml-1 text-zinc-500 text-lg">&rarr;</span>
                </button>
              )}
            />
          </nav>
        )}

        <p className="m-10 text-center text-sm/6 text-gray-400">
          &copy; 2025 Paradise Food Tours. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
