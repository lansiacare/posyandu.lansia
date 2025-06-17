import Link from "next/link"

interface Article {
  title: string
  description: string
  source: string
  url: string
}

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 flex-shrink-0">{article.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-4 flex-1">{article.description}</p>
          <div className="flex-shrink-0">
            <p className="text-blue-600 text-sm font-medium">Sumber: {article.source}</p>
            <div className="mt-3 text-blue-600 text-sm hover:underline">Baca selengkapnya →</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
