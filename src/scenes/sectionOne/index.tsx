import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"
import SceneHeader from "@/shared/SceneHeader"
import useGetSceneContent from "@/hooks/CMSuseGetSceneContent"

import CustomDropdown from "./customDropdown"
import TourCard from "./tourCard"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

type Option = {
  id: number
  name: string
  count: number
  value: string
}

type TourCardData = {
  title: string
  desc: string
  type: string
  price: string
  duration: string
  status: string
  link: string
  location: string
  image: string
  visible: boolean
  isWalking: boolean
}

const SectionOne = ({ setSelectedPage }: Props) => {
  const { content, isLoading } = useGetSceneContent("sectionone")
  const tours = content?.tours || []

  // Only show tours that are marked visible
  const visibleTours = (tours as any[]).filter(
    t => t.visible !== false && t.visible !== "false"
  )

  const location: Option[] = useMemo(() => {
    const counts: Record<string, number> = {}
    visibleTours.forEach((t: TourCardData) => {
      counts[t.location] = (counts[t.location] || 0) + 1
    })

    // Count walking tours across all locations
    const walkingToursCount = visibleTours.filter(
      (t: TourCardData) => t.isWalking
    ).length

    // First, create the location-based options
    const locationOptions = Object.entries(counts).map(([loc, count], i) => ({
      id: i + 2, // Start IDs after "All Tours"
      name: `${loc} Tours`,
      count,
      value: loc,
    }))

    return [
      { id: 1, name: "All Tours", count: visibleTours.length, value: "all" },
      ...locationOptions,
      {
        id: locationOptions.length + 2,
        name: "Walking Tours",
        count: walkingToursCount,
        value: "walking",
      },
    ]
  }, [visibleTours])

  // Initialize with a placeholder to avoid undefined
  const [selected, setSelected] = useState<Option | null>(null)

  // Set the initial selected value once location is computed
  useEffect(() => {
    if (location.length > 0 && !selected) {
      setSelected(location[0])
    }
  }, [location, selected])

  if (isLoading || !content || !selected) return null

  const filteredTours =
    selected.value === "all"
      ? visibleTours
      : selected.value === "walking"
        ? visibleTours.filter((t: TourCardData) => t.isWalking)
        : visibleTours.filter(
            (t: TourCardData) => t.location === selected.value
          )

  return (
    <section
      id="sectionone"
      className="min-h-[100vh] overflow-hidden relative isolate pb-12"
    >
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionOne)}
      >
        <div className="mb-2">
          <SceneHeader
            sceneTitle={content.sceneTitle}
            tagline={content.tagline}
          />
        </div>

        <CustomDropdown
          options={location}
          selected={selected}
          onSelect={(option: Option) => setSelected(option)}
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 mt-12">
          {filteredTours.map(tour => (
            <li key={tour.link} className="relative">
              {tour.isWalking && (
                <span className="absolute top-2 right-2 bg-coral-500/70 rounded-tr-xl text-white text-sm uppercase px-2 items-center py-1 rounded flex gap-1 text-zinc-50 font-semibold">
                  <ArrowTrendingUpIcon className="h-4" /> walking tour
                </span>
              )}
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

export default SectionOne
