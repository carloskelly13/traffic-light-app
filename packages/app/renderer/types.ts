export type PageContext = {
  Page: (pageProps: Record<string, unknown>) => React.ReactElement
  pageProps: Record<string, unknown>
  urlPathname: string
  documentProps?: {
    title?: string
    description?: string
  }
}
