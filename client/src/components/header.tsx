import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { History, Play } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="bg-white p-2 rounded-full mr-3 shadow-md">
              <svg
                className="h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                YouTube Video Analyzer
              </h1>
              <p className="text-red-200 text-sm hidden md:block">Discover if videos are worth your time</p>
            </div>
          </div>
        </Link>
        <div>
          <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-white text-primary hover:bg-red-50">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
