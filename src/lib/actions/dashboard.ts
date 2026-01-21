"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getDashboardStats() {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      totalClients: 0,
      inProgress: 0,
      completed: 0,
      totalFilings: 0,
      recentFilings: [],
    }
  }

  const [
    totalClients,
    inProgress,
    completed,
    totalFilings,
    recentFilings,
  ] = await Promise.all([
    db.client.count({
      where: { userId: session.user.id },
    }),
    db.filing.count({
      where: {
        client: { userId: session.user.id },
        status: "in_progress",
      },
    }),
    db.filing.count({
      where: {
        client: { userId: session.user.id },
        status: "completed",
      },
    }),
    db.filing.count({
      where: {
        client: { userId: session.user.id },
      },
    }),
    db.filing.findMany({
      where: {
        client: { userId: session.user.id },
      },
      include: {
        client: {
          select: { name: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ])

  return {
    totalClients,
    inProgress,
    completed,
    totalFilings,
    recentFilings: recentFilings.map((f) => ({
      id: f.id,
      clientName: f.client.name,
      taxYearOfChange: f.taxYearOfChange,
      status: f.status,
      updatedAt: f.updatedAt.toLocaleDateString(),
    })),
  }
}
