import { useEffect, useState } from "react"

const BASE_DOMAIN = "https://d175n77hxdp6z.cloudfront.net"
const PLACEHOLDER = `${BASE_DOMAIN}/landing-photos/placeholder.png`
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"]

const resolveFolder = (): string => {
  if (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/tours")
  ) {
    return "tour-gallery-photos"
  }
  return "landing-photos"
}

const useGetCloudImage = (imageName: string) => {
  const [image, setImage] = useState<string>(PLACEHOLDER)

  useEffect(() => {
    const fetchImage = async () => {
      const folder = resolveFolder()
      const cacheBuster = `?v=${Date.now()}`

      for (const ext of EXTENSIONS) {
        const url = `${BASE_DOMAIN}/${folder}/${imageName}.${ext}${cacheBuster}`
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

export default useGetCloudImage
