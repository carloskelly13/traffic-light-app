import express, { Express } from "express"
import { renderPage } from "vite-plugin-ssr/server"
import { createServer } from "vite"

const root = `${__dirname}/..`
const isProduction = process.env.NODE_ENV === "production"

const app: Express = express()

async function startServer() {
  let viteDevServer

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    viteDevServer = await createServer({
      root,
      server: { middlewareMode: true },
    })
    app.use(viteDevServer.middlewares)
  }

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

export default app
