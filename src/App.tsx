import Navbar from "@/scenes/navbar"
import Home from "@/scenes/home"
import SectionOne from "@/scenes/sectionOne"
import SectionTwo from "@/scenes/sectionTwo"
import Newsletter from "./scenes/newsletter"
import LogoCloud from "./scenes/logoCloud"
import Banner from "./shared/Banner"
import TourWrapper from "@/scenes/tours/TourWrapper"

import SectionThree from "@/scenes/sectionThree"
import ContactUs from "@/scenes/contactUs"
import RouteOne from "@/scenes/routeOne"
// import RouteTwo from "@/scenes/routeTwo"
import ScrollToTop from "./components/ScrollToTop"
import CTA from "@/scenes/cta"

// import TourLayout from "@/scenes/tours/TourLayout"

import LineGradient from "@/components/LineGradient"
import Footer from "@/scenes/footer"
// ADMIN DASHBOARD IMPORT==============
import AdminDashboard from "@/admin/AdminDashboard"

import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import { SelectedPage } from "@/shared/types"

function AppContent() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  )
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Home)
      } else {
        setIsTopOfPage(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="app bg-black dark:bg-grayish">
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      {location.pathname === "/" && isTopOfPage && <Banner />}

      <Routes>
        {/* Main Scrollable Page */}
        <Route
          path="/"
          element={
            <>
              <Home setSelectedPage={setSelectedPage} />
              <LogoCloud />
              <LineGradient />
              <SectionOne setSelectedPage={setSelectedPage} />

              <SectionTwo setSelectedPage={setSelectedPage} />
              <Newsletter />
              <SectionThree setSelectedPage={setSelectedPage} />

              {/* <RouteTwo setSelectedPage={setSelectedPage} /> */}
              <LineGradient />

              <ContactUs setSelectedPage={setSelectedPage} />
              <CTA />

              <Footer
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </>
          }
        />

        {/* Standalone Route for FAQ and User Login */}
        <Route path="/routeOne" element={<RouteOne />} />

        {/* ✅ Dynamic single route for all tours */}
        {/* <Route path="/tours/:slug" element={<TourLayout />} /> */}
        <Route path="/tours/:slug" element={<TourWrapper />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
