import type { BinaryValue, Direction } from "onoff"
import picocolors from "picocolors"

export class MockGpio {
  value: BinaryValue = 0
  pin: number

  constructor(pin: number, direction: Direction) {
    this.pin = pin
  }

  async write(value: BinaryValue) {
    this.value = value
    console.log(
      picocolors.blue(
        picocolors.bold(
          `Pin ${this.pin} signalled ${value === 0 ? "HIGH" : "LOW"}.`,
        ),
      ),
    )
    return Promise.resolve()
  }

  readSync(): BinaryValue {
    return this.value
  }

  unexport() {}
}
