import { TrafficLight } from "../components/traffic-light"
import { Action, Pin, SignalRequest } from "traffic-light-controller/types"
import { createSignal } from "solid-js"
import { sendSignalRequest } from "../lib/signal"

export default function Home() {
  const [isPending, setIsPending] = createSignal(false)
  const [apiToken, setApiToken] = createSignal("")

  const sendSignalApi = async (signalRequest: SignalRequest) => {
    setIsPending(true)
    try {
      await sendSignalRequest({ signalRequest, apiToken: apiToken() })
    } catch (err) {
      console.log(err)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <main class="h-screen w-screen mx-auto flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-xl font-bold">Traffic Light Controller</h1>
        <TrafficLight
          class="h-64"
          handleRedSelected={() =>
            sendSignalApi({ action: Action.signal, pin: Pin.red })
          }
          handleYellowSelected={() =>
            sendSignalApi({ action: Action.signal, pin: Pin.yellow })
          }
          handleGreenSelected={() =>
            sendSignalApi({ action: Action.signal, pin: Pin.green })
          }
          disabled={isPending()}
        />
        <button
          class="px-4 py-1 rounded-md border border-gray-500 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => sendSignalApi({ action: Action.startSequence })}
        >
          Run Auto Sequence
        </button>
        <button
          class="px-4 py-1 rounded-md border border-gray-500 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => sendSignalApi({ action: Action.endSequence })}
        >
          Turn Off
        </button>
        <input
          class="border border-gray-500 dark:border-white rounded-md p-1 bg-transparent w-72"
          type="password"
          placeholder="Password"
          onInput={e => setApiToken(e.currentTarget.value)}
          value={apiToken()}
        />
        <a
          href="https://github.com/carloskelly13/traffic-light-app"
          class="text-blue-600 dark:text-blue-300 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View Source on GitHub
        </a>
      </div>
    </main>
  )
}
