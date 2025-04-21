import { useEffect, useState } from "react"

const BASE_URL = "https://d175n77hxdp6z.cloudfront.net/tour-gallery-photos"
const PLACEHOLDER = `${BASE_URL}/placeholder.png`
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"]

const useGetTourPhotos = (imageNames: string[]) => {
  const [images, setImages] = useState<string[]>(() =>
    imageNames.map(() => PLACEHOLDER)
  )

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(
        imageNames.map(async imageName => {
          const cacheBuster = `?v=${Date.now()}`

          for (const ext of EXTENSIONS) {
            const url = `${BASE_URL}/${imageName}.${ext}${cacheBuster}`
            try {
              const res = await fetch(url, { method: "GET" })
              if (res.ok) return url
            } catch (_) {
              // try next extension
            }
          }

          return PLACEHOLDER
        })
      )

      setImages(urls)
    }

    fetchImages()
  }, [JSON.stringify(imageNames)])

  return images
}

export default useGetTourPhotos
