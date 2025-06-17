import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"

export default function PosyanduSection() {
  const posyandus = [
    {
      id: "condongcatur",
      name: "Posyandu Lansia Condongcatur",
      location: "Condongcatur, Depok, Sleman",
      schedule: "Setiap Sabtu, 08:00 - 11:00",
      participants: "45 lansia terdaftar",
      status: "AKTIF",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "caturtunggal",
      name: "Posyandu Lansia Caturtunggal",
      location: "Caturtunggal, Depok, Sleman",
      schedule: "Setiap Selasa, 09:00 - 12:00",
      participants: "38 lansia terdaftar",
      status: "AKTIF",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "maguwoharjo",
      name: "Posyandu Lansia Maguwoharjo",
      location: "Maguwoharjo, Depok, Sleman",
      schedule: "Setiap Jumat, 08:00 - 11:00",
      participants: "32 lansia terdaftar",
      status: "AKTIF",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Posyandu Lansia Terdekat</h2>
          <p className="text-gray-600">
            Temukan posyandu lansia di sekitar Anda dan dapatkan informasi lengkap tentang layanan yang tersedia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posyandus.map((posyandu, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={posyandu.image || "/placeholder.svg"}
                alt={posyandu.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    {posyandu.status}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-3">{posyandu.name}</h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{posyandu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{posyandu.schedule}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/posyandu/${posyandu.id}`}>Lihat Detail →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline">Lihat Semua Lokasi →</Button>
        </div>
      </div>
    </section>
  )
}
