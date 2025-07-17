import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

import useGetSceneContent from "@/hooks/useGetSceneContent"
import ContactForm from "@/components/ContactForm"
import interactionTagMap from "@/data/interactionTagMap.json"

import {
  BuildingOffice2Icon,
  PhoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const ContactUs = ({ setSelectedPage }: Props) => {
  const { content, isLoading } = useGetSceneContent("contactus")

  if (isLoading || !content) return null

  return (
    <section id="contactus" className="min-h-[100vh] relative isolate ">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2"
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        <div className="relative px-6 flex pt-24 md:pt-44 lg:static lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-1/2"></div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold tracking-tight text-teal-500">
                {content.sceneTitle}
              </h3>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl">
                {/* {content.tagline} */}
                Get in touch
              </h2>
            </div>

            <p className="mt-6 text-lg/8 text-gray-600">
              {content.description}
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <UserGroupIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-teal-500"
                  />
                </dt>
                <dd>Large groups</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <BuildingOffice2Icon
                    aria-hidden="true"
                    className="h-7 w-6 text-teal-500"
                  />
                </dt>
                <dd>
                  <dd>Corporate events</dd>
                </dd>
              </div>
              <a
                href="tel:+18663287935"
                className="flex gap-x-4 hover:text-gray-900 group"
              >
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-teal-500 group-hover:text-teal-550"
                  />
                </dt>
                <dd className="">866–EAT–SWFL</dd>
              </a>
            </dl>
          </div>
        </div>
        {/* CONTACT FORM=================================================================== */}

        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 sm:py-36 xl:py-32 2xl:py-40 my-auto">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <ContactForm
              actionUrl="https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/checkdates-submit"
              submitLabel="Send message"
              /* grid gaps + neutral background to match old form */
              className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
              extraPayload={{
                tagIds: [interactionTagMap.contact],
              }}
            />
          </div>

          {/* 1-pixel divider and footer padding that were after the old grid */}
        </div>
      </motion.div>
    </section>
  )
}

export default ContactUs
