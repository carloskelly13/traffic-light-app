import { OAuth2Client } from "google-auth-library"

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_OAUTH_SCOPE,
} = process.env

export const OAUTH2_SCOPE = <string>GOOGLE_OAUTH_SCOPE

export const oauth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
)
