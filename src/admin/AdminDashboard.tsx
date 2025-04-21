import TourAdminEditor from "./TourAdminEditor"
import Greeting from "./Greeting"
import { useState } from "react"
import { motion } from "framer-motion"
import { tours } from "@/scenes/tours/tourData"

const AdminDashboard = () => {
  const [selectedTourSlug, setSelectedTourSlug] = useState(tours[0].slug)
  const selectedTour = tours.find(t => t.slug === selectedTourSlug)

  return (
    <section className="min-h-screen relative isolate overflow-hidden px-4 pt-12 pb-24">
      <motion.div className="relative mt-32 isolate w-11/12 lg:w-5/6 mx-auto">
        <Greeting />
        <h1 className="text-4xl font-bold mt-4">Manage your site content</h1>
        {/* TOURS SECTION================ */}
        <div className="mt-16">
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-semibold text-2xl">Tour Pages</p>
            </div>
            {/* Tour Selector */}
            <div className="my-12 max-w-xl">
              <select
                value={selectedTourSlug}
                onChange={e => setSelectedTourSlug(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800"
              >
                {tours.map(t => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Editor */}
            <div className="rounded-lg border border-dashed border-gray-300 bg-[linear-gradient(135deg,_theme(colors.gray.200)_25%,_transparent_25%,_transparent_50%,_theme(colors.gray.200)_50%,_theme(colors.gray.200)_75%,_transparent_75%,_transparent)] bg-[length:10px_10px] p-4">
              {selectedTour && <TourAdminEditor tour={selectedTour} />}
            </div>
            {/* Outer frame with background lines */}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default AdminDashboard
