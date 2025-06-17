import { MapPin, Calendar, Clock } from "lucide-react"

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lansia Care menyediakan berbagai layanan untuk mendukung kesehatan dan kesejahteraan lansia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Pemetaan Posyandu</h3>
            <p className="text-gray-600">
              Temukan posyandu lansia terdekat dengan lokasi Anda dengan mudah melalui peta interaktif.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Jadwal Pemeriksaan</h3>
            <p className="text-gray-600">
              Akses jadwal pemeriksaan kesehatan dan daftar secara online untuk kunjungan berikutnya.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Riwayat Kesehatan</h3>
            <p className="text-gray-600">
              Pantau riwayat kesehatan dan hasil pemeriksaan lansia secara digital dan terorganisir.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
