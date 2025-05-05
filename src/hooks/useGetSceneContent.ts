import { useEffect, useState } from "react"

const BASE_URL = "https://d175n77hxdp6z.cloudfront.net/landing-json-file"

const useGetSceneContent = (filename: string) => {
  const [content, setContent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!filename) return

    const fetchContent = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/${filename}.json?v=${Date.now()}`)
        if (!res.ok) throw new Error("Failed to fetch content")
        const data = await res.json()
        setContent(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
        setContent(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [filename])

  return { content, isLoading, error }
}

export default useGetSceneContent
