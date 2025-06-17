"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("umum")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Login after successful registration with name and email
    login(userType as "umum" | "kader", name, email)

    // Redirect based on user type
    if (userType === "kader") {
      router.push("/dashboard-kader")
    } else {
      router.push("/")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Image
              src="/images/logo-lansia-care.png"
              alt="Lansia Care Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Akun Baru</h1>
          <p className="text-gray-600">Buat akun untuk menggunakan layanan Posyandu Lansia</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Tipe Akun</Label>
            <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-3 bg-blue-50 border-blue-200">
                <RadioGroupItem value="umum" id="umum" />
                <Label htmlFor="umum" className="text-sm">
                  <div>
                    <div className="font-medium">Pengguna Umum</div>
                    <div className="text-gray-500 text-xs">Lansia & Keluarga</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="kader" id="kader" />
                <Label htmlFor="kader" className="text-sm">
                  <div>
                    <div className="font-medium">Kader Posyandu</div>
                    <div className="text-gray-500 text-xs">Petugas Kesehatan</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </Label>
            <Input
              id="name"
              placeholder="Masukkan nama lengkap"
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className="mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {userType === "kader" && (
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Lokasi Posyandu
              </Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih Lokasi Posyandu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="condongcatur">Posyandu Condongcatur</SelectItem>
                  <SelectItem value="caturtunggal">Posyandu Caturtunggal</SelectItem>
                  <SelectItem value="maguwoharjo">Posyandu Maguwoharjo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input id="password" type="password" placeholder="Minimal 8 karakter" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Konfirmasi Password
            </Label>
            <Input id="confirmPassword" type="password" placeholder="Masukkan password yang sama" className="mt-1" />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Mendaftar..." : "Daftar"}
          </Button>

          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Daftar sebagai Pengguna Umum
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Daftar sebagai Kader
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link href="/masuk" className="text-blue-600 hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
