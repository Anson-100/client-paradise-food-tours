import React, { useState } from "react"
import SceneHeader from "@/shared/SceneHeader"
import useGetSceneContent from "@/hooks/useGetSceneContent"

import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"

interface FaqItem {
  id: string
  question: string
  answer: string
}

const RouteOne: React.FC = () => {
  const { content, isLoading } = useGetSceneContent("routeone")
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})

  if (isLoading || !content) return null

  const toggleOpen = (id: string): void => {
    setIsOpen(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section
      id="routeone"
      className="relative isolate overflow-hidden min-h-[100vh] pb-12 sm:pb-24 w-full px-5"
    >
      {" "}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-64 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#FFD166] to-[#FF6B6B]"
        />
      </div>
      {/* HEADER */}
      <div className="sm:mx-auto sm:text-center">
        <SceneHeader
          sceneTitle={content.sceneTitle}
          tagline={content.tagline}
        />
      </div>
      <div className="w-full h-[1px] bg-neutral-300 mt-8 sm:mt-16 sm:w-5/6 lg:w-3/4 mx-auto"></div>
      {/* FAQ ITEMS */}
      <div className="w-full flex flex-col sm:w-5/6 lg:w-3/4 font-quest text-gray-200 text-base md:text-lg mx-auto">
        {content.items.map((item: FaqItem) => (
          <div key={item.id} className="flex flex-col">
            <button
              onClick={() => toggleOpen(item.id)}
              className="flex items-center justify-between w-full text-left py-5 sm:py-6 px-2"
            >
              <span className="text-zinc-700 transition-all duration-200 font-semibold">
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
                  <p className="pb-4 px-2 text-zinc-700">{item.answer}</p>
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
