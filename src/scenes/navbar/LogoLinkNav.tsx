import { Link } from "react-router-dom"
import AnchorLink from "react-anchor-link-smooth-scroll"
import LogoIcon from "@/assets/logoMainDark.png"

const LogoLink: React.FC = () => {
  const isHomePage = window.location.pathname === "/"
  const lowerCasePage = "home"

  const LogoImage: React.FC = () => (
    <img src={LogoIcon} alt="Logo Main" className="h-15 " />
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

export default LogoLink
