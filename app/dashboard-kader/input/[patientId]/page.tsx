"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Stethoscope, Save } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"

interface InputPemeriksaanProps {
  params: { patientId: string }
}

export default function InputPemeriksaanPage({ params }: InputPemeriksaanProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get("date")
  const { saveExaminationResult } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Mock patient data - in real app this would fetch from API
  const patientData = {
    "1": {
      name: "Siti Aminah",
      gender: "Perempuan",
      age: 67,
      birthDate: "15 Maret 1957",
      nik: "3404012345678901",
      bpjs: "0001234567890",
      bloodType: "A",
      address: "Jl. Mawar No. 123, Condongcatur, Depok, Sleman",
      queueNumber: 1,
    },
    "2": {
      name: "Budi Santoso",
      gender: "Laki-laki",
      age: 72,
      birthDate: "20 Agustus 1952",
      nik: "3404012345678902",
      bpjs: "0001234567891",
      bloodType: "B",
      address: "Jl. Melati No. 456, Caturtunggal",
      queueNumber: 2,
    },
    "3": {
      name: "Mariam Sari",
      gender: "Perempuan",
      age: 69,
      birthDate: "10 Desember 1955",
      nik: "3404012345678903",
      bpjs: "0001234567892",
      bloodType: "O",
      address: "Jl. Anggrek No. 789, Maguwoharjo",
      queueNumber: 3,
    },
    "4": {
      name: "Ahmad Wijaya",
      gender: "Laki-laki",
      age: 75,
      birthDate: "3 Mei 1949",
      nik: "3404012345678904",
      bpjs: "0001234567893",
      bloodType: "AB",
      address: "Jl. Kaliurang KM 8, Condongcatur",
      queueNumber: 4,
    },
    "5": {
      name: "Ratna Dewi",
      gender: "Perempuan",
      age: 68,
      birthDate: "28 November 1956",
      nik: "3404012345678905",
      bpjs: "0001234567894",
      bloodType: "A",
      address: "Jl. Babarsari No. 101, Caturtunggal",
      queueNumber: 5,
    },
    "6": {
      name: "Suparman",
      gender: "Laki-laki",
      age: 70,
      birthDate: "12 Juli 1954",
      nik: "3404012345678906",
      bpjs: "0001234567895",
      bloodType: "B",
      address: "Jl. Kaliurang KM 9, Condongcatur",
      queueNumber: 6,
    },
    "7": {
      name: "Sari Wulandari",
      gender: "Perempuan",
      age: 66,
      birthDate: "25 September 1958",
      nik: "3404012345678907",
      bpjs: "0001234567896",
      bloodType: "O",
      address: "Jl. Babarsari No. 202, Caturtunggal",
      queueNumber: 7,
    },
    "8": {
      name: "Bambang Sutrisno",
      gender: "Laki-laki",
      age: 73,
      birthDate: "18 April 1951",
      nik: "3404012345678908",
      bpjs: "0001234567897",
      bloodType: "A",
      address: "Jl. Mawar No. 567, Condongcatur",
      queueNumber: 8,
    },
    "9": {
      name: "Endang Susilowati",
      gender: "Perempuan",
      age: 71,
      birthDate: "30 November 1953",
      nik: "3404012345678909",
      bpjs: "0001234567898",
      bloodType: "AB",
      address: "Jl. Melati No. 890, Caturtunggal",
      queueNumber: 9,
    },
    "10": {
      name: "Haryanto",
      gender: "Laki-laki",
      age: 74,
      birthDate: "8 Juni 1950",
      nik: "3404012345678910",
      bpjs: "0001234567899",
      bloodType: "B",
      address: "Jl. Anggrek No. 345, Maguwoharjo",
      queueNumber: 10,
    },
  }

  const patient = patientData[params.patientId as keyof typeof patientData]

  const [examinationData, setExaminationData] = useState({
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    cholesterol: "",
    weight: "",
    height: "",
    bloodSugar: "",
    uricAcid: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setExaminationData((prev) => ({ ...prev, [field]: value }))
  }

  // Update the handleSubmit function to ensure data is properly saved
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Save examination data to localStorage for dashboard to pick up
    const examDataKey = `exam-${selectedDate}-${params.patientId}`
    localStorage.setItem(examDataKey, JSON.stringify(examinationData))

    // Also save to a master key for easier retrieval
    const masterKey = `examinations-${selectedDate}`
    const existingData = localStorage.getItem(masterKey)
    const examinations = existingData ? JSON.parse(existingData) : {}
    examinations[params.patientId] = examinationData
    localStorage.setItem(masterKey, JSON.stringify(examinations))

    // Save examination data to context so it can be accessed by patient
    const examinationResult = {
      patientId: params.patientId,
      patientName: patient?.name || "",
      date: selectedDate || "",
      ...examinationData,
      examDate: new Date().toLocaleDateString("id-ID"),
    }

    saveExaminationResult(examinationResult)

    setIsLoading(false)

    // Redirect back to dashboard with success indicator
    router.push(`/dashboard-kader?updated=${params.patientId}&success=true`)
  }

  if (!patient) {
    return <div>Pasien tidak ditemukan</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <Link href="/dashboard-kader" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Kembali ke Dashboard
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informasi Pasien
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nama:</Label>
                    <p className="font-medium">{patient.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Jenis Kelamin:</Label>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Umur:</Label>
                    <p className="font-medium">{patient.age} tahun</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tanggal Lahir:</Label>
                    <p className="font-medium">{patient.birthDate}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">NIK:</Label>
                  <p className="font-medium">{patient.nik}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">BPJS:</Label>
                  <p className="font-medium">{patient.bpjs}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Golongan Darah:</Label>
                  <p className="font-medium">{patient.bloodType}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Alamat:</Label>
                  <p className="font-medium">{patient.address}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Nomor Antrian:</Label>
                  <p className="text-2xl font-bold text-blue-600">{patient.queueNumber}</p>
                </div>
              </CardContent>
            </Card>

            {/* Examination Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-green-600" />
                  Data Pemeriksaan
                </CardTitle>
                <p className="text-sm text-gray-600">Isi data hasil pemeriksaan kesehatan</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bloodSugar" className="text-sm font-medium">
                        Gula Darah (mg/dL)
                      </Label>
                      <Input
                        id="bloodSugar"
                        placeholder="80-120"
                        value={examinationData.bloodSugar}
                        onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tensi (mmHg)</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Sistol"
                          value={examinationData.bloodPressureSystolic}
                          onChange={(e) => handleInputChange("bloodPressureSystolic", e.target.value)}
                        />
                        <span className="flex items-center">/</span>
                        <Input
                          placeholder="Diastol"
                          value={examinationData.bloodPressureDiastolic}
                          onChange={(e) => handleInputChange("bloodPressureDiastolic", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cholesterol" className="text-sm font-medium">
                        Kolesterol (mg/dL)
                      </Label>
                      <Input
                        id="cholesterol"
                        placeholder="< 200"
                        value={examinationData.cholesterol}
                        onChange={(e) => handleInputChange("cholesterol", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="uricAcid" className="text-sm font-medium">
                        Asam Urat (mg/dL)
                      </Label>
                      <Input
                        id="uricAcid"
                        placeholder="3.5-7.0"
                        value={examinationData.uricAcid}
                        onChange={(e) => handleInputChange("uricAcid", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight" className="text-sm font-medium">
                        Berat Badan (kg)
                      </Label>
                      <Input
                        id="weight"
                        placeholder="50.0"
                        value={examinationData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-sm font-medium">
                        Tinggi Badan (cm)
                      </Label>
                      <Input
                        id="height"
                        placeholder="160.0"
                        value={examinationData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-sm font-medium">
                      Catatan Tambahan
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Catatan pemeriksaan, keluhan, atau rekomendasi..."
                      rows={4}
                      value={examinationData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Menyimpan..." : "💾 Simpan Data Pemeriksaan"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
