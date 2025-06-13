import { useEffect, useState } from "react"

const BASE_DOMAIN = "https://d175n77hxdp6z.cloudfront.net"
const FOLDER = "tour-gallery-photos" // always this folder
const PLACEHOLDER = `${BASE_DOMAIN}/${FOLDER}/placeholder.png`
const FALLBACK_EXT = ["jpeg", "png", "webp"] // we try .jpg first

export default function useGetSingleTourImage(imageName: string) {
  const [url, setUrl] = useState<string>(PLACEHOLDER)

  useEffect(() => {
    if (!imageName) return
    let active = true // guard against unmount

    // ── 1. optimistic first paint (.jpg) ──────────────────────────────
    const jpgUrl = `${BASE_DOMAIN}/${FOLDER}/${imageName}.jpg`
    setUrl(jpgUrl)

    // ── 2. validate in background using HEAD ─────────────────────────
    ;(async () => {
      try {
        const head = await fetch(jpgUrl, {
          method: "HEAD",
          cache: "force-cache", // no cache-buster
        })
        if (head.ok || !active) return // .jpg exists → done
      } catch {
        /* fall through */
      }

      // ── 3. walk fallback extensions ────────────────────────────────
      for (const ext of FALLBACK_EXT) {
        if (!active) return
        const candidate = `${BASE_DOMAIN}/${FOLDER}/${imageName}.${ext}`
        try {
          const r = await fetch(candidate, {
            method: "HEAD",
            cache: "force-cache",
          })
          if (r.ok) {
            setUrl(candidate) // found → update
            return
          }
        } catch {
          /* ignore & try next */
        }
      }

      // ── 4. nothing found → placeholder ─────────────────────────────
      active && setUrl(PLACEHOLDER)
    })()

    return () => {
      active = false
    }
  }, [imageName])

  return url
}
