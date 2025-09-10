import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// Define allowed email addresses from environment variable or fallback to hardcoded list
const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS 
  ? process.env.ALLOWED_EMAILS.split(",").map(email => email.trim())
  : [
      "carloskelly13@gmail.com",
      // Add more emails here as needed
    ]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user's email is in the allowed list
      if (user.email && ALLOWED_EMAILS.includes(user.email)) {
        return true
      }
      
      // Reject sign-in if email is not allowed
      return false
    },
    async session({ session, user }) {
      // Optional: Add additional session data
      return session
    },
  },
})