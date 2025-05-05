import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import HomeAdminEditor from "./HomeAdminEditor"
import TourGridAdminEditor from "./TourGridAdminEditor"
import AboutAdminEditor from "./AboutAdminEditor"
import TestimonialAdminEditor from "./TestimonialAdminEditor"
import ContactAdminEditor from "./ContactAdminEditor"
import FaqAdminEditor from "./FaqAdminEditor"
import TourAdminEditor from "./TourAdminEditor"
import useAuth from "@/auth/useAuth"
import useGetSceneContent from "@/hooks/useGetSceneContent"
import LogoIcon from "@/assets/logoMainIcon.png"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import {
  ArrowUpRightIcon,
  InformationCircleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid"
import Greeting from "./Greeting"
import useGetTourContent from "@/hooks/useGetTourContent"

import { useNavigate, Navigate } from "react-router-dom"

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth()

  const { content: sectionOneContent, isLoading: isSceneLoading } =
    useGetSceneContent("sectionone")

  if (!isAuthenticated) return <Navigate to="/dev-login" replace />

  const [selectedTourSlug, setSelectedTourSlug] = useState("")

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("cognito_id_token")
    localStorage.removeItem("selectedSection")
    localStorage.removeItem("selectedTourSlug")
    navigate("/dev-login")
  }

  // Extract slugs and titles from metadata
  const tourList =
    (sectionOneContent?.tours as any[])?.map(t => ({
      name: t.title,
      slug: t.link.replace("/tours/", ""),
    })) || []

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("selectedTourSlug")
    if (saved) {
      setSelectedTourSlug(saved)
    } else if (tourList.length > 0) {
      setSelectedTourSlug(tourList[0].slug)
    }
  }, [tourList])

  // Always save selection to localStorage
  const handleSelect = (slug: string) => {
    setSelectedTourSlug(slug)
    localStorage.setItem("selectedTourSlug", slug)
  }
  const [selectedSection, setSelectedSection] = useState(() => {
    return localStorage.getItem("selectedSection") || "home"
  })

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section)
    localStorage.setItem("selectedSection", section)
  }

  const { tour, isLoading } = useGetTourContent(selectedTourSlug)

  function getUserNameFromToken(): string {
    const token = localStorage.getItem("cognito_id_token")
    if (!token) return "Guest"

    try {
      const payloadBase64 = token.split(".")[1]
      const decodedPayload = JSON.parse(atob(payloadBase64))
      return decodedPayload.name || "Guest"
    } catch {
      return "Guest"
    }
  }

  const userName = getUserNameFromToken()

  if (isLoading || isSceneLoading) {
    return <div className="p-10 text-xl">Loading admin tools...</div>
  }

  return (
    <section className="min-h-screen relative isolate overflow-hidden  ">
      {" "}
      {/* NAVBAR=================== */}
      <Disclosure as="nav" className="bg-white shadow-sm">
        <div className="mx-auto max-w-[95%] md:max-w-5/6 px-4">
          <div className="relative flex h-16 justify-between">
            {" "}
            <div className="flex shrink-0 gap-1 items-center justify-between">
              <img alt="Your Company" src={LogoIcon} className="h-9 w-auto" />
              <AdjustmentsHorizontalIcon className="h-6 text-teal-500" />
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {" "}
              {/* Mobile menu button */}
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              </div>
            </div>
            <DisclosureButton className="group sm:hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-teal-500 focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
            <div className="hidden absolute inset-y-0 right-0 sm:flex gap-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-1 items-center  justify-center  px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 font-semibold  focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                Active Campaign
                <ArrowUpRightIcon className="w-3" />
              </a>{" "}
              <a
                href="https://analytics.google.com/analytics/web/#/p487422264/reports/intelligenthome"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-1 items-center rounded px-3 py-2 bg-gray-100 hover:bg-gray-200  font-semibold justify-center  focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                Site Analytics
                <ArrowUpRightIcon className="w-3" />
              </a>{" "}
              <div className="w-[1px] h-6 bg-gray-300"></div>
              <button
                onClick={handleLogout}
                className="rounded bg-gray-400 hover:bg-coral-500 text-white px-3 py-2 font-semibold hover:cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 pt-2 pb-4">
            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
            <div className="flex flex-col gap-1">
              <DisclosureButton
                as="a"
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex font-semibold gap-1 border-l-4 border-transparent py-2 pr-4 pl-3 text-base text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Active Campaign
                <ArrowUpRightIcon className="w-3" />
              </DisclosureButton>

              <DisclosureButton
                as="a"
                href="https://analytics.google.com/analytics/web/#/p487422264/reports/intelligenthome"
                target="_blank"
                rel="noopener noreferrer"
                className="flex font-semibold gap-1 border-l-4 border-transparent py-2 pr-4 pl-3 text-base text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Site Analytics
                <ArrowUpRightIcon className="w-3" />
              </DisclosureButton>
              <DisclosureButton
                as="button"
                onClick={handleLogout}
                className="flex font-semibold gap-1 border-l-4 border-transparent py-2 pr-4 pl-3 text-base text-gray-500 hover:border-gray-300 hover:cursor-pointer hover:bg-gray-50 hover:text-gray-700"
              >
                Log Out
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      {/* MAIN CONTENT================ */}
      <motion.div className="relative isolate px-4 mt-16 mx-auto">
        <div className="w-[95%] md:w-5/6 mx-auto">
          <Greeting name={userName} />

          <h1 className="text-4xl font-bold mt-4">Manage your site</h1>
          <div className="mt-20 max-w-xl">
            <div className="mt-20">
              <h3 className="font-semibold text-xl mb-2">CMS</h3>
              <select
                value={selectedSection}
                onChange={e => handleSectionSelect(e.target.value)}
                className="w-full p-3 border bg-white border-gray-300 rounded-md shadow-sm text-gray-800 font-semibold"
              >
                <option value="home">Home Section</option>
                <option value="tourgrid">Tour Grid Section</option>
                <option value="about">About Section</option>
                <option value="testimonials">Testimonials Section</option>
                <option value="contact">Contact Section</option>
                <option value="faq">FAQ Section</option>
                <option value="tours">Tour Pages</option>
              </select>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <p className="flex items-start gap-2">
              <InformationCircleIcon className="mt-0.5 h-5 w-5 text-teal-500 shrink-0" />
              For best results, organize your text content to fit inside the
              boxes provided; too little and especially too much will distort
              the layout.
            </p>{" "}
            <p className="flex items-start gap-2">
              <InformationCircleIcon className="mt-0.5 h-5 w-5 text-teal-500 shrink-0" />
              It is best to edit text content on a desktop computer; as long as
              text content fits inside the boxes provided on desktop, it will
              not break on mobile.
            </p>
            <p className="flex items-start gap-2">
              <InformationCircleIcon className="mt-0.5 h-5 w-5 text-teal-500 shrink-0" />
              Don’t forget to click "Save Changes" before switching to another
              section or leaving the admin dashboard.
            </p>
          </div>
        </div>
        {selectedSection === "home" && (
          <div className="py-12">
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] py-4">
              <HomeAdminEditor />
            </div>
          </div>
        )}

        {selectedSection === "tourgrid" && (
          <div className="py-12">
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] py-4">
              <TourGridAdminEditor />
            </div>
          </div>
        )}

        {selectedSection === "about" && (
          <div className="py-12">
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] py-4">
              <AboutAdminEditor />
            </div>
          </div>
        )}

        {selectedSection === "testimonials" && (
          <div className="py-12">
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] py-4">
              <TestimonialAdminEditor />
            </div>
          </div>
        )}

        {selectedSection === "contact" && (
          <div className="py-12">
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] py-4">
              <ContactAdminEditor />
            </div>
          </div>
        )}

        {selectedSection === "faq" && (
          <div className="py-12">
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] py-4">
              <FaqAdminEditor />
            </div>
          </div>
        )}

        {/* TOURS SECTION================ */}
        {selectedSection === "tours" && (
          <div className="mt-4 ">
            <div className="flex flex-col gap-2 w-[95%] md:w-5/6 mx-auto">
              {/* Tour Selector */}
              <div className="mb-8 mt-4 max-w-xl font-semibold ">
                <p className="mb-1">Select a tour</p>
                <select
                  value={selectedTourSlug}
                  onChange={e => handleSelect(e.target.value)}
                  className="w-full p-3 border bg-white border-gray-300 rounded-md shadow-sm text-gray-800"
                >
                  {tourList.map(t => (
                    <option key={t.slug} value={t.slug}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Editor */}
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] p-4">
              {tour && <TourAdminEditor tour={tour} />}
            </div>
          </div>
        )}
      </motion.div>{" "}
      <div className="mt-24 flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:cursor-pointer w-full px-6 py-2  border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100 font-semibold"
        >
          ↑ Back to Top
        </button>
      </div>
    </section>
  )
}

export default AdminDashboard
