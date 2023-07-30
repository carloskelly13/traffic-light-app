import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { name } = request.query
  return response.end(`Hello ${name}!`)
}
