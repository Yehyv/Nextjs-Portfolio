"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useEffect, useState } from "react"

interface SkillBarProps {
  skill: string
  percentage: number
  color?: string
  delay?: number
}

export function SkillBar({ skill, percentage, color = "blue", delay = 0 }: SkillBarProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, delay])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      indigo: "bg-indigo-500",
      pink: "bg-pink-500",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div ref={elementRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getColorClasses(color)}`}
          style={{
            width: `${animatedPercentage}%`,
            transition: "width 1000ms ease-out",
          }}
        />
      </div>
    </div>
  )
}
