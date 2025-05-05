import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
  UserPoolId: "us-east-1_ZBCSeIxXM", // replace if your pool ID is different
  ClientId: "1tlf6j2d4dfvq991spaiva9eqm", // your actual app client ID
}

export const userPool = new CognitoUserPool(poolData)
