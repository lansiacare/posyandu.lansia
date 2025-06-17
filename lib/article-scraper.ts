// Mock function to simulate article scraping
// In a real implementation, you would use a web scraping service or API
export async function getArticleData(url: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const domain = new URL(url).hostname

  // Mock data based on the provided URLs
  const mockData: Record<string, any> = {
    "www.nestlehealthscience.co.id": {
      title: "Masalah Kesehatan pada Lansia",
      description:
        "Memahami berbagai masalah kesehatan yang umum dialami oleh lansia dan cara mengatasinya dengan pendekatan yang tepat. Artikel ini membahas kondisi kesehatan yang sering muncul pada usia lanjut.",
      source: "Nestle Health Science",
    },
    "www.klikdokter.com": {
      title: "Kiat Menjaga Kesehatan Jantung Bagi Lansia",
      description:
        "Tips dan strategi untuk menjaga kesehatan jantung pada usia lanjut dengan pola hidup sehat dan pemeriksaan rutin. Panduan lengkap untuk mencegah penyakit kardiovaskular.",
      source: "KlikDokter",
    },
    "www.dapurumami.com": {
      title: "Pentingnya Gizi Seimbang untuk Mencegah Diabetes pada Lansia",
      description:
        "Panduan nutrisi dan pola makan sehat untuk mencegah diabetes pada lansia dengan menu makanan bergizi seimbang. Resep dan tips praktis untuk kesehatan optimal.",
      source: "Dapur Umami",
    },
    "kemkes.go.id": {
      title: "Mau Jadi Lansia Sehat dan Produktif? Begini Caranya",
      description:
        "Kementerian Kesehatan memberikan panduan lengkap untuk menjadi lansia yang sehat dan produktif. Tips gaya hidup, olahraga, dan pola makan yang tepat untuk usia lanjut.",
      source: "Kementerian Kesehatan RI",
    },
    "www.siloamhospitals.com": {
      title: "Medical Check Up untuk Lansia",
      description:
        "Pentingnya pemeriksaan kesehatan rutin untuk lansia dan jenis-jenis tes yang direkomendasikan. Panduan lengkap medical check up yang sesuai dengan kebutuhan usia lanjut.",
      source: "Siloam Hospitals",
    },
    "hellosehat.com": {
      title: "Stroke pada Lansia: Pencegahan dan Penanganan",
      description:
        "Informasi lengkap tentang stroke pada lansia, mulai dari gejala, faktor risiko, pencegahan, hingga penanganan yang tepat. Tips menjaga kesehatan untuk menghindari stroke.",
      source: "Hello Sehat",
    },
  }

  return {
    ...mockData[domain],
    url,
  }
}
