import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import Pusher from "pusher"
import { verifyApiToken } from "~/util/verify-api-token"
import { Phase } from "traffic-light-controller"

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env

const pusher = new Pusher({
  appId: PUSHER_APP_ID || "",
  key: PUSHER_KEY || "",
  secret: PUSHER_SECRET || "",
  cluster: PUSHER_CLUSTER || "",
  useTLS: true,
})

const handlePOST = async (request: Request) => {
  if (!verifyApiToken(request)) return json({ message: "Unauthorized" }, 401)

  try {
    const response = await pusher.trigger("traffic-light-channel", "signal", {
      phases: [
        {
          action: "signal",
          context: { pin: "green", value: 0 },
        },
        { action: "pause", context: { duration: 3000 } },
        { action: "signal", context: { pin: "green", value: 1 } },
      ] satisfies Phase[],
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
