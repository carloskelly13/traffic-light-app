import type { V2_MetaFunction } from "@remix-run/node"
import { TrafficLight } from "~/components/traffic-light"
import { useCallback, useEffect, useState } from "react"
import { createPhase } from "~/util/create-phase"
import { Pin } from "traffic-light-controller"

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Traffic Light" },
    { name: "description", content: "Traffic Light Control App" },
  ]
}

export default function Index() {
  const [accessToken, setAccessToken] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    setIsDisabled(!accessToken || accessToken.trim().length === 0)
  }, [accessToken])

  const handleSignalButtonPressed = useCallback(
    async (action: "signal" | "sequence" | "reset", pin?: Pin) => {
      if (isDisabled) return
      try {
        const body = (() => {
          switch (action) {
            case "signal":
              return {
                phases: createPhase(
                  pin ? [{ action: "signal", context: { pin, value: 0 } }] : [],
                ),
              }
            case "sequence":
              return [{ action: "start-sequence" }]
            case "reset":
              return [{ action: "end-sequence" }]
          }
        })()
        await fetch("signal", {
          headers: {
            "api-access-token": accessToken,
          },
          method: "POST",
          body: JSON.stringify(body),
        })
      } catch (e) {
        console.log(e)
      }
    },
    [accessToken, isDisabled],
  )

  return (
    <div className="m-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Traffic Light App</h1>
      <TrafficLight
        disabled={isDisabled}
        handleRedSelected={() => handleSignalButtonPressed("signal", "red")}
        handleYellowSelected={() =>
          handleSignalButtonPressed("signal", "yellow")
        }
        handleGreenSelected={() => handleSignalButtonPressed("signal", "green")}
        className="w-32 my-10"
      />
      <button
        className="border-2 border-slate-800 text-slate-400 cursor-not-allowed enabled:cursor-pointer enabled:text-black bg-slate-200 enabled:hover:bg-blue-600 enabled:hover:text-white px-4 py-1 rounded mb-4"
        onClick={() => handleSignalButtonPressed("sequence")}
        disabled={isDisabled}
      >
        Start Auto-Sequence
      </button>
      <button
        className="border-2 border-slate-800 text-slate-400 cursor-not-allowed enabled:cursor-pointer enabled:text-black bg-slate-200 enabled:hover:bg-blue-600 enabled:hover:text-white px-4 py-1 rounded mb-4"
        onClick={() => handleSignalButtonPressed("reset")}
        disabled={isDisabled}
      >
        Turn Traffic Light Off
      </button>
      <input
        className="border-2 border-slate-800 px-4 py-1 rounded w-11/12 md:w-2/3 lg:w-1/3 font-mono"
        type="text"
        placeholder="Access Token"
        value={accessToken}
        onChange={event => setAccessToken(event.currentTarget.value)}
      />
    </div>
  )
}
