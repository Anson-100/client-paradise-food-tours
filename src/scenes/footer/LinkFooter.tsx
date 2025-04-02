import { SelectedPage } from "@/shared/types"
import AnchorLink from "react-anchor-link-smooth-scroll"

type Props = {
  scrollTo: SelectedPage // The actual section/page to scroll to
  displayText: string // The text shown in the UI
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const LinkFooter = ({
  scrollTo,
  displayText,
  selectedPage,
  setSelectedPage,
}: Props) => {
  return (
    <AnchorLink
      className={`text-gray-200 ${
        selectedPage === scrollTo ? "" : "hover:underline "
      }`}
      href={`#${scrollTo}`} // Now scrolling is based on `scrollTo`
      onClick={() => setSelectedPage(scrollTo)}
    >
      {displayText} {/* Display the proper link text */}
    </AnchorLink>
  )
}

export default LinkFooter
