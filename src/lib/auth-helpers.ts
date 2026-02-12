import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

/**
 * Requires an authenticated session. Returns the user ID.
 * Throws a redirect to /login if not authenticated.
 */
export async function requireAuth(): Promise<string> {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }
  return session.user.id
}

/**
 * Requires auth and verifies that the filing belongs to the current user.
 * Returns the filing or null if not found/not owned.
 */
export async function getOwnedFiling(filingId: string, include?: { client?: boolean }) {
  const userId = await requireAuth()

  const filing = await db.filing.findFirst({
    where: {
      id: filingId,
      client: { userId },
    },
    include: include ? { client: include.client ?? false } : undefined,
  })

  return filing
}
