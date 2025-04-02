import Navbar from "@/scenes/navbar"
import Home from "@/scenes/home"
import SectionOne from "@/scenes/sectionOne"
import SectionTwo from "@/scenes/sectionTwo"
import SectionThree from "@/scenes/sectionThree"
import ContactUs from "@/scenes/contactUs"
import RouteOne from "@/scenes/routeOne"
import RouteTwo from "@/scenes/routeTwo"

// import LineGradient from "@/components/LineGradient"
import Footer from "@/scenes/footer"

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SelectedPage } from "@/shared/types"

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  )
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Home)
      }
      if (window.scrollY !== 0) setIsTopOfPage(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Router>
      <div className="app bg-black dark:bg-grayish">
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        <Routes>
          {/* Main Scrollable Page */}
          <Route
            path="/"
            element={
              <>
                <Home setSelectedPage={setSelectedPage} />

                <SectionOne setSelectedPage={setSelectedPage} />

                <SectionTwo setSelectedPage={setSelectedPage} />

                <SectionThree setSelectedPage={setSelectedPage} />

                <RouteTwo setSelectedPage={setSelectedPage} />

                <ContactUs setSelectedPage={setSelectedPage} />

                <Footer
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </>
            }
          />

          {/* Standalone Route for FAQ and User Login */}
          <Route path="/routeOne" element={<RouteOne />} />
          {/* <Route path="/routeTwo" element={<RouteTwo />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
