import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import LinkDesktop from "./LinkDesktop"
import LinkMobile from "./LinkMobile"
import LogoLinkNav from "./LogoLinkNav"
import CheckDatesAction from "@/shared/CheckDatesAction"

import {
  Bars2Icon,
  XMarkIcon,
  HomeIcon,
  PaperAirplaneIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  SquaresPlusIcon,
  CalendarDateRangeIcon,
} from "@heroicons/react/24/solid"

import { PhoneIcon } from "@heroicons/react/24/outline"

import { SelectedPage } from "@/shared/types"
import useMediaQuery from "@/hooks/useMediaQuery"

type Props = {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between"
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1160px)")

  const navbarBackground = isTopOfPage ? "" : ""

  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation() // Get the current route

  // Navbar.tsx
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const inMenu = menuRef.current?.contains(e.target as Node)
      // ✅ NEW: ignore clicks that happen inside the Check Dates dialog
      const inDatesDialog = (e.target as HTMLElement).closest(
        "[data-checkdates-dialog]"
      )

      if (!inMenu && !inDatesDialog) {
        setIsMenuToggled(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if the current route is `/waivers`
  const isSimpleNavbar =
    location.pathname === "/FAQ" ||
    location.pathname === "/routeTwo" ||
    location.pathname.startsWith("/tours") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dev-login")

  // const isRouteTwo = location.pathname === "/routeTwo"

  return (
    <nav className="">
      <div
        className={`${navbarBackground} ${flexBetween} fixed bg-white top-0 z-30 w-full max-w-full h-[72px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]`}
      >
        <div className={`${flexBetween} mx-auto w-full px-4 sm:px-0 sm:w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            <LogoLinkNav />

            {/* RIGHT SIDE */}
            {isSimpleNavbar ? (
              // Simplified Navbar for FAQ Route Page
              <div>
                <Link
                  to="/"
                  onClick={() => {
                    setSelectedPage(SelectedPage.Home)
                    sessionStorage.setItem("selectedPage", "home")
                  }}
                  className="flex items-center font-semibold text-zinc-800 justify-center gap-2 py-2 px-4 m-2"
                >
                  <div className=" text-zinc-500 text-lg">&larr;</div>
                  Home{" "}
                </Link>
              </div>
            ) : isAboveMediumScreens ? (
              // FULL NAV ITEMS=================================================================================
              <div className={`${flexBetween} gap-8 `}>
                <div
                  className={`${flexBetween} gap-4 text-md  my-2 pl-4 pr-2 rounded-lg`}
                >
                  {" "}
                  <LinkDesktop
                    scrollTo={SelectedPage.Home}
                    displayText="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <LinkDesktop
                    scrollTo={SelectedPage.SectionOne}
                    displayText="Tours"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <LinkDesktop
                    scrollTo={SelectedPage.SectionThree}
                    displayText="Testimonials"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />{" "}
                  <LinkDesktop
                    scrollTo={SelectedPage.ContactUs}
                    displayText="Contact Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <div className="h-6 w-[1px] mb-1 bg-neutral-300"></div>
                  <Link
                    to="/FAQ"
                    onClick={() => {
                      sessionStorage.setItem("selectedPage", "faq")
                    }}
                    className="flex items-center  border-transparent hover:border-teal-500 text-zinc-700 justify-center  mt-1 pb-1 px-1 mx-2 border-b-[2px] font-semibold"
                  >
                    FAQ
                  </Link>{" "}
                  <CheckDatesAction
                    tourSlug={null} /* navbar isn’t tied to any tour */
                    locationKey="navbar"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <a
                  href="tel:+1 (866) 328-7935"
                  className="flex items-center gap-2 px-4 py-2 text-zinc-400  rounded-lg hover:bg-zinc-100 transition"
                >
                  <PhoneIcon className="w-6 h-6" />
                </a>

                <button
                  className="rounded-full p-2 hover:cursor-pointer"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  {!isMenuToggled ? (
                    <Bars2Icon className="w-6 text-zinc-500" />
                  ) : (
                    <XMarkIcon className="w-6 text-zinc-500" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 mt-[71px] w-full md:w-1/2 
              md:rounded-bl-md overflow-hidden z-30 bg-white
              transition-all duration-200

             
              shadow-[0_4px_6px_-2px_rgba(0,0,0,0.08)]

              
              md:shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.06),0_4px_6px_-2px_rgba(0,0,0,0.08)]

              ${isMenuToggled ? "h-auto opacity-100" : "h-0 opacity-0"}`}
        >
          {/* MENU ITEMS */}
          <div className="mt-2 flex flex-col items-center text-lg z-50 mx-2">
            <>
              <LinkMobile
                scrollTo={SelectedPage.Home}
                displayText="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={HomeIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.SectionOne}
                displayText="Tours"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={SquaresPlusIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.SectionThree}
                displayText="Testimonials"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={StarIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.ContactUs}
                displayText="Contact Us"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={PaperAirplaneIcon}
              />
              <div className="w-11/12 h-[1px] bg-neutral-300 my-2"></div>
              <div className="w-full mb-4">
                <Link
                  to="/FAQ"
                  onClick={() => {
                    sessionStorage.setItem("selectedPage", "faq")
                    setIsMenuToggled(false)
                  }}
                  className=" font-semibold pt-4 pb-2 w-full sm:w-5/6 px-4 mx-auto flex items-center text-md text-zinc-500 hover:text-zinc-600"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-4" />
                  <p>FAQ</p>
                </Link>
                {/* <Link
                  to="/routeTwo"
                  onClick={() => {
                    sessionStorage.setItem("selectedPage", "routetwo")
                    setIsMenuToggled(false)
                  }}
                  className="hover:cursor-pointer font-semibold pt-4 pb-2 w-full sm:w-5/6 px-4 mx-auto flex items-center text-zinc-500 hover:text-zinc-600"
                >
                  <PhotoIcon className="h-5 w-5 mr-4" />
                  <p>Gallery</p>
                </Link> */}
                {/* <a
                  href="https://v3.gorilladesk.com/auth/login/?nav=menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:cursor-pointer font-semibold pt-4 pb-2 w-full sm:w-5/6 px-4 mx-auto flex items-center text-zinc-500 hover:text-zinc-600"
                >
                  <UserCircleIcon className="h-5 w-5 mr-4" />
                  <p>
                    Sign In{" "}
                    <span className="text-neutral-400 text-lg">&rarr;</span>
                  </p>
                </a> */}
                <CheckDatesAction
                  customButton={onClick => (
                    <button
                      onClick={onClick}
                      className="hover:cursor-pointer font-semibold pt-4 pb-2 w-full sm:w-5/6 px-4 mx-auto flex items-center text-zinc-500 hover:text-zinc-600"
                    >
                      <CalendarDateRangeIcon className="h-5 w-5 mr-4" />
                      <p>
                        Check Dates{" "}
                        <span className="text-neutral-400 text-lg">&rarr;</span>
                      </p>
                    </button>
                  )}
                  tourSlug={null} /* navbar isn’t tied to any tour */
                  locationKey="navbar"
                />
              </div>
            </>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
