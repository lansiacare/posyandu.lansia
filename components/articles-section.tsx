import { getArticleData } from "@/lib/article-scraper"
import ArticleCard from "@/components/article-card"

const articleUrls = [
  "https://www.nestlehealthscience.co.id/artikel/masalah-kesehatan-pada-lansia",
  "https://www.klikdokter.com/info-sehat/kesehatan-lansia/kiat-menjaga-kesehatan-jantung-bagi-lansia?srsltid=AfmBOopEWqWOqnkgZuSg3yymiODawg6u3GgMDlkfC9wUc20iLXQ2rLUQ",
  "https://www.dapurumami.com/artikel-tips/pentingnya-gizi-seimbang-untuk-mencegah-diabetes-pada-lansia/",
  "https://kemkes.go.id/id/mau-jadi-lansia-sehat-dan-produktif-begini-caranya",
  "https://www.siloamhospitals.com/informasi-siloam/artikel/medical-check-up-untuk-lansia",
  "https://hellosehat.com/lansia/masalah-lansia/stroke-pada-lansia/",
]

export default async function ArticlesSection() {
  const articles = await Promise.all(
    articleUrls.map(async (url) => {
      try {
        return await getArticleData(url)
      } catch (error) {
        console.error(`Error fetching article from ${url}:`, error)
        return {
          title: "Artikel Kesehatan Lansia",
          description: "Informasi kesehatan untuk lansia",
          source: new URL(url).hostname,
          url: url,
        }
      }
    }),
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Kesehatan</h2>
          <p className="text-gray-600">Informasi terkini seputar kesehatan lansia</p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
            {articles.map((article, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">← Geser untuk melihat artikel lainnya →</p>
        </div>
      </div>
    </section>
  )
}
