import { exec } from "node:child_process"

export const HIGH = 0
export const LOW = 1
export type BinaryValue = typeof HIGH | typeof LOW

export enum ColorPin {
  Red = 26,
  Yellow = 20,
  Green = 21,
}

const execPromise = (command: string) =>
  new Promise(resolve => exec(command, resolve))

export class GpioPin {
  private readonly pinId: number
  constructor(pinId: number) {
    this.pinId = pinId
  }

  async write(value: BinaryValue) {
    const signal = value === 0 ? "dl" : "dh"
    return execPromise(`pinctrl set ${this.pinId} op pn ${signal}`)
  }
}

export const gpioPins = {
  redPin: new GpioPin(ColorPin.Red),
  yellowPin: new GpioPin(ColorPin.Yellow),
  greenPin: new GpioPin(ColorPin.Green),
} as const

export const allPins = Object.values(ColorPin)
  .filter(value => typeof value === "number")
  .join(",")

export const resetPins = async () =>
  execPromise(`pinctrl set ${allPins} op pn dh`)

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))
