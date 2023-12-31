import { logError } from "./error-handler"
import { resetPins, delay, gpioPins, HIGH, LOW } from "./gpio"

export class LoopController {
  private isRunning = false

  async startLoop({ phaseDuration = 10000, yellowDuration = 3000 } = {}) {
    try {
      await resetPins()
      this.isRunning = true
    } catch (error) {
      logError(error)
      this.isRunning = false
      return
    }

    while (this.isRunning) {
      try {
        await gpioPins.greenPin.write(HIGH)
        await delay(phaseDuration)
        await gpioPins.greenPin.write(LOW)
        await gpioPins.yellowPin.write(HIGH)
        await delay(yellowDuration)
        await gpioPins.yellowPin.write(LOW)
        await gpioPins.redPin.write(HIGH)
        await delay(phaseDuration)
        await gpioPins.redPin.write(LOW)
      } catch (error) {
        logError(error)
        this.isRunning = false
      }
    }
  }

  async stopLoop() {
    this.isRunning = false
    await resetPins()
  }
}
