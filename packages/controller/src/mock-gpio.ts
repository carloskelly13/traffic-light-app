import type { BinaryValue, Direction } from "onoff"

export class MockGpio {
  value: BinaryValue = 0
  constructor(pin: number, direction: Direction) {}

  async write(value: BinaryValue) {
    this.value = value
    return Promise.resolve()
  }

  readSync(): BinaryValue {
    return this.value
  }

  unexport() {}
}
