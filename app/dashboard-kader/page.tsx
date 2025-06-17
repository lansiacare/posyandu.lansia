"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Edit, FileText } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"

interface Patient {
  id: string
  queueNumber: number
  name: string
  gender: string
  age: number
  address: string
  status: "waiting" | "examined"
  nik: string
  bpjs: string
  bloodType: string
  birthDate: string
}

export default function DashboardKaderPage() {
  const router = useRouter()
  const { isLoggedIn, userType, userName } = useAuth()
  const [selectedDate, setSelectedDate] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [examinedPatients, setExaminedPatients] = useState<Set<string>>(new Set())

  // Mock kader data - in real app this would come from auth context
  const kaderData = {
    name: userName || "Kader",
    posyandu: {
      id: "condongcatur",
      name: "Posyandu Condongcatur",
      address: "Jl. Kaliurang KM 7, Condongcatur, Depok, Sleman, DIY 55283",
      schedule: "Sabtu", // Saturday
    },
  }

  // Generate available dates (Saturdays for Condongcatur)
  const generateAvailableDates = () => {
    const dates = []
    const startDate = new Date(2025, 5, 7) // June 7, 2025 (first Saturday)

    for (let i = 0; i < 8; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i * 7)

      const dateString = date.toISOString().split("T")[0]
      const displayDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })

      dates.push({
        value: dateString,
        label: displayDate,
      })
    }

    return dates
  }

  const availableDates = generateAvailableDates()

  // Generate registration count for a specific date (consistent with posyandu detail page)
  const getRegistrationCount = (date: string): number => {
    // Use date as seed for consistent random numbers
    const seed = date.split("-").join("")
    const seedNum = Number.parseInt(seed.slice(-4)) || 1000
    const random = ((seedNum * 9301 + 49297) % 233280) / 233280
    return Math.floor(random * 8) + 3 // 3-10 people, consistent with posyandu page
  }

  // Check if patient has been examined
  const isPatientExamined = (patientId: string, date: string): boolean => {
    const examDataKey = `exam-${date}-${patientId}`
    return localStorage.getItem(examDataKey) !== null
  }

  // Load examined patients from localStorage
  const loadExaminedPatients = (date: string) => {
    const examined = new Set<string>()
    for (let i = 1; i <= 10; i++) {
      if (isPatientExamined(i.toString(), date)) {
        examined.add(i.toString())
      }
    }
    setExaminedPatients(examined)
  }

  // Mock patient data based on selected date and registration count
  const generatePatients = (date: string): Patient[] => {
    const registrationCount = getRegistrationCount(date)

    const mockPatients = [
      {
        id: "1",
        name: "Siti Aminah",
        gender: "Perempuan",
        age: 67,
        address: "Jl. Mawar No. 123, Condongcatur",
        nik: "3404012345678901",
        bpjs: "0001234567890",
        bloodType: "A",
        birthDate: "1957-03-15",
      },
      {
        id: "2",
        name: "Budi Santoso",
        gender: "Laki-laki",
        age: 72,
        address: "Jl. Melati No. 456, Caturtunggal",
        nik: "3404012345678902",
        bpjs: "0001234567891",
        bloodType: "B",
        birthDate: "1952-08-20",
      },
      {
        id: "3",
        name: "Mariam Sari",
        gender: "Perempuan",
        age: 69,
        address: "Jl. Anggrek No. 789, Maguwoharjo",
        nik: "3404012345678903",
        bpjs: "0001234567892",
        bloodType: "O",
        birthDate: "1955-12-10",
      },
      {
        id: "4",
        name: "Ahmad Wijaya",
        gender: "Laki-laki",
        age: 75,
        address: "Jl. Kaliurang KM 8, Condongcatur",
        nik: "3404012345678904",
        bpjs: "0001234567893",
        bloodType: "AB",
        birthDate: "1949-05-03",
      },
      {
        id: "5",
        name: "Ratna Dewi",
        gender: "Perempuan",
        age: 68,
        address: "Jl. Babarsari No. 101, Caturtunggal",
        nik: "3404012345678905",
        bpjs: "0001234567894",
        bloodType: "A",
        birthDate: "1956-11-28",
      },
      {
        id: "6",
        name: "Suparman",
        gender: "Laki-laki",
        age: 70,
        address: "Jl. Kaliurang KM 9, Condongcatur",
        nik: "3404012345678906",
        bpjs: "0001234567895",
        bloodType: "B",
        birthDate: "1954-07-12",
      },
      {
        id: "7",
        name: "Sari Wulandari",
        gender: "Perempuan",
        age: 66,
        address: "Jl. Babarsari No. 202, Caturtunggal",
        nik: "3404012345678907",
        bpjs: "0001234567896",
        bloodType: "O",
        birthDate: "1958-09-25",
      },
      {
        id: "8",
        name: "Bambang Sutrisno",
        gender: "Laki-laki",
        age: 73,
        address: "Jl. Mawar No. 567, Condongcatur",
        nik: "3404012345678908",
        bpjs: "0001234567897",
        bloodType: "A",
        birthDate: "1951-04-18",
      },
      {
        id: "9",
        name: "Endang Susilowati",
        gender: "Perempuan",
        age: 71,
        address: "Jl. Melati No. 890, Caturtunggal",
        nik: "3404012345678909",
        bpjs: "0001234567898",
        bloodType: "AB",
        birthDate: "1953-11-30",
      },
      {
        id: "10",
        name: "Haryanto",
        gender: "Laki-laki",
        age: 74,
        address: "Jl. Anggrek No. 345, Maguwoharjo",
        nik: "3404012345678910",
        bpjs: "0001234567899",
        bloodType: "B",
        birthDate: "1950-06-08",
      },
    ]

    // Return only the number of patients that match registration count
    return mockPatients.slice(0, registrationCount).map((patient, index) => ({
      ...patient,
      queueNumber: index + 1,
      status: examinedPatients.has(patient.id) ? "examined" : ("waiting" as const),
    }))
  }

  useEffect(() => {
    if (!isLoggedIn || userType !== "kader") {
      router.push("/masuk")
      return
    }

    // Set default date to first available date
    if (availableDates.length > 0 && !selectedDate) {
      const defaultDate = availableDates[1].value // June 21, 2025
      setSelectedDate(defaultDate)
    }
  }, [isLoggedIn, userType, router])

  // Load examined patients when date changes
  useEffect(() => {
    if (selectedDate) {
      loadExaminedPatients(selectedDate)
    }
  }, [selectedDate])

  // Generate patients when date or examined patients change
  useEffect(() => {
    if (selectedDate) {
      setPatients(generatePatients(selectedDate))
    }
  }, [selectedDate, examinedPatients])

  const handleInputExamination = (patient: Patient) => {
    router.push(`/dashboard-kader/input/${patient.id}?date=${selectedDate}`)
  }

  const handleEditExamination = (patient: Patient) => {
    router.push(`/dashboard-kader/edit/${patient.id}?date=${selectedDate}`)
  }

  // Check for updated patient status from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const updatedPatientId = urlParams.get("updated")
    const success = urlParams.get("success")

    if (updatedPatientId && success === "true" && selectedDate) {
      // Reload examined patients to reflect changes
      setTimeout(() => {
        loadExaminedPatients(selectedDate)
      }, 100)

      // Clean up URL
      window.history.replaceState({}, "", "/dashboard-kader")
    }
  }, [selectedDate])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">K</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dashboard Kader</h1>
                  <p className="text-sm text-gray-600">{kaderData.posyandu.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{kaderData.posyandu.address}</span>
            </div>
          </div>

          {/* Schedule Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Jadwal Posyandu</h2>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Pilih Tanggal</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Pilih tanggal jadwal" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date) => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDate && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{patients.length} pasien terdaftar</span> untuk tanggal ini
                {examinedPatients.size > 0 && (
                  <span className="ml-4 text-green-600">• {examinedPatients.size} sudah diperiksa</span>
                )}
              </div>
            )}
          </div>

          {/* Patient List */}
          {selectedDate && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">No. Antrian</TableHead>
                      <TableHead>Nama Pasien</TableHead>
                      <TableHead>Jenis Kelamin</TableHead>
                      <TableHead>Umur</TableHead>
                      <TableHead>Alamat</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.queueNumber}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.age} tahun</TableCell>
                        <TableCell className="max-w-xs truncate">{patient.address}</TableCell>
                        <TableCell>
                          {patient.status === "waiting" ? (
                            <Badge variant="secondary">Belum Diperiksa</Badge>
                          ) : (
                            <Badge className="bg-blue-600 hover:bg-blue-700">Sudah Diperiksa</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {patient.status === "waiting" ? (
                            <Button size="sm" onClick={() => handleInputExamination(patient)}>
                              <FileText className="w-4 h-4 mr-1" />
                              Input
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleEditExamination(patient)}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
