import { type BinaryValue, delay, gpioPins } from "./gpio"

export type Pin = "green" | "yellow" | "red"

export type Phase =
  | {
      action: "signal"
      context: { pin: Pin; value: BinaryValue }
    }
  | {
      action: "pause"
      context: { duration: number }
    }

export const runPhase = async (phases: Phase[]) => {
  for await (const phase of phases) {
    switch (phase.action) {
      case "pause":
        await delay(phase.context.duration)
        break
      case "signal":
        const pinLabel = phase.context.pin + "Pin"
        Object.keys(gpioPins).includes(pinLabel) &&
          (await gpioPins[pinLabel].write(phase.context.value))
    }
  }
}
