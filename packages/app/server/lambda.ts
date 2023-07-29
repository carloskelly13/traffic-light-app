import serverless from "serverless-http"
import express from "express"
import { renderPage } from "vite-plugin-ssr/server"
import { createServer } from "vite"

const app = express()
const root = `${__dirname}/..`
app.use(express.static(`${root}/dist/client`))

app.get("*", async (req, res, next) => {
  const pageContextInit = {
    urlOriginal: req.originalUrl,
  }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  if (!httpResponse) {
    return next()
  }
  res.status(httpResponse.statusCode).send(httpResponse.body)
})

export const handler = serverless(app)
