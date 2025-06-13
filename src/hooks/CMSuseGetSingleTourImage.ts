import { useEffect, useState } from "react"

const BASE_URL = "https://d175n77hxdp6z.cloudfront.net/tour-gallery-photos"
const PLACEHOLDER = `${BASE_URL}/placeholder.png`
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"]

const useGetSingleTourImage = (imageName: string) => {
  const [image, setImage] = useState<string>(PLACEHOLDER)

  useEffect(() => {
    const fetchImage = async () => {
      const cacheBuster = `?v=${Date.now()}`

      for (const ext of EXTENSIONS) {
        const url = `${BASE_URL}/${imageName}.${ext}${cacheBuster}`
        try {
          const res = await fetch(url, { method: "GET" })
          if (res.ok) {
            setImage(url)
            return
          }
        } catch (_) {
          // continue to next extension
        }
      }

      setImage(PLACEHOLDER)
    }

    if (imageName) fetchImage()
  }, [imageName])

  return image
}

export default useGetSingleTourImage
