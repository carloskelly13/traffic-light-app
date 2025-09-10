import { auth } from "./auth"

export default auth((req) => {
  // Add any middleware logic here if needed
})

export const config = {
  matcher: [
    // Protect the main page and API routes (except auth routes)
    "/",
    "/api/signal/:path*"
  ]
}