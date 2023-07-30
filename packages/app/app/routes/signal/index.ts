import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import Pusher from "pusher"
import { verifyApiToken } from "~/util/verify-api-token"

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env

const pusher = new Pusher({
  appId: PUSHER_APP_ID || "",
  key: PUSHER_KEY || "",
  secret: PUSHER_SECRET || "",
  cluster: PUSHER_CLUSTER || "",
  useTLS: true,
})

export const loader = async ({ request }: LoaderArgs) => {
  if (!verifyApiToken(request)) throw json({ message: "Unauthorized" }, 401)

  try {
    const response = await pusher.trigger("traffic-light-channel", "signal", {
      message: "hello world",
    })
    if (response.ok) return json(response.statusText, 200)
    throw json({ message: response.statusText }, 500)
  } catch (e) {
    throw json({ message: "Failed to send signal message." }, 500)
  }
}
