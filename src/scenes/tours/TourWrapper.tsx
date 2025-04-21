import { useParams } from "react-router-dom"
import TourLayout from "./TourLayout"

const TourWrapper = () => {
  const { slug } = useParams()
  return <TourLayout key={slug} />
}

export default TourWrapper
