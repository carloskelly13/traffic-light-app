import type { ActionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import Pusher from "pusher"
import { verifyApiToken } from "~/util/verify-api-token"
import { type Phase } from "traffic-light-controller"

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env

const pusher = new Pusher({
  appId: PUSHER_APP_ID || "",
  key: PUSHER_KEY || "",
  secret: PUSHER_SECRET || "",
  cluster: PUSHER_CLUSTER || "",
  useTLS: true,
})

const handlePOST = async (request: Request) => {
  const payload = <Record<string, Phase[]>>await request.json()

  if (!verifyApiToken(request)) return json({ message: "Unauthorized" }, 401)
  if (!Array.isArray(payload.phases))
    return json({ message: "Invalid request" }, 400)

  try {
    const response = await pusher.trigger("traffic-light-channel", "signal", {
      phases: payload.phases,
    })
    if (response.ok) return json(response.statusText, 200)
    return json({ message: response.statusText }, 500)
  } catch (err) {
    console.log(err)
    return json({ message: err }, 500)
  }
}

export const loader = async () => json({ message: "Method not allowed." }, 405)

export const action = async ({ request }: ActionArgs) => {
  if (request.method === "POST") return handlePOST(request)
  return json({ message: "Method not allowed." }, 405)
}
