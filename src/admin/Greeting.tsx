import { useState, useEffect } from "react"

type Props = {
  name: string
}

const Greeting = ({ name }: Props) => {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date()
      const hours = now.getHours()

      if (hours < 12) {
        setGreeting(`Good morning, ${name}`)
      } else if (hours < 18) {
        setGreeting(`Good afternoon, ${name}`)
      } else {
        setGreeting(`Good evening, ${name}`)
      }
    }

    getGreeting()
    const interval = setInterval(getGreeting, 60000)
    return () => clearInterval(interval)
  }, [name])

  return (
    <p className="text-base font-semibold text-zinc-600 tracking-tight ">
      {greeting}
    </p>
  )
}

export default Greeting
