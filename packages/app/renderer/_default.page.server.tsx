import ReactDOMServer from "react-dom/server"
import React from "react"
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server"
import type { PageContextBuiltIn } from "vite-plugin-ssr/types"
import { PageContext } from "./types"

export const passToClient = ["pageProps", "urlPathname"]

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { Page } = pageContext

  const pageHtml = ReactDOMServer.renderToString(<Page />)
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || "Carlos SSR Vite App"

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Description Goes Here!!" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return { documentHtml, pageContext: {} }
}

export { render }
