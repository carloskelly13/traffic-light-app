import React from "react"
import type { PageContext } from "./types"
import type { PageContextBuiltInClientWithServerRouting } from "vite-plugin-ssr/types"
import { hydrateRoot } from "react-dom/client"

async function render(
  pageContext: PageContextBuiltInClientWithServerRouting & PageContext,
) {
  const { Page, pageProps } = pageContext

  const container = document.getElementById("app")
  hydrateRoot(container!, <Page {...pageProps} />)
}

export { render }
