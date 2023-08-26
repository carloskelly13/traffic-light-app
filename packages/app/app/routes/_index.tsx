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

  const handleRedButtonPressed = useCallback(
    async (pin?: Pin) => {
      if (isDisabled) return
      try {
        await fetch("signal", {
          headers: {
            "api-access-token": accessToken,
          },
          method: "POST",
          body: JSON.stringify({
            phases: createPhase(
              pin ? [{ action: "signal", context: { pin, value: 0 } }] : [],
            ),
          }),
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
        handleRedSelected={() => handleRedButtonPressed("red")}
        handleYellowSelected={() => handleRedButtonPressed("yellow")}
        handleGreenSelected={() => handleRedButtonPressed("green")}
        className="w-32 my-10"
      />
      <button
        className="border-2 border-slate-800 text-slate-400 cursor-not-allowed enabled:cursor-pointer enabled:text-black bg-slate-200 enabled:hover:bg-blue-600 enabled:hover:text-white px-4 py-1 rounded mb-4"
        onClick={() => handleRedButtonPressed()}
        disabled={isDisabled}
      >
        Turn Traffic Light Off
      </button>
      <input
        className="border-2 border-slate-800 px-4 py-1 rounded w-1/3 font-mono"
        type="text"
        placeholder="Access Token"
        value={accessToken}
        onChange={event => setAccessToken(event.currentTarget.value)}
      />
    </div>
  )
}
