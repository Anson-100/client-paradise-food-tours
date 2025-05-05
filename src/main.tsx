import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from "react-oidc-context"

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ZBCSeIxXM",
  client_id: "1tlf6j2d4dfvq991spaiva9eqm",
  redirect_uri: "https://d3ek7orpdupfw8.cloudfront.net/admin", // or use http://localhost:5173/admin during dev
  response_type: "code",
  scope: "openid email phone", // reordered for clarity
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
