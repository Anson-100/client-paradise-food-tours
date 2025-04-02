"use client"

import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

import AnchorLink from "react-anchor-link-smooth-scroll"

import Greeting from "./greeting"

import HeroImage from "@/assets/heroImage.png"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="home"
      className="min-h-[100vh] relative isolate overflow-hidden "
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-neutral-200/10  ring-1 shadow-xl shadow-neutral-600/20 ring-neutral-200 sm:-mr-80 lg:-mr-96"
      />

      <motion.div
        className="relative isolate overflow-hidden pt-8 sm:pt-14"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        <div className="mx-auto max-w-7xl px-5 py-30 3xl:py-40 lg:px-8 min-h-[100vh]">
          <div className="my-auto mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <div className="max-w-2xl text-[47px] leading-[1] text-zinc-900 sm:text-7xl lg:col-span-2 xl:col-auto">
              <Greeting />
              <h1 className="font-semibold tracking-tight text-balance mt-4 sm:mt-4">
                We make lawns look their best
              </h1>
            </div>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg text-zinc-700 sm:text-xl/8">
                Enjoy a lush, healthy lawn without the hassle. Our expert care
                ensures greener grass, fewer weeds, and a yard you’ll love.
                Whether it’s routine maintenance or a total lawn transformation,
                we’ve got you covered.
              </p>
              {/* BUTTONS================ */}
              <div className="mt-10 flex items-center gap-4">
                <AnchorLink
                  className=" flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                  onClick={() => setSelectedPage(SelectedPage.ContactUs)}
                  href={`#${SelectedPage.ContactUs}`}
                >
                  Contact Us
                </AnchorLink>

                {/* <a
                  href="https://v3.gorilladesk.com/auth/login/?nav=menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-all duration-100 font-semibold text-gray-900 px-5 py-3 rounded-md flex items-center "
                >
                  Your Account
                  <span className="ml-2 text-zinc-500 " aria-hidden="true">
                    →
                  </span>
                </a> */}
                <button
                  onClick={() => (window as any).GorillaDesk("showPortal")}
                  className="border-[1px] border-neutral-300 group hover:cursor-pointer transition-all duration-100 font-semibold text-gray-900 bg-neutral-100/50 px-5 py-3 rounded-md flex items-center"
                >
                  Your Account
                  <span
                    className="ml-1 sm:ml-2 text-zinc-500"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
            <img
              alt=""
              src={HeroImage}
              className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 2xl:mt-12 3xl:mt-40"
            />
          </div>
        </div>
        {/* <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-neutral-50 sm:h-32" /> */}
      </motion.div>
    </section>
  )
}

export default Home
