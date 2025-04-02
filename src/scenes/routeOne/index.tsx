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
      question: "What services do you offer?",
      answer:
        "We provide lawn care, landscaping, hardscaping, irrigation, and seasonal maintenance.",
    },
    {
      id: "policy2",
      question: "How often should I mow my lawn?",
      answer:
        "It depends on the season, but generally, mowing once a week keeps your lawn healthy.",
    },
    {
      id: "policy3",
      question: "Do you offer free estimates?",
      answer: "Yes! Contact us to schedule a free consultation and quote.",
    },
    {
      id: "policy4",
      question: "What areas do you serve?",
      answer:
        "We serve Sarasota, Bradenton, Lakewood Ranch, and surrounding areas.",
    },
    {
      id: "policy5",
      question: "Do you offer recurring maintenance plans?",
      answer:
        "Yes, we have flexible maintenance plans to keep your lawn looking great year-round.",
    },
  ]

  return (
    <section
      id="routeone"
      className="relative isolate overflow-hidden  min-h-[100vh] pb-12 sm:pb-24 w-full px-5"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-neutral-200/10 ring-1 shadow-xl shadow-neutral-600/10 ring-neutral-200 sm:-mr-80 lg:-mr-96"
      />
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
