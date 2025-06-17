import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { RedirectHandler } from "@/components/redirect-handler"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lansia Care - Platform Kesehatan Lansia",
  description: "Platform terpadu untuk layanan kesehatan lansia di Kecamatan Depok, Sleman",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <RedirectHandler />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
