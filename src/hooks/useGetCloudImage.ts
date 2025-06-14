import { useEffect, useState } from "react"

const BASE_DOMAIN = "https://d175n77hxdp6z.cloudfront.net"
const PLACEHOLDER = `${BASE_DOMAIN}/landing-photos/placeholder.png`
const EXTENSIONS = ["jpeg", "png", "webp"] // fallback order

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
    const jpgUrl = `${BASE_DOMAIN}/${folder}/${imageName}.jpg` // ← no cache-buster
    setUrl(jpgUrl) // optimistic first paint
    ;(async () => {
      try {
        const res = await fetch(jpgUrl, {
          method: "HEAD",
          cache: "force-cache",
        })
        if (res.ok || !active) return
      } catch {
        /* fall through */
      }

      for (const ext of EXTENSIONS) {
        if (!active) return
        const candidate = `${BASE_DOMAIN}/${folder}/${imageName}.${ext}`
        try {
          const r = await fetch(candidate, {
            method: "HEAD",
            cache: "force-cache",
          })
          if (r.ok) {
            setUrl(candidate)
            return
          }
        } catch {
          /* ignore */
        }
      }

      active && setUrl(PLACEHOLDER)
    })()

    return () => {
      active = false
    }
  }, [imageName])

  return url
}
