import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import type { LucideIcon } from "lucide-react"

interface SoftSkillProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export function SoftSkill({ icon: Icon, title, description, delay = 0 }: SoftSkillProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 group">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
