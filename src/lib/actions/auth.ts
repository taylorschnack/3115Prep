"use server"

import { signIn, signOut } from "@/lib/auth"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if ((error as Error).message?.includes("NEXT_REDIRECT")) {
      throw error
    }
    return { error: "Invalid email or password" }
  }
}

export async function register(formData: FormData) {
  const email = (formData.get("email") as string)?.trim()
  const password = formData.get("password") as string
  const name = (formData.get("name") as string)?.trim()
  const firmName = formData.get("firmName") as string

  if (!name) {
    return { error: "Name is required" }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "A valid email address is required" }
  }

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters" }
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "User with this email already exists" }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      firmName,
    },
  })

  // Sign in the user
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if ((error as Error).message?.includes("NEXT_REDIRECT")) {
      throw error
    }
    return { error: "Failed to sign in after registration" }
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" })
}
