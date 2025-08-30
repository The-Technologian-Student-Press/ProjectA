'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, User, TrendingUp, Eye, Search } from "lucide-react"

const featuredArticles = [
  {
    id: 1,
    title: "Honoring Stephien: A Creative Soul Behind the Lens and Canvas",
    excerpt: "There comes a point in everyone's lives where we get the chance to walk the journey with someone who quietly leaves their mark—without fanfare, without trying—with the sheer brilliance of their talent, passion, and warmth.",
    category: "Feature",
    author: "Admin",
    date: "2025-02-17",
    readTime: "5 min read",
    views: "2.1K",
    image: "/img/articles/stephien-feature.jpg",
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: "Quest for the Crown: The Rise of CIT-U's Esports Athletes",
    excerpt: "Behind every victory lies countless hours of practice, strategy, and unwavering determination. Meet the rising stars of CIT-U's competitive gaming scene.",
    category: "Sports",
    author: "Admin",
    date: "2025-02-09",
    readTime: "4 min read",
    views: "1.8K",
    image: "/img/articles/esports-crown.jpg",
    featured: true,
    trending: false
  },
  {
    id: 3,
    title: "Behind the Hustle: Life Stories of CIT-U's Non-Academic Scholars",
    excerpt: "Gikapoy nako. Daghang buhatunon oy. Ting exam nasad, tas wala pa ko kabayad — these are words often voiced by Teknoys after another grueling day of classes and schoolworks.",
    category: "Feature",
    author: "Ana Jhalrem Paunil",
    date: "2025-01-18",
    readTime: "6 min read",
    views: "3.2K",
    image: "/img/articles/non-academic-scholars.jpg",
    featured: true,
    trending: true
  }
]

const recentArticles = [
  {
    id: 4,
    title: "Engineering the Stars: A Woman's Mark in Robotics",
    excerpt: "By Anthony Bruce Cabuenas In the vast empty space of our deep universe, an amplified voice of change echoes. A sudden surge of power far greater than any asteroid damage or comet impact.",
    category: "Feature",
    author: "Anthony Bruce Cabuenas",
    date: "2025-03-31",
    readTime: "8 min read",
    views: "1.5K",
    image: "/img/articles/robotics-woman.jpg"
  },
  {
    id: 5,
    title: "From Passion to Profit: The Ventures of CIT-U's Student Entrepreneurs",
    excerpt: "Discover how CIT-U students are turning their innovative ideas into successful business ventures while balancing their academic responsibilities.",
    category: "Business",
    author: "Student Press",
    date: "2024-12-05",
    readTime: "5 min read",
    views: "2.7K",
    image: "/img/articles/student-entrepreneurs.jpg"
  },
  {
    id: 6,
    title: "Campus Sustainability: Green Initiatives Making a Difference",
    excerpt: "Exploring the environmental programs and student-led initiatives that are making CIT-U a more sustainable campus for future generations.",
    category: "Environment",
    author: "Green Team",
    date: "2024-11-28",
    readTime: "4 min read",
    views: "1.9K",
    image: "/img/articles/sustainability.jpg"
  }
]

const categories = [
  { name: "Feature", count: 24, color: "bg-red-600" },
  { name: "Sports", count: 18, color: "bg-black" },
  { name: "Business", count: 15, color: "bg-neutral-700" },
  { name: "Environment", count: 12, color: "bg-neutral-600" },
  { name: "Campus Life", count: 8, color: "bg-neutral-500" }
]

const trendingTopics = [
  "CIT-U Esports",
  "Student Life",
  "Academic Excellence", 
  "Campus Events",
  "Technology Innovation"
]

export default function ArticlesSection() {
  return (
    <section className="py-16 bg-dotted-grid-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Latest Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the voices and stories that shape our CIT-U community
          </p>
          
          {/* Search Section */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles, topics, or authors..."
                className="pl-10 pr-4 py-3 w-full border-gray-300 focus:border-black focus:ring-black rounded-xl"
              />
            </div>
          </div>
          
          {/* Popular Topics */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>Popular:</span>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.slice(0, 3).map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs hover:bg-neutral-50 hover:border-neutral-300 cursor-pointer">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[16/10] mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                    {featuredArticles[0].category}
                  </Badge>
                  {featuredArticles[0].trending && (
                    <Badge className="bg-black text-white font-semibold">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-red-200 transition-colors">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{featuredArticles[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredArticles[0].date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredArticles[0].views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredArticles[0].readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Secondary Featured Articles */}
          <div className="space-y-6">
            {featuredArticles.slice(1, 3).map((article) => (
              <article key={article.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3] mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className={article.category === 'Sports' ? 'bg-black text-white font-semibold' : 'bg-red-600 text-white font-semibold'}>
                      {article.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-red-200 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Recent Articles & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Recent Articles */}
          <div className="lg:col-span-3">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">Recent Articles</h3>
              <p className="text-lg text-gray-600 mb-6">Stay informed with our latest campus stories and insights</p>
              <div className="w-16 h-1 bg-red-600 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <article key={article.id} className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                  <div className="relative overflow-hidden bg-neutral-100 aspect-[16/10]">
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className={
                        article.category === 'Feature' ? 'bg-red-600 text-white font-semibold' :
                        article.category === 'Business' ? 'bg-black text-white font-semibold' :
                        article.category === 'Environment' ? 'bg-neutral-600 text-white font-semibold' :
                        'bg-neutral-700 text-white font-semibold'
                      }>
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-black mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{article.author}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </div>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a href="#" className="inline-flex items-center text-lg font-semibold text-black hover:text-red-600 transition-colors group">
                Explore All Stories
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h4 className="text-xl font-bold text-black mb-6">Browse by Category</h4>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color} group-hover:scale-110 transition-transform`} />
                      <span className="font-semibold text-black group-hover:text-red-600 transition-colors">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-red-600" />
                <h4 className="text-xl font-bold text-black">Popular Stories</h4>
              </div>
              <div className="space-y-5">
                {[
                  {
                    title: "Behind the Hustle: Life Stories of CIT-U's Non-Academic Scholars",
                    date: "September 18, 2024",
                    category: "Feature",
                    views: "3.2K"
                  },
                  {
                    title: "Engineering the Stars: A Woman's Mark in Robotics",
                    date: "March 31, 2025",
                    category: "Feature", 
                    views: "1.5K"
                  },
                  {
                    title: "Quest for the Crown: The Rise of CIT-U's Esports Athletes",
                    date: "February 9, 2025",
                    category: "Sports",
                    views: "1.8K"
                  }
                ].map((article, index) => (
                  <article key={index} className="group cursor-pointer p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200">
                    <h5 className="font-bold text-sm text-black group-hover:text-red-600 transition-colors mb-2 line-clamp-2 leading-relaxed">
                      {article.title}
                    </h5>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium">{article.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span className="font-medium">{article.views}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}