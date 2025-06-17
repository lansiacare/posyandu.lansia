"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface PosyanduDetailProps {
  params: { id: string }
}

export default function PosyanduDetailPage({ params }: PosyanduDetailProps) {
  const router = useRouter()
  const [registeredDates, setRegisteredDates] = useState<string[]>([])

  // Mock data with correct information for each posyandu
  const posyanduData = {
    condongcatur: {
      name: "Posyandu Condongcatur",
      address: "Jl. Kaliurang KM 7, Condongcatur, Depok, Sleman, DIY 55283",
      description:
        "Posyandu Condongcatur merupakan fasilitas kesehatan terpadu yang melayani masyarakat lansia dengan tenaga medis berpengalaman dan fasilitas modern. Kami berkomitmen memberikan pelayanan kesehatan terbaik untuk meningkatkan kualitas hidup lansia.",
      schedule: "Setiap Sabtu, 08:00 - 11:00",
      dayOfWeek: 6, // Saturday
      timeRange: "08:00 - 11:00",
      image: "public/images/condongcatur.jpg?height=300&width=600",
    },
    caturtunggal: {
      name: "Posyandu Caturtunggal",
      address: "Jl. Babarsari, Caturtunggal, Depok, Sleman, DIY 55281",
      description:
        "Posyandu Caturtunggal adalah fasilitas kesehatan modern dengan layanan kesehatan terpadu untuk lansia. Dilengkapi dengan peralatan medis terkini dan tenaga kesehatan profesional.",
      schedule: "Setiap Selasa, 09:00 - 12:00",
      dayOfWeek: 2, // Tuesday
      timeRange: "09:00 - 12:00",
      image: "public/images/caturtunggal.jpg?height=300&width=600",
    },
    maguwoharjo: {
      name: "Posyandu Maguwoharjo",
      address: "Jl. Raya Maguwoharjo, Maguwoharjo, Depok, Sleman, DIY 55282",
      description:
        "Posyandu Maguwoharjo menyediakan layanan kesehatan komprehensif untuk lansia dengan akses mudah dan lingkungan yang nyaman. Fokus pada pelayanan preventif dan promotif.",
      schedule: "Setiap Jumat, 08:00 - 11:00",
      dayOfWeek: 5, // Friday
      timeRange: "08:00 - 11:00",
      image: "public/images/maguwoharjo.jpg?height=300&width=600",
    },
  }

  const currentPosyandu = posyanduData[params.id as keyof typeof posyanduData]

  if (!currentPosyandu) {
    return <div>Posyandu tidak ditemukan</div>
  }

  // Generate available dates based on the specific day of week for each posyandu
  const generateAvailableDates = () => {
    const dates = []
    const startDate = new Date(2025, 5, 1) // June 1, 2025

    // Find the first occurrence of the target day in June 2025
    const currentDate = new Date(startDate)
    while (currentDate.getDay() !== currentPosyandu.dayOfWeek) {
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Generate 8 dates of the same day of week
    for (let i = 0; i < 8; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + i * 7) // Add 7 days for each week

      const dateString = date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })

      // Random count between 3-10 people
      const registeredCount = Math.floor(Math.random() * 8) + 3 // 3-10 people
      const isRegistered = registeredDates.includes(date.toISOString().split("T")[0])

      dates.push({
        date: date.toISOString().split("T")[0],
        displayDate: dateString,
        registeredCount,
        isRegistered,
        timeRange: currentPosyandu.timeRange,
      })
    }

    return dates
  }

  const availableDates = generateAvailableDates()

  const handleRegister = (selectedDate: string) => {
    router.push(`/posyandu/${params.id}/daftar?date=${selectedDate}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Kembali ke Pilihan Lokasi
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <Image
            src={currentPosyandu.image}
            alt={currentPosyandu.name}
            width={600}
            height={300}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentPosyandu.name}</h1>

            <div className="flex items-start gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-gray-600">{currentPosyandu.address}</span>
            </div>

            <p className="text-gray-600 mb-6">{currentPosyandu.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Jadwal Posyandu</h2>
          </div>

          <p className="text-gray-600 mb-6">Pilih tanggal untuk mendaftar</p>

          <div className="space-y-3">
            {availableDates.map((dateInfo) => (
              <div
                key={dateInfo.date}
                className={`border rounded-lg p-4 ${
                  dateInfo.isRegistered
                    ? "bg-green-50 border-green-200"
                    : "hover:bg-gray-50 cursor-pointer border-gray-200"
                }`}
                onClick={() => !dateInfo.isRegistered && handleRegister(dateInfo.date)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{dateInfo.displayDate}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-4">
                      <span>{dateInfo.registeredCount} orang terdaftar</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {dateInfo.timeRange}
                      </span>
                    </div>
                  </div>
                  {dateInfo.isRegistered ? (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">Terdaftar</span>
                  ) : (
                    <Button size="sm">Daftar</Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-6" disabled>
            Pilih Tanggal Terlebih Dahulu
          </Button>
        </div>
      </div>
    </div>
  )
}
