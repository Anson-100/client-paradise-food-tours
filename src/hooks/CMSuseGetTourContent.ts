import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export type TourContent = {
  slug: string
  name: string
  title: string
  heroText: string
  ctaLine: string
  about: string[]
  details: {
    name: string
    value: string
  }[]
  included: {
    value: string
    name: string
  }[]
  testimonial: {
    quote: string
    name: string
    role: string
    avatar: string
  }
  duration: string
  stops: number
  guests: string
  cost: string
  galleryImages: string[]
  bannerImage: string
  peekUrl: string
  aboutText: { col1: string; col2: string }
  aboutPhoto?: string
}

const useGetTourContent = (providedSlug?: string) => {
  const params = useParams()
  const slug = providedSlug ?? params.slug
  const [tour, setTour] = useState<
    | (TourContent & {
        testimonial: TourContent["testimonial"] & { ratingIcon?: any }
      })
    | null
  >(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const loadContent = async () => {
      setIsLoading(true)
      try {
        const url = `https://d175n77hxdp6z.cloudfront.net/tour-json-file/${slug}.json?v=${Date.now()}`
        const res = await fetch(url)
        if (!res.ok) throw new Error("Failed to load tour content")
        const json: TourContent = await res.json()

        const merged = {
          ...json,
          testimonial: {
            ...json.testimonial,
          },
        }

        setTour(merged)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [slug])

  return { tour, isLoading, error }
}

export default useGetTourContent
