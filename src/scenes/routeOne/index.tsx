import React, { useState } from "react"
import SceneHeader from "@/shared/SceneHeader"

import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"

interface PolicyItem {
  id: string
  question: string
  answer: string | (() => JSX.Element)
}

const RouteOne: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})

  const toggleOpen = (id: string): void => {
    setIsOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }
  const PolicyItems: PolicyItem[] = [
    {
      id: "policy1",
      question: "What types of food tours do you offer?",
      answer:
        "We offer a variety of guided food tours that showcase the best local cuisine, from hidden gems to well-known favorites across Naples and Bonita Springs.",
    },
    {
      id: "policy2",
      question: "How long is each tour?",
      answer:
        "Most tours last between 3 to 4 hours and include multiple stops for tastings, drinks, and local insights.",
    },
    {
      id: "policy3",
      question: "Do I need to book in advance?",
      answer:
        "Yes, tours often fill up quickly — we recommend booking in advance to secure your spot.",
    },
    {
      id: "policy4",
      question: "What areas do your tours cover?",
      answer:
        "We currently run tours in downtown Naples, 5th Avenue, Mercato, and select spots in Bonita Springs.",
    },
    {
      id: "policy5",
      question: "Can you accommodate dietary restrictions?",
      answer:
        "We do our best to accommodate dietary needs. Let us know when booking, and we’ll coordinate with our partner restaurants.",
    },
  ]

  return (
    <section
      id="routeone"
      className="relative isolate overflow-hidden  min-h-[100vh] pb-12 sm:pb-24 w-full px-5"
    >
      {/* HEADER--------- */}
      <div className="sm:mx-auto sm:text-center">
        {" "}
        <SceneHeader
          sceneTitle="FAQ"
          tagline="Answers to your most common questions"
        />
      </div>

      <div className="w-full h-[1px] bg-neutral-300 mt-8 sm:mt-16  sm:w-5/6 mx-auto"></div>

      {/* WAIVERS======================================================= */}

      <div className="w-full flex flex-col sm:w-5/6 font-quest text-gray-200 text-base md:text-lg mx-auto">
        {PolicyItems.map(item => (
          <div key={item.id} className="flex flex-col">
            <button
              onClick={() => toggleOpen(item.id)}
              className="flex items-center justify-between w-full text-left py-5 sm:py-6 px-2"
            >
              <span
                className={`${
                  isOpen[item.id] ? "text-zinc-700" : "text-zinc-700"
                } transition-all duration-200 font-semibold`}
              >
                {item.question}
              </span>
              {isOpen[item.id] ? (
                <MinusIcon className="w-5 h-5 text-zinc-700" />
              ) : (
                <PlusIcon className="w-5 h-5 text-zinc-700" />
              )}
            </button>
            <AnimatePresence>
              {isOpen[item.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="pb-4 px-2 text-zinc-700">
                    {typeof item.answer === "function"
                      ? item.answer()
                      : item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full h-[1px] bg-neutral-300"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RouteOne
