import express from "express"
import { renderPage } from "vite-plugin-ssr/server"
import vite from "vite"
const root = `${__dirname}/..`

async function startServer() {
  const app = express()

  const viteDevServer = await vite.createServer({
    root,
    server: { middlewareMode: true },
  })

  app.use(viteDevServer.middlewares)

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

  const port = process.env.PORT || "3000"
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

startServer()
