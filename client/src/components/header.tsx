import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { History, Menu, X } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentSearches] = useState([
    { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up' },
    { id: 'jNQXAC9IVRw', title: 'Me at the zoo' },
    { id: 'Qw4w9WgXcQ', title: 'YouTube Rewind 2022' },
  ]);

  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="flex-shrink-0">
                <div className="bg-white p-2 rounded-full shadow-md">
                  <svg
                    className="h-8 w-8 text-red-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  YouTube Video Analyzer
                </h1>
                <p className="text-red-200 text-sm hidden md:block">Discover if videos are worth your time</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link href="/" className={`text-white hover:text-red-200 font-medium transition ${location === '/' ? 'border-b-2 border-white' : ''}`}>
                Home
              </Link>
              <Link href="/features" className={`text-white hover:text-red-200 font-medium transition ${location === '/features' ? 'border-b-2 border-white' : ''}`}>
                Features
              </Link>
              <Link href="/contact" className={`text-white hover:text-red-200 font-medium transition ${location === '/contact' ? 'border-b-2 border-white' : ''}`}>
                Contact
              </Link>
            </nav>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-white text-primary hover:bg-red-50">
                  <History className="h-4 w-4" />
                  <span>History</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="end">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium">Recent Searches</h3>
                </div>
                {recentSearches.length > 0 ? (
                  <div className="max-h-80 overflow-auto">
                    {recentSearches.map((item) => (
                      <Link key={item.id} href={`/analysis/${item.id}`}>
                        <div className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex items-start">
                          <div className="h-10 w-10 bg-red-100 rounded flex-shrink-0 flex items-center justify-center text-red-600">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                            <p className="text-xs text-gray-500">youtube.com/watch?v={item.id}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No recent searches
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <History className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="end">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium">Recent Searches</h3>
                </div>
                {recentSearches.length > 0 ? (
                  <div className="max-h-80 overflow-auto">
                    {recentSearches.map((item) => (
                      <Link key={item.id} href={`/analysis/${item.id}`}>
                        <div className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex items-start">
                          <div className="h-10 w-10 bg-red-100 rounded flex-shrink-0 flex items-center justify-center text-red-600">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                            <p className="text-xs text-gray-500">youtube.com/watch?v={item.id}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No recent searches
                  </div>
                )}
              </PopoverContent>
            </Popover>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-white hover:text-red-200 py-2 font-medium">
                Home
              </Link>
              <Link href="/features" className="text-white hover:text-red-200 py-2 font-medium">
                Features
              </Link>
              <Link href="/contact" className="text-white hover:text-red-200 py-2 font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
