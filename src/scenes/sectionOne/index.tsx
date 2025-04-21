import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import { ClockIcon, FireIcon } from "@heroicons/react/24/outline"
import SceneHeader from "@/shared/SceneHeader"
import { Link } from "react-router-dom"

import CheckDatesAction from "@/shared/CheckDatesAction"

import CustomDropdown from "./customDropdown"

import { useState } from "react"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const tours = [
  {
    title: "Nacho Average Taco Tour",
    desc: "Authentic Mexican hidden gems with generous portions and delicious drinks",
    type: "Mexican",
    icon: FireIcon,
    price: "$149",
    duration: "4hrs",
    status: "active",
    link: "/tours/naples-taco-tour",
    location: "Naples",
  },
  {
    title: "Naples Pizza Wars Tour",
    desc: "You be the judge of the four most popular pizzas in Naples. It's a fight to the end!",
    type: "Pizza",
    icon: FireIcon,
    price: "$149",
    duration: "4hrs",
    status: "active",
    link: "/tours/naples-pizza-wars",
    location: "Naples",
  },
  {
    title: "Naples Italian Tour",
    desc: "Enjoy wine, a full meal plus dessert at 3 family-owned authentic trattorias",
    type: "Italian",
    icon: FireIcon,
    price: "$175",
    duration: "4hrs",
    status: "active",
    link: "/tours/naples-italian-tour",
    location: "Naples",
  },

  // {
  //   title: "N Naples/Bonita Brewery Tour",
  //   desc: "Visit 3 breweries and grab tasty snacks at the food trucks or on-site kitchens",
  //   type: "Beer",
  //   icon: FireIcon,
  //   price: "$149",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/brewery",
  //   location: "Naples / Bonita",
  // },
  // {
  //   title: "Taste of Bonita Tour",
  //   desc: "Experience the delights of downtown Bonita and explore historic Old 41",
  //   type: "Artisanal",
  //   icon: FireIcon,
  //   price: "$149",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/bonita",
  //   location: "Bonita",
  // },
  // {
  //   title: "Naples Dessert Tour",
  //   desc: "A sweet escape — explore Naples' best gelato, pastries, and more in one sugar-filled afternoon",
  //   type: "Dessert",
  //   icon: FireIcon,
  //   price: "$149",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/dessert-naples",
  //   location: "Naples",
  // },
  // {
  //   title: "Marco Island Seafood Tour",
  //   desc: "Savor fresh catches and waterfront views on Marco’s best seafood stops",
  //   type: "Seafood",
  //   icon: FireIcon,
  //   price: "$165",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/seafood-marco",
  //   location: "Marco Island",
  // },
  // {
  //   title: "Fort Myers Brewery Tour",
  //   desc: "Discover the best breweries across Fort Myers & Cape Coral with chilled pours and fun vibes",
  //   type: "Beer",
  //   icon: FireIcon,
  //   price: "$149",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/brewery-fortmyers",
  //   location: "Fort Myers / Cape Coral",
  // },
  // {
  //   title: "Fort Myers Distillery & Tasting Tour",
  //   desc: "Sample small-batch spirits, cocktails, and curated bites across local distilleries",
  //   type: "Spirits",
  //   icon: FireIcon,
  //   price: "$149",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/distillery-fortmyers",
  //   location: "Fort Myers / Cape Coral",
  // },
  // {
  //   title: "Fort Myers Seafood Tour",
  //   desc: "From crab cakes to ceviche — dive into the Gulf's finest flavors with this Fort Myers tour",
  //   type: "Seafood",
  //   icon: FireIcon,
  //   price: "$149",
  //   duration: "4hrs",
  //   status: "active",
  //   link: "/tours/seafood-fortmyers",
  //   location: "Fort Myers / Cape Coral",
  // },
  // {
  //   title: "Naples Brunch Tour (Coming Soon)",
  //   desc: "The only thing better than having brunch is having 3!",
  //   type: "Brunch",
  //   icon: FireIcon,
  //   price: "",
  //   duration: "4hrs",
  //   status: "coming",
  //   link: "",
  //   location: "Naples",
  // },
]

