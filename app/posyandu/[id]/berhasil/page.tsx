"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "lucide-react"

interface PosyanduBerhasilProps {
  params: { id: string }
}

export default function PosyanduBerhasilPage({ params }: PosyanduBerhasilProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queueNumber = searchParams.get("queue")
  const selectedDate = searchParams.get("date")

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

  // Mock schedule data for the success page
  const generateMockSchedule = () => {
    const schedules = []
    const baseDate = new Date(2024, 0, 15) // January 15, 2024

    for (let i = 0; i < 3; i++) {
      const date = new Date(baseDate)
      date.setDate(baseDate.getDate() + i * 7)

      const dateString = date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })

      schedules.push({
        date: date.toISOString().split("T")[0],
        displayDate: dateString,
        registeredCount: Math.floor(Math.random() * 20) + 5,
        isRegistered: i === 0, // First one is registered
      })
    }

    return schedules
  }

  const mockSchedules = generateMockSchedule()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Success Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h1>
            <p className="text-gray-600 text-sm mb-6">Terima kasih telah mendaftar di Posyandu Lansia</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Nomor Antrian Anda:</p>
              <div className="text-3xl font-bold text-blue-600">{queueNumber}</div>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Simpan nomor antrian ini dan datang sesuai jadwal yang telah dipilih. Anda akan menerima reminder melalui
              email.
            </p>

            <Button className="w-full mb-6" onClick={() => router.push("/")}>
              Kembali ke Beranda
            </Button>
          </div>

          {/* Schedule Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Jadwal Posyandu</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">Pilih tanggal untuk mendaftar</p>

            <div className="space-y-3">
              {mockSchedules.map((schedule, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    schedule.isRegistered ? "bg-green-50 border-green-200" : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{schedule.displayDate}</div>
                      <div className="text-sm text-gray-500">{schedule.registeredCount} orang terdaftar</div>
                    </div>
                    {schedule.isRegistered ? (
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                        Terdaftar
                      </span>
                    ) : (
                      <Button size="sm" variant="outline">
                        Daftar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
