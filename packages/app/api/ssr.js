const { renderPage } = require('vite-plugin-ssr')

async function handler(req, res) {
  const { url } = req
  if (url === undefined) throw new Error("req.url is undefined")

  const pageContextInit = { url }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext

  if (!httpResponse) {
    res.statusCode = 200
    res.end()
    return
  }

  const { body, statusCode, contentType } = httpResponse
  res.statusCode = statusCode
  res.setHeader("content-type", contentType)
  res.end(body)
}

module.exports = handler
