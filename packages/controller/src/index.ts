// import { Gpio } from "onoff"
import io, { Socket } from "socket.io-client"

let socket: Socket

// const redPin = new Gpio(26, "out")
// const yellowPin = new Gpio(20, "out")
// const greenPin = new Gpio(21, "out")

const CLOSED = 0
const OPEN = 1

const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

// const reset = () =>
//   Promise.allSettled([
//     greenPin.write(OPEN),
//     yellowPin.write(OPEN),
//     redPin.write(OPEN),
//   ])

const main = async () => {
  await fetch("http://localhost:3000/api/socket")

  socket = io("http://localhost:3000", {
    transports: ["websocket"],
    path: "/api/socket",
    addTrailingSlash: false,
  })

  socket.on("connect", () => {
    console.log("connected")
  })

  socket.on("connect_error", err => {
    console.log(`connect_error due to ${err.message}`)
  })

  // try {
  //   await reset()
  //   await greenPin.write(CLOSED)
  //   await delay(3000)
  //   await greenPin.write(OPEN)
  // } catch (e) {
  //   console.error(e)
  // }
}

// process.on("SIGINT", () => {
//   redPin.unexport()
//   yellowPin.unexport()
//   greenPin.unexport()
// })

main()
