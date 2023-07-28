import { NextApiRequest, NextApiResponse } from "next"
import { Server } from "socket.io"
import type { Server as NetServer } from "http"
import type { Socket } from "net"

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: Server
    }
  }
}

type Handler = (req: NextApiRequest, res: NextApiResponseServerIO) => void

export const config = {
  api: {
    bodyParser: false,
  },
}

const SocketHandler: Handler = async (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new Server(<NetServer>res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    })
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler
