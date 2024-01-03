import { exec } from "node:child_process"

export const HIGH = 0
export const LOW = 1
export type BinaryValue = typeof HIGH | typeof LOW

const execPromise = (command: string) =>
  new Promise((resolve, reject) =>
    exec(command, (error, stdout, stderr) => {
      if (error) reject({ error, stderr })
      else resolve(stdout)
    }),
  )

class GpioPin {
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
  redPin: new GpioPin(26),
  yellowPin: new GpioPin(20),
  greenPin: new GpioPin(21),
} as const

export const resetPins = () => execPromise("pinctrl set 26,21,20 op pn dh")

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))
