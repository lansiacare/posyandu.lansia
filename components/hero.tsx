"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [currentStat, setCurrentStat] = useState(0)

  const healthStats = [
    { percentage: "18%", condition: "Stroke", description: "Kasus stroke pada lansia" },
    { percentage: "25%", condition: "Diabetes", description: "Kasus diabetes pada lansia" },
    { percentage: "32%", condition: "Jantung", description: "Penyakit jantung pada lansia" },
    { percentage: "15%", condition: "Demensia", description: "Kasus demensia pada lansia" },
    { percentage: "28%", condition: "Asam Urat", description: "Kasus asam urat pada lansia" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % healthStats.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Selamat Datang di Lansia Care</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Platform terpadu untuk layanan kesehatan lansia di Kecamatan Depok, Sleman
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mb-12">
          <h2 className="text-xl font-semibold mb-4">Statistik Kesehatan Lansia</h2>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-500">
              {healthStats[currentStat].percentage}
            </div>
            <div className="text-gray-600 font-medium mb-2 transition-all duration-500">
              {healthStats[currentStat].condition}
            </div>
            <div className="text-sm text-gray-500 transition-all duration-500">
              {healthStats[currentStat].description}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {healthStats.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentStat ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
