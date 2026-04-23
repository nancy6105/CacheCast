"use client"

import { Sun, Moon, Menu, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

interface HeaderProps {
  unit: "C" | "F"
  onUnitChange: (unit: "C" | "F") => void
}

export function Header({ unit, onUnitChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [showUnitDropdown, setShowUnitDropdown] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full" />
          <div className="absolute top-1 right-0 w-6 h-6 bg-white/80 rounded-full" />
        </div>
        <span className="text-white font-semibold text-lg">Weatherly</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUnitDropdown(!showUnitDropdown)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <span>°{unit}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {showUnitDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden">
              <button
                onClick={() => { onUnitChange("C"); setShowUnitDropdown(false) }}
                className={`block w-full px-4 py-2 text-left text-white hover:bg-white/20 transition-all ${unit === "C" ? "bg-white/20" : ""}`}
              >
                °C
              </button>
              <button
                onClick={() => { onUnitChange("F"); setShowUnitDropdown(false) }}
                className={`block w-full px-4 py-2 text-left text-white hover:bg-white/20 transition-all ${unit === "F" ? "bg-white/20" : ""}`}
              >
                °F
              </button>
            </div>
          )}
        </div>

        <button
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
