"use client"

import { Droplets, Wind, Thermometer, Gauge, Eye, Sunrise, Sunset } from "lucide-react"

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

interface WeatherCardProps {
  weather: WeatherData | null
  loading?: boolean
  unit: "C" | "F"
}

function LargeWeatherIcon({ type }: { type: string }) {
  switch (type) {
    case "sunny":
      return (
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-2xl shadow-yellow-400/50 animate-pulse" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-16 h-10 bg-white/60 rounded-full blur-sm" />
          <div className="absolute -right-2 top-1/3 w-12 h-8 bg-white/40 rounded-full blur-sm" />
        </div>
      )
    case "partly-cloudy":
      return (
        <div className="relative w-32 h-32">
          <div className="absolute top-0 right-4 w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl shadow-yellow-400/40" />
          <div className="absolute bottom-2 left-0 w-24 h-14 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-lg" />
          <div className="absolute bottom-6 left-4 w-16 h-10 bg-gradient-to-b from-white to-gray-100 rounded-full" />
        </div>
      )
    case "cloudy":
      return (
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute w-28 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-lg" />
          <div className="absolute w-20 h-12 bg-gradient-to-b from-white to-gray-200 rounded-full -top-2 left-2" />
          <div className="absolute w-16 h-10 bg-gradient-to-b from-white to-gray-100 rounded-full top-0 right-2" />
        </div>
      )
    case "rain":
      return (
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute w-28 h-14 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full top-4 shadow-lg" />
          <div className="absolute w-18 h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full top-0 left-4" />
          <div className="absolute bottom-6 left-8 w-2 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="absolute bottom-4 left-14 w-2 h-8 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="absolute bottom-6 left-20 w-2 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      )
    default:
      return null
  }
}

export function WeatherCard({ weather, loading, unit }: WeatherCardProps) {
  const convertTemp = (temp: number) => {
    if (unit === "F") {
      return Math.round((temp * 9/5) + 32)
    }
    return temp
  }

  if (loading) {
    return (
      <div className="w-full rounded-2xl bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 p-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="h-8 w-32 bg-white/30 rounded-lg" />
            <div className="h-5 w-48 bg-white/20 rounded-lg" />
            <div className="h-24 w-36 bg-white/30 rounded-lg mt-4" />
            <div className="h-6 w-24 bg-white/20 rounded-lg" />
          </div>
          <div className="flex-1 space-y-3">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-6 bg-white/20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  const stats = [
    { icon: Thermometer, label: "Feels like", value: `${convertTemp(weather.feelsLike)}°` },
    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%` },
    { icon: Wind, label: "Wind", value: `${weather.windSpeed} km/h` },
    { icon: Gauge, label: "Pressure", value: `${weather.pressure} hPa` },
    { icon: Eye, label: "Visibility", value: `${weather.visibility} km` },
    { icon: Sunrise, label: "Sunrise", value: weather.sunrise },
    { icon: Sunset, label: "Sunset", value: weather.sunset },
  ]

  return (
    <div className="w-full rounded-2xl bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 p-6 transition-all duration-500 hover:bg-white/20">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white">{weather.city}</h2>
          <p className="text-white/70 mt-1">{weather.region}</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-baseline">
              <span className="text-8xl font-light text-white">
                {convertTemp(weather.temperature)}
              </span>
              <span className="text-3xl text-white/60 ml-1">°</span>
              <span className="text-2xl text-white/40 ml-1">{unit}</span>
            </div>
            <div className="ml-auto md:ml-8">
              <LargeWeatherIcon type={weather.icon} />
            </div>
          </div>

          <p className="text-xl text-white mt-4">{weather.description}</p>

          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
            <span className={`w-2 h-2 rounded-full ${
              weather.condition === "good" ? "bg-green-400" : 
              weather.condition === "moderate" ? "bg-yellow-400" : "bg-red-400"
            }`} />
            <span className="text-white text-sm">
              {weather.condition === "good" ? "Good weather" : 
               weather.condition === "moderate" ? "Moderate weather" : "Poor weather"}
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
              <div className="flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-white/60" />
                <span className="text-white/70">{stat.label}</span>
              </div>
              <span className="text-white font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
