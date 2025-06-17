"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function RedirectHandler() {
  const { isLoggedIn, userType } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only redirect if user is logged in and on homepage
    if (isLoggedIn && userType === "kader" && pathname === "/") {
      router.push("/dashboard-kader")
    }
  }, [isLoggedIn, userType, pathname, router])

  return null
}
