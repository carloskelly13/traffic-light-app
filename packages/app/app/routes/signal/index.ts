import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import Pusher from "pusher"

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env

const pusher = new Pusher({
  appId: PUSHER_APP_ID || "",
  key: PUSHER_KEY || "",
  secret: PUSHER_SECRET || "",
  cluster: PUSHER_CLUSTER || "",
  useTLS: true,
})

export const loader = async ({ request }: LoaderArgs) => {
  try {
    const response = await pusher.trigger("traffic-light-channel", "signal", {
      message: "hello world",
    })
    if (response.ok) return json(response.statusText, 200)
    return json(response.statusText, 500)
  } catch (e) {
    return json("Failed to send signal message.", 500)
  }
}
