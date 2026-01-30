import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isAuthPage = nextUrl.pathname.startsWith("/login") ||
                nextUrl.pathname.startsWith("/register")
            const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard") ||
                nextUrl.pathname.startsWith("/clients") ||
                nextUrl.pathname.startsWith("/filings") ||
                nextUrl.pathname.startsWith("/settings")

            if (isProtectedRoute) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isAuthPage) {
                return Response.redirect(new URL("/dashboard", nextUrl))
            }

            return true
        },
    },
} satisfies NextAuthConfig
