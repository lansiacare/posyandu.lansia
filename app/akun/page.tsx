"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Edit, FileText, HelpCircle, LogOut } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

export default function AccountPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const { userName, userEmail, logout, lansiaData } = useAuth()

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Kembali ke Beranda
          </Link>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-6">
            <p className="text-green-800 text-sm">✓ Data lansia berhasil disimpan!</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image
                src="/images/logo-lansia-care.png"
                alt="Lansia Care Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Akun Saya</h1>
            <p className="text-gray-600 text-sm">Kelola informasi akun Anda</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5" />
              <div>
                <div className="font-medium">{userName || "User"}</div>
                <div className="text-sm text-gray-500">Nama Lengkap</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FileText className="w-5 h-5" />
              <div>
                <div className="font-medium">{userEmail || "email@example.com"}</div>
                <div className="text-sm text-gray-500">Email Terdaftar</div>
              </div>
            </div>

            {lansiaData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium">Data Lansia Tersimpan</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => router.push("/data-lansia")}
            >
              <Edit className="w-4 h-4" />
              {lansiaData ? "Edit Data Lansia" : "Isi Data Lansia"}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => router.push("/hasil-pemeriksaan")}
            >
              <FileText className="w-4 h-4" />
              Lihat Hasil Pemeriksaan
            </Button>

            <Button variant="outline" className="w-full justify-start gap-3">
              <HelpCircle className="w-4 h-4" />
              Bantuan & Dukungan
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => {
                logout()
                router.push("/")
              }}
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
