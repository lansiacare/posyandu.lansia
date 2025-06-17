"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Activity } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function HasilPemeriksaanPage() {
  const { examinationResults } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/akun" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Kembali ke Akun
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Hasil Pemeriksaan Kesehatan</h1>
          </div>

          {examinationResults && examinationResults.length > 0 ? (
            <div className="space-y-6">
              {examinationResults.map((result, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        Hasil Pemeriksaan
                      </span>
                      <span className="text-sm text-gray-500">{result.examDate}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 mb-3">Data Vital</h3>

                        {result.bloodSugar && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gula Darah:</span>
                            <span className="font-medium">{result.bloodSugar} mg/dL</span>
                          </div>
                        )}

                        {result.bloodPressureSystolic && result.bloodPressureDiastolic && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tekanan Darah:</span>
                            <span className="font-medium">
                              {result.bloodPressureSystolic}/{result.bloodPressureDiastolic} mmHg
                            </span>
                          </div>
                        )}

                        {result.cholesterol && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kolesterol:</span>
                            <span className="font-medium">{result.cholesterol} mg/dL</span>
                          </div>
                        )}

                        {result.uricAcid && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Asam Urat:</span>
                            <span className="font-medium">{result.uricAcid} mg/dL</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 mb-3">Data Fisik</h3>

                        {result.weight && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Berat Badan:</span>
                            <span className="font-medium">{result.weight} kg</span>
                          </div>
                        )}

                        {result.height && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tinggi Badan:</span>
                            <span className="font-medium">{result.height} cm</span>
                          </div>
                        )}

                        {result.weight && result.height && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">BMI:</span>
                            <span className="font-medium">
                              {(
                                Number.parseFloat(result.weight) / Math.pow(Number.parseFloat(result.height) / 100, 2)
                              ).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {result.notes && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Catatan Dokter</h3>
                        <p className="text-gray-700">{result.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">Belum Ada Hasil Pemeriksaan</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Anda belum memiliki hasil pemeriksaan kesehatan. Silakan daftar pemeriksaan di posyandu terdekat.
              </p>

              <Button asChild>
                <Link href="/">📅 Daftar Pemeriksaan</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
