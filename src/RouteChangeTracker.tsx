// src/RouteChangeTracker.tsx
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { pageview } from "./lib/analytics"

export default function RouteChangeTracker() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    pageview(pathname + search)
  }, [pathname, search])

  return null // no UI
}
