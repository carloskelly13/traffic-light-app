import { type BinaryValue, delay, GpioPin, gpioPins } from "./gpio"
import { LoopController } from "./loop-controller"
import { Action, Phase, Pin } from "./types"

const loopController = new LoopController()

export const runPhase = async (phase: Phase) => {
  try {
    console.log(
      `Running phase -> ${JSON.stringify(phase.action)}; Context -> ${JSON.stringify("context" in phase ? phase.context : {})}`,
    )
    switch (phase.action) {
      case Action.pause:
        await delay(phase.context.duration)
        break
      case Action.signal:
        const pinLabel = phase.context.pin + "Pin"
        const pin: GpioPin | undefined =
          gpioPins[pinLabel as keyof typeof gpioPins]
        await pin?.write(phase.context.value as BinaryValue)
        break
      case Action.startSequence:
        await loopController.startLoop()
        break
      case Action.endSequence:
        await loopController.stopLoop()
        break
    }
  } catch (err) {
    console.error("Error running phase -> ", err)
  }
}
