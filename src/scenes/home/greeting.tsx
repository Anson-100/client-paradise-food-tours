import { useState, useEffect } from "react"

const Greeting = () => {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date()
      const hours = now.getHours() // Local time zone is automatically used

      if (hours < 12) {
        setGreeting("Good morning, welcome to Paradise Food Tours")
      } else if (hours < 18) {
        setGreeting("Good afternoon, welcome to Paradise Food Tours")
      } else {
        setGreeting("Good evening, welcome to Paradise Food Tours")
      }
    }

    getGreeting() // Call on component load

    // Optional: Update the greeting every minute (live update)
    const interval = setInterval(getGreeting, 60000)
    return () => clearInterval(interval) // Clean up on unmount
  }, [])

  return (
    <p className="text-base font-semibold text-zinc-600 tracking-tight ">
      {greeting}
    </p>
  )
}

export default Greeting
