import { Gpio } from "onoff"

const redPin = new Gpio(26, "out")
const yellowPin = new Gpio(20, "out")
const greenPin = new Gpio(21, "out")

/**
 * The GPIO pins on the Raspberry pins take a 0 signal to close the relay on
 * and a 0 signal to open the relay.
 */
const ON = 0
const OFF = 1

const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

const reset = () =>
  Promise.allSettled([
    greenPin.write(OFF),
    yellowPin.write(OFF),
    redPin.write(OFF),
  ])

const main = async () => {
  try {
    await reset()
    await greenPin.write(ON)
    await delay(3000)
  } catch (e) {
    console.error(e)
  }
}

process.on("SIGINT", () => {
  redPin.unexport()
  yellowPin.unexport()
  greenPin.unexport()
})

main()
