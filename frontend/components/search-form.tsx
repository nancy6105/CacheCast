"use client"

import { Search, Loader2, MapPin } from "lucide-react"

interface SearchFormProps {
  city: string
  onCityChange: (city: string) => void
  onSearch: () => void
  loading?: boolean
}

export function SearchForm({ city, onCityChange, onSearch, loading }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto">
      <div className="relative flex-1 flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 rounded-l-2xl overflow-hidden">
        <MapPin className="absolute left-4 h-5 w-5 text-white/70" />
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={loading}
          className="w-full h-14 pl-12 pr-4 bg-transparent text-white placeholder:text-white/60 text-base outline-none disabled:opacity-50"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading || !city.trim()}
        className="h-14 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all rounded-r-2xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
        <span>Search</span>
      </button>
    </form>
  )
}
