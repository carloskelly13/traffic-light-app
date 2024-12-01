import Pusher from "pusher"
import {
  Action,
  Phase,
  Pin,
  SignalRequest,
} from "traffic-light-controller/types"

const defaultReset: Phase[] = [
  { action: Action.signal, context: { pin: Pin.green, value: 1 } },
  { action: Action.signal, context: { pin: Pin.yellow, value: 1 } },
  { action: Action.signal, context: { pin: Pin.red, value: 1 } },
]

const createPhase = (phases: Phase[]) => {
  return [...defaultReset, ...phases]
}

export async function sendSignalRequest({
  signalRequest: { action, pin, duration },
  apiToken,
}: {
  signalRequest: SignalRequest
  apiToken: string
}) {
  "use server"
  try {
    if (apiToken !== process.env.API_ACCESS_TOKEN) {
      throw new Error("Invalid API Token")
    }
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID ?? "",
      key: process.env.PUSHER_KEY ?? "",
      secret: process.env.PUSHER_SECRET ?? "",
      cluster: process.env.PUSHER_CLUSTER ?? "",
      useTLS: true,
    })

    let payload: { phases: Phase[] } = { phases: [] }

    switch (action) {
      case Action.signal:
        payload = {
          phases: createPhase(
            pin ? [{ action: Action.signal, context: { pin, value: 0 } }] : [],
          ),
        }
        break
      case Action.pause:
        payload = {
          phases: [
            { action: Action.pause, context: { duration: duration ?? 1000 } },
          ],
        }
        break
      case Action.startSequence:
        payload = { phases: [{ action: Action.startSequence }] }
        break
      case Action.endSequence:
        payload = { phases: [{ action: Action.endSequence }] }
        break
    }

    await pusher.trigger("traffic-light-channel", "signal", payload)
  } catch (err) {
    console.error(err)
  }
}
