import { useEffect, useState } from "react"

const BASE_DOMAIN = "https://d175n77hxdp6z.cloudfront.net"
const PLACEHOLDER = `${BASE_DOMAIN}/landing-photos/placeholder.png`
const EXTENSIONS = ["jpeg", "png", "webp"] // *don’t* include jpg here
const resolveFolder = () =>
  typeof window !== "undefined" && window.location.pathname.startsWith("/tours")
    ? "tour-gallery-photos"
    : "landing-photos"

export default function useGetCloudImage(imageName: string) {
  const [url, setUrl] = useState(PLACEHOLDER)

  useEffect(() => {
    if (!imageName) return
    let active = true

    const folder = resolveFolder()
    const cacheBuster = `?v=${Date.now()}`

    // 1) Immediately assume `.jpg` and let the browser fetch it
    const jpgUrl = `${BASE_DOMAIN}/${folder}/${imageName}.jpg${cacheBuster}`
    setUrl(jpgUrl)

    // 2) In background, HEAD-check .jpg; if 404, try others
    ;(async () => {
      try {
        const res = await fetch(jpgUrl, { method: "HEAD" })
        if (res.ok || !active) return
      } catch {
        /* fall through */
      }

      // .jpg failed — try the others
      for (const ext of EXTENSIONS) {
        if (!active) return
        const candidate = `${BASE_DOMAIN}/${folder}/${imageName}.${ext}${cacheBuster}`
        try {
          const r = await fetch(candidate, { method: "HEAD" })
          if (r.ok) {
            setUrl(candidate)
            return
          }
        } catch {
          /* ignore */
        }
      }

      // all failed → placeholder
      if (active) setUrl(PLACEHOLDER)
    })()

    return () => {
      active = false
    }
  }, [imageName])

  return url
}
