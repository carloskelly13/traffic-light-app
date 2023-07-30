import { MockGpio } from "./mock-gpio"
import type { Gpio } from "onoff"

export const HIGH = 0
export const LOW = 1
const GpioClass =
  process.platform === "linux" ? require("onoff").Gpio : MockGpio

const redPin: Gpio = new GpioClass(26, "out")
const yellowPin: Gpio = new GpioClass(20, "out")
const greenPin: Gpio = new GpioClass(21, "out")

export const gpioPins = { redPin, yellowPin, greenPin } as const

export const resetPins = () =>
  Promise.allSettled([
    redPin.write(LOW),
    yellowPin.write(LOW),
    greenPin.write(LOW),
  ])

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

process.on("SIGINT", () => {
  redPin?.unexport()
  yellowPin?.unexport()
  greenPin?.unexport()
})
