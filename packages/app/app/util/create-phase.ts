import { Phase } from "traffic-light-controller"

const defaultReset = [
  { action: "signal", context: { pin: "green", value: 1 } },
  { action: "signal", context: { pin: "yellow", value: 1 } },
  { action: "signal", context: { pin: "red", value: 1 } },
] satisfies Phase[]

export const createPhase = (phases: Phase[]) => {
  return [...defaultReset, ...phases]
}
