import { getSession } from "./cookie-session"

export const verifyAuth = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"))
  const authTokens = session.get("authTokens")
  return Boolean(authTokens)
}
