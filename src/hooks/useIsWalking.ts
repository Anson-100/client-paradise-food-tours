// /src/hooks/useIsWalking.ts
import useGetSceneContent from "@/hooks/useGetSceneContent"

const canon = (s?: string) => (s ?? "").trim().toLowerCase()

const useIsWalking = (slug?: string) => {
  // *** use the actual lowercase file name ***
  const { content } = useGetSceneContent("sectionone")

  if (!slug || !content?.tours) return false

  const match = content.tours.find(
    (t: { slug: string; isWalking: boolean }) => canon(t.slug) === canon(slug)
  )

  const walking = !!match?.isWalking

  console.log("useIsWalking →", { slug, match, walking }) // will now appear

  return walking
}

export default useIsWalking
