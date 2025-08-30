'use client'
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { navigationLinks } from "@/lib/navigation"

export default function HeaderNav() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const formatDateTime = useCallback((date: Date): string => {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    const time = timeFormatter.format(date)
    const dateStr = dateFormatter.format(date)

    return `${time} ${dateStr}`
  }, [])

  const updateTime = useCallback(() => {
    setCurrentTime(formatDateTime(new Date()))
  }, [formatDateTime])

  useEffect(() => {
    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [updateTime])

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      // TODO: Implement search functionality
    }
  }, [searchQuery])



  return (
    <header className='w-full flex flex-col'>
      <div className="relative px-2 sm:px-4 lg:px-8 h-10 sm:h-12 border-b border-border/20 bg-neutral-900">
        <div className="w-full flex items-center justify-between h-full max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
            <Badge variant="secondary" className="text-xs bg-neutral-800 text-white border-neutral-700 truncate">
              <span className="hidden sm:inline">{currentTime}</span>
              <span className="sm:hidden">{currentTime.split(' ')[0]}</span>
            </Badge>

            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-2">
              <a
                href="https://www.facebook.com/TheTechnologianStudentPress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                title="Facebook"
              >
                <Image
                  src="/img/facebook.svg"
                  width={12}
                  height={12}
                  alt="Facebook"
                  className="w-3 h-3 brightness-0 invert"
                />
              </a>
              <a
                href="https://www.facebook.com/TheTechnologianStudentPress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                title="Instagram"
              >
                <Image
                  src="/img/instagram.svg"
                  width={12}
                  height={12}
                  alt="Instagram"
                  className="w-3 h-3 brightness-0 invert"
                />
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3 min-w-0 flex-1 justify-end max-w-md ml-2">
            {/* Enhanced Responsive Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center min-w-0 flex-1">
              <div className={`relative flex items-center transition-all duration-300 w-full ${isSearchFocused
                ? 'max-w-full'
                : 'max-w-32 sm:max-w-40 md:max-w-48 lg:max-w-56'
                }`}>
                <Search className="absolute left-2 h-3 w-3 text-neutral-400 z-10 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-7 pr-2 sm:pr-3 py-1 text-xs bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 h-6 sm:h-7 transition-all duration-300 focus:bg-neutral-750 focus:border-neutral-600 min-w-0"
                />
              </div>
            </form>


          </div>
        </div>
      </div>

      <div className="bg-black w-full h-48 sm:h-56 md:h-64 lg:h-72 flex items-center p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:15px_15px] sm:bg-[length:20px_20px]"></div>
        </div>
        <div className="w-full flex items-center h-full max-w-7xl mx-auto relative z-10">

          <div className="uppercase place-items-center text-center mx-auto space-y-2 sm:space-y-3 px-4">
            <div className="group cursor-pointer">
              <Image
                src="/img/logo-white-emblem.webp"
                width={96}
                height={96}
                alt='The Technologian Emblem Logo White'
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </div>
            <div className="space-y-1">
              <h1 className="font-bold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white transition-all duration-300 hover:text-red-400 leading-tight">
                The Technologian
              </h1>
              <p className="font-light text-xs sm:text-sm text-white/60 font-medium tracking-wider">
                Ad Astra Per Aspera!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`relative px-2 sm:px-4 lg:px-8 h-14 sm:h-16 border-t flex items-center border-border/20 bg-neutral-900 transition-all duration-300 ${isScrolled ? 'sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-neutral-900/95' : ''
        }`}>
        <div className="w-full flex items-center justify-between h-full max-w-7xl mx-auto">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 overflow-x-auto">
            {navigationLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm text-white/80 hover:text-white transition-all duration-300 font-medium group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="text-xs lg:text-sm font-medium text-black bg-white hover:bg-gray-100 border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-md px-2 lg:px-3"
            >
              <span className="hidden lg:inline">Pitch an Idea</span>
              <span className="lg:hidden">Pitch</span>
            </Button>
            <Button
              size="sm"
              className="text-xs lg:text-sm font-medium text-white bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 px-2 lg:px-3"
            >
              <span className="hidden lg:inline">Request Assistance</span>
              <span className="lg:hidden">Help</span>
            </Button>
          </div>

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="flex md:hidden items-center flex-1 max-w-xs mr-2">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-2 h-3 w-3 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-3 py-1 text-xs bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 h-7"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-t border-border/20 md:hidden z-50 animate-in slide-in-from-top-2 duration-300">
            <nav className="px-4 py-4 space-y-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-white/80 hover:text-white transition-all duration-200 font-medium py-2 hover:pl-2 border-l-2 border-transparent hover:border-red-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </a>
              ))}

              {/* Social Links - Mobile */}
              <div className="pt-3 border-t border-border/20">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-xs text-white/60">Follow us:</span>
                  <a
                    href="https://facebook.com/thetechnologian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    title="Facebook"
                  >
                    <Image
                      src="/img/facebook.svg"
                      width={16}
                      height={16}
                      alt="Facebook"
                      className="w-4 h-4 brightness-0 invert"
                    />
                  </a>
                  <a
                    href="https://instagram.com/thetechnologian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    title="Instagram"
                  >
                    <Image
                      src="/img/instagram.svg"
                      width={16}
                      height={16}
                      alt="Instagram"
                      className="w-4 h-4 brightness-0 invert"
                    />
                  </a>
                </div>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="pt-2 space-y-2">
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="outline"
                  className="w-full text-sm font-medium text-black bg-white hover:bg-gray-100 border-gray-300 transition-all duration-300"
                >
                  Pitch an Idea
                </Button>
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-sm font-medium text-white bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 transition-all duration-300"
                >
                  Request Assistance
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
