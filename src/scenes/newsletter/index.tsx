import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Newsletter.tsx  – replace handleSubmit

  // Replace your handleSubmit with this
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(
        "https://pq6sx039ia.execute-api.us-east-2.amazonaws.com/dev/newsletter-subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      )

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || `Status ${res.status}`)
      }

      setSubmitted(true)
      setEmail("")
    } catch (err: any) {
      setError(err.message || "Failed to subscribe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="sectiontwo" className="relative isolate overflow-hidden">
      <div className="overflow-hidden relative isolate">
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-zinc-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
              <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Discover new flavors before anyone else!
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-center text-gray-200">
                Join our email list and be the first to know when new tours
                launch, limited seats open, or exclusive events pop up in Naples
                & Bonita.
              </p>
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 flex max-w-md gap-x-4"
              >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="min-w-0 flex-auto rounded-md bg-zinc-900/90 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white "
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-none rounded-md bg-yellow-500 px-3.5 py-2.5 text-md font-semibold text-gray-900 shadow-xs hover:cursor-pointer hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Notify me"}
                </button>
              </form>

              {submitted && (
                <p className="mt-4 text-center text-green-400">
                  You're on the list!
                </p>
              )}
              {error && (
                <p className="mt-4 text-center text-red-400">Error: {error}</p>
              )}

              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient
                    r={1}
                    cx={0}
                    cy={0}
                    id="759c1415-0410-454c-8f7c-9a820de03641"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(512 512) rotate(90) scale(512)"
                  >
                    <stop stopColor="#00858e" />
                    <stop offset={1} stopColor="#00858e" stopOpacity={0} />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
