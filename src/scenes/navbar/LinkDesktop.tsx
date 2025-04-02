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
          ? "border-b-[2px] border-neutral-300 text-neutral-800"
          : "text-zinc-800 border-transparent hover:border-neutral-300"
      }`}
      href={`#${scrollTo}`} // Now scrolling is based on `scrollTo`
      onClick={() => setSelectedPage(scrollTo)}
    >
      {displayText} {/* Displaying user-friendly text */}
    </AnchorLink>
  )
}

export default LinkDesktop
