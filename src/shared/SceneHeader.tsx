import React from "react"

type Props = {
  sceneTitle: string
  tagline: string
  children?: React.ReactNode
}

const SceneHeader = ({ sceneTitle, tagline, children }: Props) => {
  return (
    <div className="flex flex-col gap-2 pt-24 xl:pt-30">
      <h3 className="font-semibold tracking-tight text-zinc-600">
        {sceneTitle}
      </h3>
      <h2 className="text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl">
        {tagline}
      </h2>
      {children}
    </div>
  )
}

export default SceneHeader
