import { MapPin, Phone, Mail, Globe } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-lansia-care.png"
                alt="Lansia Care Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <h3 className="font-bold text-lg">Lansia Care</h3>
                <p className="text-sm text-gray-300">Platform terpadu layanan kesehatan lansia</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>Jl. Temenggung No.6,</p>
                  <p>Depok, Sleman, Daerah</p>
                  <p>Istimewa Yogyakarta</p>
                  <p>Yogyakarta Kode Pos</p>
                  <p>55281</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>Telp (0274) 868406</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>Fax (0274) 868406</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>dinkes@slemankab.go.id</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span>http://dinkes.slemankab.go.id</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-300">© 2024 Lansia Care - Kecamatan Depok, Sleman, DIY</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
