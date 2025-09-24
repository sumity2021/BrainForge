"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, History, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Brain className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BrainForge
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === "/"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate</span>
            </Link>

            <Link
              href="/history"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === "/history"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </Link>

            {/* User Button */}
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 ring-2 ring-blue-100 hover:ring-blue-200 transition-all",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
