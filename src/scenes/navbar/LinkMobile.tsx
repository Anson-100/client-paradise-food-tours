import { SelectedPage } from "@/shared/types"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { useMemo } from "react"

type Props = {
  scrollTo: SelectedPage // The actual section/page to scroll to
  displayText: string // The text shown in the UI
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
  toggleMenu: () => void
  Icon: React.ComponentType<{ className?: string }>
}

const LinkMobile = ({
  scrollTo,
  displayText,
  selectedPage,
  setSelectedPage,
  toggleMenu,
  Icon,
}: Props) => {
  const handleClick = () => {
    setSelectedPage(scrollTo)
    toggleMenu()
  }

  const PageIcon = useMemo(() => (Icon ? Icon : null), [Icon])

  return (
    <AnchorLink
      className={`font-semibold py-4 px-4 w-full sm:w-5/6 flex items-center hover:text-zinc-600 ${
        selectedPage === scrollTo
          ? "   text-zinc-600"
          : "text-zinc-500  hover:border-zinc-700"
      }`}
      href={`#${scrollTo}`} // Now scrolling is based on `scrollTo`
      onClick={handleClick}
    >
      {PageIcon && <PageIcon className="h-5 mr-4" />}{" "}
      {/* Render icon if provided */}
      {displayText} {/* Display the proper link text */}
    </AnchorLink>
  )
}

export default LinkMobile
