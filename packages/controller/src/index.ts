import dotenv from "dotenv"
import Pusher from "pusher-js"
import express from "express"
import pico from "picocolors"
import { resetPins } from "./gpio"
import { runPhase } from "./phase"
import { logError } from "./error-handler"
import { Phase, PhaseSchema } from "./types"

dotenv.config()

const app = express()
const { PUSHER_KEY, PUSHER_CLUSTER, PORT = 8080 } = process.env
const pusher = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER })

app.listen(PORT, async () => {
  console.log(
    pico.green(pico.bold(`Started Traffic Light Controller on port ${PORT}.`)),
  )
  try {
    await resetPins()
    const channel = pusher.subscribe("traffic-light-channel")
    channel.bind("signal", async (data: Record<string, unknown>) => {
      if (!Array.isArray(data.phases)) {
        return
      }
      for (const phase of data.phases) {
        const { success, data } = PhaseSchema.safeParse(phase)
        if (success) {
          await runPhase(data)
        }
      }
    })
  } catch (error) {
    logError(error)
  }
})