const getCountForLocation = (locName: string): number => {
  if (locName === "All Tours") return tours.length
  if (locName === "Naples Tours")
    return tours.filter(t => t.location.includes("Naples")).length
  if (locName === "Bonita Tours")
    return tours.filter(t => t.location.includes("Bonita")).length
  if (locName === "Ft Myers Tours")
    return tours.filter(t => t.location.includes("Fort Myers")).length
  if (locName === "Marco Island Tours")
    return tours.filter(t => t.location.includes("Marco Island")).length
  return 0
}

const location: Option[] = [
  { id: 1, name: "All Tours", count: getCountForLocation("All Tours") },
  { id: 2, name: "Naples Tours", count: getCountForLocation("Naples Tours") },
  { id: 3, name: "Bonita Tours", count: getCountForLocation("Bonita Tours") },
  {
    id: 4,
    name: "Ft Myers Tours",
    count: getCountForLocation("Ft Myers Tours"),
  },
  {
    id: 5,
    name: "Marco Island Tours",
    count: getCountForLocation("Marco Island Tours"),
  },
]

type Option = {
  id: number
  name: string
  count: number
}

const SectionOne = ({ setSelectedPage }: Props) => {
  const [selected, setSelected] = useState(location[0])
  return (
    <section
      id="sectionone"
      className="min-h-[100vh] overflow-hidden relative isolate  pb-12"
    >
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionOne)}
      >
        <SceneHeader
          sceneTitle="Our Food Tours"
          tagline="Sip. Savor. Relax. We handle the driving — you enjoy the flavors of paradise."
        />{" "}
        {/* SORT TOURS SELECTOR================================== */}
        <CustomDropdown
          options={location}
          selected={selected}
          onSelect={(option: Option) => setSelected(option)}
        />
        {/* TOURS GRID=============================== */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 mt-12">
          {tours
            .filter(tour => {
              const selectedLocation = selected.name
              if (selectedLocation === "All Tours") return true
              if (selectedLocation === "Naples Tours")
                return tour.location.includes("Naples")
              if (selectedLocation === "Bonita Tours")
                return tour.location.includes("Bonita")
              if (selectedLocation === "Ft Myers Tours")
                return tour.location.includes("Fort Myers")
              if (selectedLocation === "Marco Island Tours")
                return tour.location.includes("Marco Island")
              return false
            })
            .map((tour, index) => {
              const TypeIcon = tour.icon
              return (
                <li key={index}>
                  <div className="bg-zinc-900 aspect-3/2 w-full rounded-2xl flex items-center justify-center text-2xl text-gray-400">
                    IMG
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold tracking-tight text-zinc-900 max-w-[75%]">
                        {tour.title}
                      </h3>
                      {tour.price && (
                        <span className="text-base font-bold text-zinc-700">
                          {tour.price}
                        </span>
                      )}
                    </div>
                    <p className="text-md text-gray-600">{tour.desc}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-5 h-5" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <TypeIcon className="w-5 h-5" />
                        {tour.type}
                      </span>
                    </div>
                    {tour.status === "active" ? (
                      <div className="flex gap-2 pt-4 font-semibold">
                        <CheckDatesAction />
                        <Link to={tour.link}>
                          <button className="hover:cursor-pointer flex items-center gap-1 px-3.5 py-2.5 bg-zinc-50 text-md rounded-md  text-zinc-800">
                            Read More{" "}
                            <div className="text-zinc-600 text-lg">&rarr;</div>
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="text-gray-400 font-medium pt-4 text-sm">
                        (COMING SOON)
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
        </ul>
      </motion.div>
    </section>
  )
}

export default SectionOne
