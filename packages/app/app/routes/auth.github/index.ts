import { json, type ActionArgs, redirect } from "@remix-run/node"
import { OAUTH2_SCOPE, githubOAuth2Client } from "../../util/github-oauth-client"
import { verifyAuth } from "../../util/verify-auth"

export const action = async ({ request }: ActionArgs) => {
  return json({ message: "Method not allowed." }, 405)
}

export const loader = async ({ request }: ActionArgs) => {
  if (await verifyAuth(request)) {
    return redirect("/", { status: 302 })
  }

  const url = githubOAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: OAUTH2_SCOPE,
  })
  return redirect(url)
}
