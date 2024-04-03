import { OAuth2Client } from "github-auth-library"

const {
  GITHUB_CLIENT_ID, 
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
  GITHUB_OAUTH_SCOPE,
} = process.env

export const OAUTH2_SCOPE = <string>GITHUB_OAUTH_SCOPE

export const githubOAuth2Client = new OAuth2Client({
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  redirectUri: GITHUB_REDIRECT_URI,
})


