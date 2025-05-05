import { useState } from "react"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import { userPool } from "@/auth/userPool" // make sure this file exists
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import LogoIcon from "@/assets/logoMainIcon.png"

const LoginPortal = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    user.authenticateUser(authDetails, {
      onSuccess: session => {
        console.log("Login success!", session)
        const idToken = session.getIdToken().getJwtToken()
        localStorage.setItem("cognito_id_token", idToken)
        window.location.href = "/admin"
      },

      onFailure: err => {
        console.error("Login error", err)
        setError(err.message || "Login failed")
        setLoading(false)
      },

      newPasswordRequired: userAttributes => {
        console.log("New password required", userAttributes)

        // 👇 set the new password — for demo, we just reuse what they typed
        user.completeNewPasswordChallenge(
          password,
          {},
          {
            onSuccess: session => {
              console.log("Password changed & login success!", session)
              const idToken = session.getIdToken().getJwtToken()
              localStorage.setItem("cognito_id_token", idToken)
              window.location.href = "/admin"
            },
            onFailure: err => {
              console.error("Password change failed", err)
              setError(err.message || "Password change failed")
              setLoading(false)
            },
          }
        )
      },
    })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center justify-center gap-1">
          <img src={LogoIcon} alt="" className="h-18" />
          <AdjustmentsHorizontalIcon className="h-10 text-teal-550 " />
        </div>

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Admin Dashboard
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5  font-semibold text-white shadow-xs hover:bg-teal-550 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 hover:cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPortal
