import { createCookieSessionStorage } from "@remix-run/node"

const sessionSecret = process.env.SESSION_SECRET

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secure: process.env.NODE_ENV === "production",
      secrets: [<string>sessionSecret],
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  })
