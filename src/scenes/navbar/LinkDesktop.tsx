import { SelectedPage } from "@/shared/types"
import AnchorLink from "react-anchor-link-smooth-scroll"

type Props = {
  scrollTo: SelectedPage // The actual target ID for scrolling
  displayText: string // The text shown in the UI
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const LinkDesktop = ({
  scrollTo,
  displayText,
  selectedPage,
  setSelectedPage,
}: Props) => {
  return (
    <AnchorLink
      className={`mt-1 pb-1 px-1 mx-2 border-b-[2px] font-semibold ${
        selectedPage === scrollTo
          ? "border-b-[2px] border-teal-500 text-zinc-700"
          : "text-zinc-700 border-transparent hover:border-teal-500"
      }`}
      href={`#${scrollTo}`} // Now scrolling is based on `scrollTo`
      onClick={() => setSelectedPage(scrollTo)}
    >
      {displayText} {/* Displaying user-friendly text */}
    </AnchorLink>
  )
}

export default LinkDesktop
