import { json, type ActionArgs, redirect } from "@remix-run/node"
import { oauth2Client } from "../../util/google-oauth-client"
import { getSession, commitSession } from "../../util/cookie-session"

export const action = async ({ request }: ActionArgs) => {
  return json({ message: "Method not allowed." }, 405)
}

export const loader = async ({ request }: ActionArgs) => {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code) return { status: 400, body: "Invalid request" }

  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)

  let session = await getSession(request.headers.get("Cookie"))
  session.set("authTokens", tokens)

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}
