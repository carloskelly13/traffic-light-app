"use client"

import { TrafficLight } from "./traffic-light"
import { useTrafficLight } from "../hooks/useTrafficLight"
import { useSession } from "next-auth/react"
import { cn } from "../lib/utils"

export function TrafficLightController() {
  const { lights, loading, toggleLight, startSequence, endSequence } =
    useTrafficLight()
  const { data: session } = useSession()

  const isDisabled = loading || !session

  return (
    <>
      <TrafficLight
        className={cn("w-64 h-auto transition-all", {
          "opacity-20": !session,
        })}
        lights={lights}
        onRedClick={session ? () => toggleLight("red") : undefined}
        onYellowClick={session ? () => toggleLight("yellow") : undefined}
        onGreenClick={session ? () => toggleLight("green") : undefined}
        disabled={isDisabled}
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={startSequence}
          disabled={isDisabled}
          className="px-3 py-1 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded border border-gray-300"
        >
          Start Sequence
        </button>
        <button
          onClick={endSequence}
          disabled={isDisabled}
          className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded border border-gray-300"
        >
          Stop Sequence
        </button>
      </div>

      <div className="h-6 flex items-center justify-center">
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
        )}
        {!session && !loading && (
          <p className="text-sm text-gray-500">
            Sign in to control the traffic light
          </p>
        )}
      </div>
    </>
  )
}
