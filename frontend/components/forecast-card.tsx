"use client"

import { ArrowRight } from "lucide-react"

interface ForecastDay {
  day: string
  condition: string
  high: number
  low: number
  icon: "sunny" | "partly-cloudy" | "cloudy" | "rain"
}

interface ForecastCardProps {
  forecast: ForecastDay[]
  unit: "C" | "F"
}

function WeatherIcon({ type, size = "md" }: { type: string; size?: "sm" | "md" }) {
  const sizeClasses = size === "sm" ? "w-10 h-10" : "w-12 h-12"
  
  switch (type) {
    case "sunny":
      return (
        <div className={`${sizeClasses} relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg shadow-yellow-400/50" />
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full" />
        </div>
      )
    case "partly-cloudy":
      return (
        <div className={`${sizeClasses} relative`}>
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg shadow-yellow-400/30" />
          <div className="absolute bottom-0 left-0 w-8 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full" />
          <div className="absolute bottom-1 left-2 w-6 h-4 bg-gradient-to-b from-white to-gray-100 rounded-full" />
        </div>
      )
    case "cloudy":
      return (
        <div className={`${sizeClasses} relative flex items-center justify-center`}>
          <div className="absolute w-10 h-6 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full" />
          <div className="absolute w-7 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full -top-1 left-1" />
        </div>
      )
    case "rain":
      return (
        <div className={`${sizeClasses} relative flex items-center justify-center`}>
          <div className="absolute w-10 h-5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full top-0" />
          <div className="absolute w-7 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full -top-1 left-0" />
          <div className="absolute bottom-0 left-2 w-1 h-2 bg-blue-400 rounded-full" />
          <div className="absolute bottom-1 left-4 w-1 h-3 bg-blue-400 rounded-full" />
          <div className="absolute bottom-0 left-6 w-1 h-2 bg-blue-400 rounded-full" />
        </div>
      )
    default:
      return null
  }
}

export function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const convertTemp = (temp: number) => {
    if (unit === "F") {
      return Math.round((temp * 9/5) + 32)
    }
    return temp
  }

  return (
    <div className="w-full rounded-2xl bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">5-Day Forecast</h3>
        <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm">
          View More
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
          >
            <span className="text-white font-medium text-sm">{day.day}</span>
            <WeatherIcon type={day.icon} size="sm" />
            <span className="text-white/70 text-xs text-center">{day.condition}</span>
            <span className="text-white text-sm font-medium">
              {convertTemp(day.high)}° / {convertTemp(day.low)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
