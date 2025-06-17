"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { RefreshCw } from "lucide-react"

interface PosyanduDaftarProps {
  params: { id: string }
}

export default function PosyanduDaftarPage({ params }: PosyanduDaftarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lansiaData } = useAuth()
  const selectedDate = searchParams.get("date")

  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    birthDate: "",
    bpjs: "",
    address: "",
  })

  const [isAutoFilled, setIsAutoFilled] = useState(false)

  const posyanduNames = {
    condongcatur: "Posyandu Condongcatur",
    caturtunggal: "Posyandu Caturtunggal",
    maguwoharjo: "Posyandu Maguwoharjo",
  }

  const currentPosyanduName = posyanduNames[params.id as keyof typeof posyanduNames]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const handleAutoFill = () => {
    if (lansiaData) {
      setFormData({
        name: lansiaData.name,
        nik: lansiaData.nik,
        birthDate: lansiaData.birthDate,
        bpjs: lansiaData.bpjs,
        address: lansiaData.address,
      })
      setIsAutoFilled(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate random queue number
    const queueNumber = Math.floor(Math.random() * 50) + 1
    router.push(`/posyandu/${params.id}/berhasil?queue=${queueNumber}&date=${selectedDate}`)
  }

  if (!selectedDate) {
    return <div>Tanggal tidak valid</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="mb-6">
          <Link href={`/posyandu/${params.id}`} className="text-blue-600 hover:text-blue-700 text-sm">
            ← Kembali
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Pendaftaran Posyandu</h1>
          <p className="text-gray-600 text-sm mb-6">
            Daftar untuk {currentPosyanduName} pada tanggal {formatDate(selectedDate)}
          </p>

          {lansiaData && !isAutoFilled && (
            <div className="mb-6">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handleAutoFill}
                type="button"
              >
                <RefreshCw className="w-4 h-4" />
                Isi Otomatis dari Data Tersimpan
              </Button>
            </div>
          )}

          {isAutoFilled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <p className="text-green-800 text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Isi Otomatis dari Data Tersimpan (m)
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                placeholder="Masukkan nama lengkap"
                className="mt-1"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="nik" className="text-sm font-medium text-gray-700">
                NIK
              </Label>
              <Input
                id="nik"
                placeholder="Masukkan NIK (16 digit)"
                className="mt-1"
                value={formData.nik}
                onChange={(e) => handleInputChange("nik", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                Tanggal Lahir
              </Label>
              <Input
                id="birthDate"
                type="date"
                className="mt-1"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="bpjs" className="text-sm font-medium text-gray-700">
                Nomor BPJS
              </Label>
              <Input
                id="bpjs"
                placeholder="Masukkan nomor BPJS"
                className="mt-1"
                value={formData.bpjs}
                onChange={(e) => handleInputChange("bpjs", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Alamat Lengkap
              </Label>
              <Input
                id="address"
                placeholder="Masukkan alamat lengkap"
                className="mt-1"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Daftar Sekarang
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
