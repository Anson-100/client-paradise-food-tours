import { motion } from "framer-motion"

import { SelectedPage } from "@/shared/types"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const RouteTwo = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="routetwo"
      className="relative isolate overflow-hidden min-h-[100vh]"
    >
      <motion.div
        className="h-[100vh] pb-12 sm:pb-24 w-full "
        onViewportEnter={() => setSelectedPage(SelectedPage.RouteTwo)}
      ></motion.div>
    </section>
  )
}

export default RouteTwo
