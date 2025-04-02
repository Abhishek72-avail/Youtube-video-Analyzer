import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            © {currentYear} YouTube Video Analyzer. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-sm text-gray-500 hover:text-gray-700">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-sm text-gray-500 hover:text-gray-700">About</a>
            </Link>
            <Link href="/privacy">
              <a className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
