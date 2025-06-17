"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"

export default function DataLansiaPage() {
  const router = useRouter()
  const { saveLansiaData } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    birthDate: "",
    gender: "",
    bloodType: "",
    bpjs: "",
    address: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveLansiaData(formData)
    router.push("/akun?success=true")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Generate years from 1920 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i)

  // Generate months
  const months = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ]

  // Generate days
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const [dateComponents, setDateComponents] = useState({
    day: "",
    month: "",
    year: "",
  })

  const handleDateChange = (component: string, value: string) => {
    const newComponents = { ...dateComponents, [component]: value }
    setDateComponents(newComponents)

    // Update the main form data when all components are selected
    if (newComponents.day && newComponents.month && newComponents.year) {
      const formattedDate = `${newComponents.year}-${newComponents.month}-${newComponents.day.padStart(2, "0")}`
      handleInputChange("birthDate", formattedDate)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="mb-6">
          <Link href="/akun" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Kembali
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Data Lansia</h1>
          <p className="text-gray-600 text-sm mb-6">Isi data lansia untuk memudahkan pendaftaran Posyandu</p>

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
              <Label className="text-sm font-medium text-gray-700">Tanggal Lahir</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Select value={dateComponents.day} onValueChange={(value) => handleDateChange("day", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tanggal" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={dateComponents.month} onValueChange={(value) => handleDateChange("month", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={dateComponents.year} onValueChange={(value) => handleDateChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Jenis Kelamin</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Golongan Darah</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih Golongan Darah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="ab">AB</SelectItem>
                  <SelectItem value="o">O</SelectItem>
                </SelectContent>
              </Select>
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
              💾 Simpan Data
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
