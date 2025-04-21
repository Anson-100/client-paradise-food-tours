import { Link } from "react-router-dom"
import AnchorLink from "react-anchor-link-smooth-scroll"
import LogoLight from "@/assets/logoMainLight.png"

const LogoLinkFooter: React.FC = () => {
  const isHomePage = window.location.pathname === "/"
  const lowerCasePage = "home"

  const LogoImage: React.FC = () => (
    <img src={LogoLight} alt="Logo Main" className="h-28 md:h-44 py-2" />
  )

  return isHomePage ? (
    // Smooth scroll anchor link for home page
    <AnchorLink href={`#${lowerCasePage}`}>
      <LogoImage />
    </AnchorLink>
  ) : (
    // Regular Link component for other pages
    <Link
      to="/"
      onClick={() => {
        sessionStorage.setItem("selectedPage", lowerCasePage)
      }}
    >
      <LogoImage />
    </Link>
  )
}

export default LogoLinkFooter
