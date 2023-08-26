import dotenv from "dotenv"
import Pusher from "pusher-js"
import express from "express"
import pico from "picocolors"
import { resetPins } from "./gpio"
import { type Phase, type Pin, runPhase } from "./phase"

dotenv.config()

const app = express()
const { PUSHER_KEY, PUSHER_CLUSTER, PORT = 8080 } = process.env
const pusher = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER })

app.listen(PORT, async () => {
  console.log(
    pico.green(pico.bold(`Started Traffic Light Controller on port ${PORT}.`)),
  )
  await resetPins()
  const channel = pusher.subscribe("traffic-light-channel")
  channel.bind("signal", async (data: Record<string, unknown>) => {
    Array.isArray(data.phases) && (await runPhase(data.phases))
  })
})

export type { Phase, Pin }
