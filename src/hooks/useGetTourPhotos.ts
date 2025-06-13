import { useEffect, useState } from "react"

const BASE_URL = "https://d175n77hxdp6z.cloudfront.net/tour-gallery-photos"
const PLACEHOLDER = `${BASE_URL}/placeholder2.png`
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] // order of fall-backs

/**
 * Returns an array of fully-resolved image URLs (one per `imageNames` entry).
 * – Paints an optimistic “.jpg” immediately so the UI doesn’t flash a placeholder.
 * – Uses HEAD + `cache:"no-cache"` so the browser re-validates once with CloudFront
 *   (gets new bytes if the object changed, otherwise serves cache). No Date.now().
 */
export default function useGetTourPhotos(imageNames: string[]) {
  // optimistic defaults (so components render instantly)
  const [images, setImages] = useState<string[]>(() =>
    imageNames.map(name => `${BASE_URL}/${name}.jpg`)
  )

  useEffect(() => {
    let alive = true

    const load = async () => {
      const urls = await Promise.all(
        imageNames.map(async (imageName, _idx) => {
          // --- 1. try optimistic   /name.jpg  -------------------------------
          const jpg = `${BASE_URL}/${imageName}.jpg`
          try {
            const head = await fetch(jpg, { method: "HEAD", cache: "no-cache" })
            if (head.ok) return jpg // up-to-date (or 304)
          } catch {
            /* fall through to other extensions */
          }

          // --- 2. fall back through the other extensions --------------------
          for (const ext of EXTENSIONS) {
            const candidate = `${BASE_URL}/${imageName}.${ext}`
            try {
              const head = await fetch(candidate, {
                method: "HEAD",
                cache: "no-cache",
              })
              if (head.ok) return candidate
            } catch {
              /* try next */
            }
          }

          // --- 3. nothing worked – placeholder ------------------------------
          return PLACEHOLDER
        })
      )

      if (alive) setImages(urls)
    }

    load()
    return () => {
      alive = false
    }
    // stringify keeps dep array stable when list content/order doesn’t change
  }, [JSON.stringify(imageNames)])

  return images
}
