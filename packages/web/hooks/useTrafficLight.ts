"use client"

import { useState } from "react"

type LightState = {
  red: boolean
  yellow: boolean
  green: boolean
}

type UseTrafficLightReturn = {
  lights: LightState
  loading: boolean
  toggleLight: (pin: "red" | "yellow" | "green") => Promise<void>
  sendSignal: (pin: "red" | "yellow" | "green", value: 0 | 1) => Promise<void>
  startSequence: () => Promise<void>
  endSequence: () => Promise<void>
}

export const useTrafficLight = (): UseTrafficLightReturn => {
  const [lights, setLights] = useState<LightState>({
    red: false,
    yellow: false,
    green: false,
  })
  const [loading, setLoading] = useState(false)

  const sendSignal = async (pin: "red" | "yellow" | "green", value: 0 | 1) => {
    const previousState = lights[pin]
    setLights(prev => ({
      ...prev,
      [pin]: value === 1,
    }))

    setLoading(true)
    try {
      const response = await fetch("/api/signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phases: [
            {
              action: "signal",
              context: {
                pin,
                value,
              },
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send signal")
      }

      // Success - optimistic update was correct, nothing to do
    } catch (error) {
      console.error("Error sending signal:", error)

      // Revert the optimistic update on failure
      setLights(prev => ({
        ...prev,
        [pin]: previousState,
      }))

      throw error
    } finally {
      setLoading(false)
    }
  }

  const toggleLight = async (pin: "red" | "yellow" | "green") => {
    const currentValue = lights[pin]
    const newValue = currentValue ? 1 : 0  // if on -> send 1 (OFF), if off -> send 0 (ON)
    await sendSignal(pin, newValue)
  }

  const startSequence = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phases: [
            {
              action: "start-sequence",
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to start sequence")
      }
    } catch (error) {
      console.error("Error starting sequence:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const endSequence = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phases: [
            {
              action: "end-sequence",
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to end sequence")
      }
    } catch (error) {
      console.error("Error ending sequence:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    lights,
    loading,
    toggleLight,
    sendSignal,
    startSequence,
    endSequence,
  }
}
