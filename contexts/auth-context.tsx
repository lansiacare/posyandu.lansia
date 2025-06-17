"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface LansiaData {
  name: string
  nik: string
  birthDate: string
  gender: string
  bloodType: string
  bpjs: string
  address: string
}

interface ExaminationResult {
  patientId: string
  patientName: string
  date: string
  bloodPressureSystolic: string
  bloodPressureDiastolic: string
  cholesterol: string
  weight: string
  height: string
  bloodSugar: string
  uricAcid: string
  notes: string
  examDate: string
}

interface AuthContextType {
  isLoggedIn: boolean
  userName: string | null
  userEmail: string | null
  userType: "umum" | "kader" | null
  lansiaData: LansiaData | null
  examinationResults: ExaminationResult[] | null
  login: (userType: "umum" | "kader", userName: string, userEmail: string) => void
  logout: () => void
  saveLansiaData: (data: LansiaData) => void
  saveExaminationResult: (result: ExaminationResult) => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: null,
  userEmail: null,
  userType: null,
  lansiaData: null,
  examinationResults: null,
  login: () => {},
  logout: () => {},
  saveLansiaData: () => {},
  saveExaminationResult: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userType, setUserType] = useState<"umum" | "kader" | null>(null)
  const [lansiaData, setLansiaData] = useState<LansiaData | null>(null)
  const [examinationResults, setExaminationResults] = useState<ExaminationResult[] | null>(null)

  const login = (type: "umum" | "kader", userName: string, userEmail: string) => {
    setIsLoggedIn(true)
    setUserName(userName)
    setUserEmail(userEmail)
    setUserType(type)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserName(null)
    setUserEmail(null)
    setUserType(null)
    setLansiaData(null)
    setExaminationResults(null)
  }

  const saveLansiaData = (data: LansiaData) => {
    setLansiaData(data)
  }

  const saveExaminationResult = (result: ExaminationResult) => {
    setExaminationResults((prev) => {
      if (!prev) return [result]
      return [...prev, result]
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        userEmail,
        userType,
        lansiaData,
        examinationResults,
        login,
        logout,
        saveLansiaData,
        saveExaminationResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
