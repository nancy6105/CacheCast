"use client"

import { useState } from "react"
import { SearchForm } from "@/components/search-form"
import { WeatherCard } from "@/components/weather-card"
import { ForecastCard } from "@/components/forecast-card"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { RefreshCw, Heart, Star } from "lucide-react"

interface WeatherData {
  city: string
  region: string
  temperature: number
  feelsLike: number
  humidity: number
  description: string
  condition: "good" | "moderate" | "poor"
  windSpeed: number
  pressure: number
  visibility: number
  sunrise: string
  sunset: string
  icon: "sunny" | "partly-cloudy" | "cloudy" | "rain"
}

interface ForecastDay {
  day: string
  condition: string
  high: number
  low: number
  icon: "sunny" | "partly-cloudy" | "cloudy" | "rain"
}

const mockWeatherData: Record<string, WeatherData> = {
  "agra": {
    city: "Agra",
    region: "Uttar Pradesh, India",
    temperature: 18,
    feelsLike: 18,
    humidity: 50,
    description: "Clear Sky",
    condition: "good",
    windSpeed: 18,
    pressure: 1015,
    visibility: 10,
    sunrise: "05:52 AM",
    sunset: "06:50 PM",
    icon: "sunny",
  },
  "new york": {
    city: "New York",
    region: "New York, USA",
    temperature: 22,
    feelsLike: 20,
    humidity: 65,
    description: "Partly Cloudy",
    condition: "good",
    windSpeed: 12,
    pressure: 1018,
    visibility: 15,
    sunrise: "06:15 AM",
    sunset: "07:45 PM",
    icon: "partly-cloudy",
  },
  "london": {
    city: "London",
    region: "England, UK",
    temperature: 15,
    feelsLike: 13,
    humidity: 78,
    description: "Light Rain",
    condition: "moderate",
    windSpeed: 18,
    pressure: 1008,
    visibility: 8,
    sunrise: "05:45 AM",
    sunset: "08:30 PM",
    icon: "rain",
  },
  "tokyo": {
    city: "Tokyo",
    region: "Kanto, Japan",
    temperature: 28,
    feelsLike: 30,
    humidity: 70,
    description: "Sunny",
    condition: "good",
    windSpeed: 8,
    pressure: 1012,
    visibility: 20,
    sunrise: "04:30 AM",
    sunset: "06:50 PM",
    icon: "sunny",
  },
  "paris": {
    city: "Paris",
    region: "Ile-de-France, France",
    temperature: 19,
    feelsLike: 18,
    humidity: 55,
    description: "Clear Sky",
    condition: "good",
    windSpeed: 10,
    pressure: 1020,
    visibility: 18,
    sunrise: "06:00 AM",
    sunset: "09:15 PM",
    icon: "sunny",
  },
  "sydney": {
    city: "Sydney",
    region: "NSW, Australia",
    temperature: 24,
    feelsLike: 25,
    humidity: 60,
    description: "Mostly Sunny",
    condition: "good",
    windSpeed: 15,
    pressure: 1016,
    visibility: 25,
    sunrise: "06:45 AM",
    sunset: "05:15 PM",
    icon: "partly-cloudy",
  },
}

const mockForecast: ForecastDay[] = [
  { day: "Today", condition: "Clear Sky", high: 18, low: 9, icon: "sunny" },
  { day: "Fri", condition: "Partly Cloudy", high: 20, low: 11, icon: "partly-cloudy" },
  { day: "Sat", condition: "Cloudy", high: 19, low: 12, icon: "cloudy" },
  { day: "Sun", condition: "Light Rain", high: 17, low: 10, icon: "rain" },
  { day: "Mon", condition: "Sunny", high: 21, low: 11, icon: "sunny" },
]

function mapIcon(desc: string) {
  const d = desc.toLowerCase()

  if (d.includes("rain")) return "rain"
  if (d.includes("cloud")) return "cloudy"
  if (d.includes("clear")) return "sunny"
  return "partly-cloudy"
}
function WeatherApp() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [unit, setUnit] = useState<"C" | "F">("C")

  const handleSearch = async () => {
  if (!city.trim()) return

  setLoading(true)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/weather/${city}`
    )

    if (!res.ok) throw new Error("City not found")

    const data = await res.json()

    setWeather({
  city: data.city ?? city,
  region: "India",
  temperature: data.temperature ?? 0,
  feelsLike: data.feelsLike ?? data.temperature ?? 0,
  humidity: data.humidity ?? 0,
  description: data.description ?? "Unknown",
  condition: "good",
  windSpeed: data.windSpeed ?? 0,
  pressure: data.pressure ?? 1010,
  visibility: data.visibility ?? 10,
  sunrise: data.sunrise ?? "06:00 AM",
  sunset: data.sunset ?? "06:30 PM",
  icon: mapIcon(data.description ?? ""),
})
  } catch (err) {
    console.error(err)
    alert("❌ City not found or backend error")
    setWeather(null)
  }

  setLoading(false)
}

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-500" />
      
      {/* Decorative glowing orbs */}
      <div className="absolute top-10 right-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/3 w-56 h-56 bg-pink-400/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 min-h-screen">
        <Header unit={unit} onUnitChange={setUnit} />
        
        <div className="pt-24 pb-20 px-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-6">
            {/* Title Section */}
            <div className="text-center space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                Weather
              </h1>
              <p className="text-white/80 text-lg">
                Check the current weather in any city
              </p>
            </div>

            {/* Search Form */}
            <div className="mt-6">
              <SearchForm
                city={city}
                onCityChange={setCity}
                onSearch={handleSearch}
                loading={loading}
              />
            </div>

            {/* Weather Card */}
            {(weather || loading) && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <WeatherCard weather={weather} loading={loading} unit={unit} />
              </div>
            )}

            {/* 5-Day Forecast */}
            {weather && !loading && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <ForecastCard forecast={mockForecast} unit={unit} />
              </div>
            )}
          </div>
        </div>

        {/* Footer Elements */}
        <div className="fixed bottom-6 left-6 z-20">
          <button 
            onClick={handleSearch}
            disabled={loading || !weather}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/80 text-sm">Stay updated with accurate weather information</span>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-20">
          <button 
            className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30 transition-all"
            aria-label="Favorite"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WeatherApp />
    </ThemeProvider>
  )
}
