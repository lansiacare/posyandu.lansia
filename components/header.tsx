"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Header() {
  const { isLoggedIn, userName, userType, logout } = useAuth()
  const router = useRouter()

  const handleLogoClick = () => {
    if (isLoggedIn && userType === "kader") {
      router.push("/dashboard-kader")
    } else {
      router.push("/")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <Image
            src="/images/logo-lansia-care.png"
            alt="Lansia Care Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <h1 className="font-bold text-lg text-gray-900">Lansia Care</h1>
            <p className="text-xs text-gray-500">Kesehatan Digital Lansia DIY</p>
          </div>
        </div>

        {/* Only show navigation for regular users, not kader */}
        {(!isLoggedIn || userType === "umum") && (
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("beranda")} className="text-gray-700 hover:text-blue-600">
              Beranda
            </button>
            <button onClick={() => scrollToSection("posyandu")} className="text-gray-700 hover:text-blue-600">
              Posyandu
            </button>
            <button onClick={() => scrollToSection("artikel")} className="text-gray-700 hover:text-blue-600">
              Artikel
            </button>
            <button onClick={() => scrollToSection("tentang")} className="text-gray-700 hover:text-blue-600">
              Tentang
            </button>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/masuk">Masuk</Link>
              </Button>
              <Button asChild>
                <Link href="/daftar">Daftar</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{userName || "User"}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userType === "umum" && (
                  <DropdownMenuItem asChild>
                    <Link href="/akun">Akun Saya</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/bantuan">Bantuan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Keluar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
