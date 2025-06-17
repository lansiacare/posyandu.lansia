import { Suspense } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import PosyanduSection from "@/components/posyandu-section"
import ArticlesSection from "@/components/articles-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section id="beranda">
          <Hero />
        </section>
        <Services />
        <section id="posyandu">
          <PosyanduSection />
        </section>
        <section id="artikel">
          <Suspense fallback={<div className="py-16 text-center">Loading articles...</div>}>
            <ArticlesSection />
          </Suspense>
        </section>
        <section id="tentang">
          <Footer />
        </section>
      </main>
    </div>
  )
}
