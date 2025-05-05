// src/lib/analytics.ts
export const pageview = (path: string) => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: path,
      send_to: import.meta.env.VITE_GA_ID, // set this in .env
      debug_mode: true, // keeps it in DebugView
    })
  }
}
