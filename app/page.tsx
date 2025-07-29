"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Server,
  Cloud,
  Users,
  Moon,
  Sun,
} from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { AnimatedSection } from "@/components/AnimatedSection"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// Professional 3D Background Components
function GridPlane({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -5, -15]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 20, 20]} />
      <meshStandardMaterial color={isDark ? "#0f172a" : "#1e293b"} transparent opacity={0.3} wireframe={true} />
    </mesh>
  )
}

function FloatingCube({
  position,
  size = 1,
  isDark,
}: { position: [number, number, number]; size?: number; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.2
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={isDark ? "#1e40af" : "#3b82f6"}
          transparent
          opacity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

function FloatingSphere({
  position,
  size = 0.8,
  isDark,
}: { position: [number, number, number]; size?: number; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.12
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.15
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? "#475569" : "#64748b"}
          transparent
          opacity={0.7}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function WireframeBox({
  position,
  size = 1.5,
  isDark,
}: { position: [number, number, number]; size?: number; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.03
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.25 + position[0] * 0.5) * 0.1
    }
  })

  return (
    <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={isDark ? "#cbd5e1" : "#e2e8f0"} transparent opacity={0.4} wireframe={true} />
      </mesh>
    </Float>
  )
}

function MinimalParticles({ count = 30, isDark }: { count?: number; isDark: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4()
        const x = ((i % 6) - 2.5) * 4 + Math.sin(time * 0.1 + i * 0.3) * 0.5
        const y = Math.floor(i / 6) * 2 - 3 + Math.sin(time * 0.15 + i * 0.2) * 0.3
        const z = -8 + Math.sin(time * 0.08 + i * 0.1) * 2
        matrix.setPosition(x, y, z)
        meshRef.current.setMatrixAt(i, matrix)
      }
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial
        color={isDark ? "#64748b" : "#94a3b8"}
        transparent
        opacity={0.8}
        emissive={isDark ? "#64748b" : "#94a3b8"}
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.4} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.6 : 0.8} color="#ffffff" />
      <pointLight position={[-10, 5, 5]} intensity={isDark ? 0.4 : 0.6} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} intensity={isDark ? 0.3 : 0.5} color="#e2e8f0" angle={0.6} />

      {/* Grid Background */}
      <GridPlane isDark={isDark} />

      {/* Minimal Particles */}
      <MinimalParticles count={30} isDark={isDark} />

      {/* Professional Geometric Shapes */}
      <FloatingCube position={[-4, 1, -6]} size={0.8} isDark={isDark} />
      <FloatingCube position={[3, -1, -8]} size={1.2} isDark={isDark} />
      <FloatingCube position={[0, 2, -10]} size={1} isDark={isDark} />

      <FloatingSphere position={[5, 0, -7]} size={0.6} isDark={isDark} />
      <FloatingSphere position={[-3, -2, -5]} size={0.9} isDark={isDark} />

      <WireframeBox position={[2, 3, -12]} size={1.5} isDark={isDark} />
      <WireframeBox position={[-5, 1, -9]} size={1.8} isDark={isDark} />

      <Environment preset="studio" />
    </>
  )
}

// Animated Hero Component
function AnimatedHero({ isDark }: { isDark: boolean }) {
  const {
    elementRef: heroRef,
    isVisible: heroVisible,
  } = useScrollAnimation({ threshold: 0.3 }) as {
    elementRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
  };
  const {
    elementRef: imageRef,
    isVisible: imageVisible,
  } = useScrollAnimation({ threshold: 0.5 }) as {
    elementRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
  };
  const {
    elementRef: titleRef,
    isVisible: titleVisible,
  } = useScrollAnimation({ threshold: 0.5 }) as {
    elementRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
  };
  const {
    elementRef: badgesRef,
    isVisible: badgesVisible,
  } = useScrollAnimation({ threshold: 0.3 }) as {
    elementRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
  };
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <div
          ref={imageRef}
          className={`mb-8 transition-all duration-1000 ease-out ${
            imageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>

          {/* Main image container */}
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-1">
              <div className={`w-full h-full ${isDark ? "bg-gray-800" : "bg-white"} rounded-full overflow-hidden`}>
                <img
                  src="/dane-wetton-vzticETKMYU-unsplash.jpg"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Floating accent dots */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        </div>
        </div>

        <div
          ref={titleRef}
          className={`transition-all duration-1000 ease-out delay-300 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className={`text-5xl md:text-7xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
            Junior Backend Developer
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? "text-gray-300" : "text-gray-600"} mb-8 max-w-2xl mx-auto`}>
            Learning and building scalable server-side solutions with modern technologies
          </p>
        </div>

        <div
          ref={badgesRef}
          className={`transition-all duration-1000 ease-out delay-500 ${
            badgesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge
              variant="secondary"
              className={`text-lg px-4 py-2 ${isDark ? "bg-blue-900/50 text-blue-200 border-blue-700" : "bg-blue-100 text-blue-800 border-blue-200"}`}
            >
              <Server className="w-4 h-4 mr-2" />
              Node.js
            </Badge>
            <Badge
              variant="secondary"
              className={`text-lg px-4 py-2 ${isDark ? "bg-green-900/50 text-green-200 border-green-700" : "bg-green-100 text-green-800 border-green-200"}`}
            >
              <Database className="w-4 h-4 mr-2" />
              PostgreSQL
            </Badge>
            <Badge
              variant="secondary"
              className={`text-lg px-4 py-2 ${isDark ? "bg-orange-900/50 text-orange-200 border-orange-700" : "bg-orange-100 text-orange-800 border-orange-200"}`}
            >
              <Cloud className="w-4 h-4 mr-2" />
              AWS
            </Badge>
            <Badge
              variant="secondary"
              className={`text-lg px-4 py-2 ${isDark ? "bg-purple-900/50 text-purple-200 border-purple-700" : "bg-purple-100 text-purple-800 border-purple-200"}`}
            >
              <Code className="w-4 h-4 mr-2" />
              Python
            </Badge>
          </div>
          <Button
            size="lg"
            onClick={() => (window.location.href = "mailto:yehyaraouf.me@gmail.com")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"}`}
    >
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene isDark={isDark} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50">
          <div
            className={`absolute inset-0 ${isDark ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-xl border-b ${isDark ? "border-gray-700/50" : "border-gray-200/50"} transition-colors duration-500`}
          ></div>
          <div className="relative container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo/Brand */}
              <AnimatedSection animation="slideRight" duration={0.8}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1
                      className={`text-2xl font-bold bg-gradient-to-r ${isDark ? "from-white to-blue-200" : "from-gray-900 to-blue-800"} bg-clip-text text-transparent`}
                    >
                      John Doe
                    </h1>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} -mt-1`}>
                      Junior Backend Developer
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Desktop Navigation */}
              <AnimatedSection animation="slideLeft" duration={0.8} delay={0.2}>
                <div className="hidden md:flex items-center space-x-8">
                  <button
                    onClick={() => scrollToSection("about")}
                    className={`relative ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} transition-all duration-300 group font-medium`}
                  >
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => scrollToSection("skills")}
                    className={`relative ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} transition-all duration-300 group font-medium`}
                  >
                    Skills
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => scrollToSection("experience")}
                    className={`relative ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} transition-all duration-300 group font-medium`}
                  >
                    Experience
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className={`relative ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} transition-all duration-300 group font-medium`}
                  >
                    Projects
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`relative ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} transition-all duration-300 group font-medium`}
                  >
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></span>
                  </button>

                  {/* Theme Toggle */}
                  <Button
                    onClick={toggleTheme}
                    variant="ghost"
                    size="sm"
                    className={`${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"} p-2 rounded-lg transition-all duration-300`}
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>

                  {/* CTA Button */}
                  <Button
                    onClick={() => (window.location.href = "mailto:yehyaraouf.me@gmail.com")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                  >
                    Hire Me
                  </Button>
                </div>
              </AnimatedSection>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="sm"
                  className={`${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"} p-2`}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <AnimatedHero isDark={isDark} />

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <AnimatedSection animation="slideUp" duration={0.8}>
              <div className="text-center mb-12">
                <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>About Me</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-8">
              {/* Main Content */}
              <div className="">
                <AnimatedSection animation="slideLeft" duration={0.8} delay={0.2}>
                  <div
                    className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border ${isDark ? "border-gray-700/50" : "border-gray-200/50"} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500`}
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                          Hello, I'm John
                        </h3>
                        <p className={`${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-4`}>
                          I'm a passionate junior backend developer with 2 years of experience building web applications
                          and APIs. I enjoy learning new technologies and solving problems through clean, efficient
                          code.
                        </p>
                        <p className={`${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                          Currently focused on mastering Node.js and Python while expanding my knowledge in cloud
                          technologies and database design. I'm eager to contribute to meaningful projects and grow as a
                          developer.
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div
                        className={`grid grid-cols-3 gap-4 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">2+</div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Years Experience
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">15+</div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Projects Done</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">8+</div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Technologies</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection animation="slideUp" duration={0.8}>
              <div className="text-center mb-10">
                <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                  Skills & Expertise
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <AnimatedSection animation="slideLeft" duration={0.8} delay={0.2}>
                <div
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border ${isDark ? "border-gray-700/50" : "border-gray-200/50"} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        Technical Skills
                      </h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Development & Tools</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        name: "Node.js & Express",
                        level: "Advanced",
                        color: isDark
                          ? "bg-green-900/50 text-green-200 border-green-700"
                          : "bg-green-100 text-green-800 border-green-200",
                      },
                      {
                        name: "Python & Django",
                        level: "Intermediate",
                        color: isDark
                          ? "bg-blue-900/50 text-blue-200 border-blue-700"
                          : "bg-blue-100 text-blue-800 border-blue-200",
                      },
                      {
                        name: "PostgreSQL",
                        level: "Intermediate",
                        color: isDark
                          ? "bg-indigo-900/50 text-indigo-200 border-indigo-700"
                          : "bg-indigo-100 text-indigo-800 border-indigo-200",
                      },
                      {
                        name: "REST APIs",
                        level: "Advanced",
                        color: isDark
                          ? "bg-purple-900/50 text-purple-200 border-purple-700"
                          : "bg-purple-100 text-purple-800 border-purple-200",
                      },
                      {
                        name: "Git & GitHub",
                        level: "Advanced",
                        color: isDark
                          ? "bg-pink-900/50 text-pink-200 border-pink-700"
                          : "bg-pink-100 text-pink-800 border-pink-200",
                      },
                      {
                        name: "Docker",
                        level: "Beginner",
                        color: isDark
                          ? "bg-orange-900/50 text-orange-200 border-orange-700"
                          : "bg-orange-100 text-orange-800 border-orange-200",
                      },
                    ].map((skill, index) => (
                      <div
                        key={skill.name}
                        className={`flex items-center justify-between p-4 rounded-xl ${isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50/50"} transition-colors duration-300 group border ${isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-100 hover:border-gray-200"}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                          <span
                            className={`text-base font-medium ${isDark ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"} transition-colors duration-300`}
                          >
                            {skill.name}
                          </span>
                        </div>
                        <Badge variant="outline" className={`${skill.color} font-medium px-3 py-1`}>
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Soft Skills */}
              <AnimatedSection animation="slideRight" duration={0.8} delay={0.3}>
                <div
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border ${isDark ? "border-gray-700/50" : "border-gray-200/50"} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        Soft Skills
                      </h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Personal & Professional</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: "Problem Solving", color: "from-purple-400 to-purple-600" },
                      { name: "Team Collaboration", color: "from-pink-400 to-pink-600" },
                      { name: "Quick Learning", color: "from-indigo-400 to-indigo-600" },
                      { name: "Communication", color: "from-blue-400 to-blue-600" },
                      { name: "Time Management", color: "from-green-400 to-green-600" },
                      { name: "Attention to Detail", color: "from-orange-400 to-orange-600" },
                    ].map((skill, index) => (
                      <div
                        key={skill.name}
                        className={`flex items-center p-4 rounded-xl ${isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50/50"} transition-colors duration-300 group border ${isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-100 hover:border-gray-200"}`}
                      >
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${skill.color} rounded-full mr-3 shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                        ></div>
                        <span
                          className={`text-base font-medium ${isDark ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"} transition-colors duration-300`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection animation="slideUp" duration={0.8}>
              <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} text-center mb-12`}>
                Experience
              </h2>
            </AnimatedSection>
            <div className="space-y-8">
              <AnimatedSection animation="slideLeft" duration={0.8} delay={0.1}>
                <Card
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md ${isDark ? "border-gray-700/50" : "border-gray-200/50"} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
                          Senior Backend Developer
                        </CardTitle>
                        <CardDescription className="text-blue-600 font-medium">TechCorp Inc.</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${isDark ? "text-gray-300 border-gray-600" : "text-gray-600 border-gray-300"}`}
                      >
                        2022 - Present
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className={`list-disc list-inside space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <li>Led development of microservices architecture serving 1M+ users</li>
                      <li>Optimized database queries reducing response time by 60%</li>
                      <li>Implemented CI/CD pipelines using Docker and Kubernetes</li>
                      <li>Mentored junior developers and conducted code reviews</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"}
                      >
                        Node.js
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"}
                      >
                        PostgreSQL
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-red-900/50 text-red-200" : "bg-red-100 text-red-800"}
                      >
                        Redis
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-orange-900/50 text-orange-200" : "bg-orange-100 text-orange-800"}
                      >
                        AWS
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="slideRight" duration={0.8} delay={0.2}>
                <Card
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md ${isDark ? "border-gray-700/50" : "border-gray-200/50"} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
                          Backend Developer
                        </CardTitle>
                        <CardDescription className="text-blue-600 font-medium">StartupXYZ</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${isDark ? "text-gray-300 border-gray-600" : "text-gray-600 border-gray-300"}`}
                      >
                        2020 - 2022
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className={`list-disc list-inside space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <li>Built RESTful APIs and GraphQL endpoints</li>
                      <li>Designed and implemented database schemas</li>
                      <li>Integrated third-party payment systems</li>
                      <li>Implemented real-time features using WebSockets</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-yellow-900/50 text-yellow-200" : "bg-yellow-100 text-yellow-800"}
                      >
                        Python
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"}
                      >
                        Django
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"}
                      >
                        MongoDB
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"}
                      >
                        Docker
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="slideLeft" duration={0.8} delay={0.3}>
                <Card
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md ${isDark ? "border-gray-700/50" : "border-gray-200/50"} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
                          Junior Developer
                        </CardTitle>
                        <CardDescription className="text-blue-600 font-medium">WebSolutions Ltd.</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${isDark ? "text-gray-300 border-gray-600" : "text-gray-600 border-gray-300"}`}
                      >
                        2019 - 2020
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className={`list-disc list-inside space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <li>Developed web applications using PHP and MySQL</li>
                      <li>Participated in agile development processes</li>
                      <li>Fixed bugs and implemented new features</li>
                      <li>Collaborated with frontend developers</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-purple-900/50 text-purple-200" : "bg-purple-100 text-purple-800"}
                      >
                        PHP
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-red-900/50 text-red-200" : "bg-red-100 text-red-800"}
                      >
                        Laravel
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"}
                      >
                        MySQL
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={isDark ? "bg-gray-700/50 text-gray-200" : "bg-gray-100 text-gray-800"}
                      >
                        Git
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection animation="slideUp" duration={0.8}>
              <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} text-center mb-12`}>
                Projects
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce API",
                  description: "Scalable REST API for e-commerce platform",
                  content:
                    "Built a comprehensive e-commerce API with user authentication, product management, order processing, and payment integration.",
                  badges: ["Node.js", "Express", "MongoDB", "Stripe"],
                  colors: ["green", "blue", "green", "purple"],
                },
                {
                  title: "Real-time Chat System",
                  description: "WebSocket-based messaging platform",
                  content:
                    "Developed a real-time chat application with rooms, private messaging, file sharing, and user presence indicators.",
                  badges: ["Socket.io", "Redis", "PostgreSQL", "JWT"],
                  colors: ["yellow", "red", "blue", "green"],
                },
                {
                  title: "Task Management API",
                  description: "Project management backend system",
                  content:
                    "Created a robust task management system with team collaboration, project tracking, and automated notifications.",
                  badges: ["Python", "FastAPI", "PostgreSQL", "Celery"],
                  colors: ["yellow", "green", "blue", "red"],
                },
                {
                  title: "Analytics Dashboard API",
                  description: "Data processing and visualization backend",
                  content:
                    "Built a high-performance analytics API that processes large datasets and provides real-time insights and reporting.",
                  badges: ["Go", "InfluxDB", "Kafka", "Docker"],
                  colors: ["blue", "orange", "purple", "blue"],
                },
                {
                  title: "Microservices Platform",
                  description: "Distributed system architecture",
                  content:
                    "Designed and implemented a microservices architecture with service discovery, load balancing, and fault tolerance.",
                  badges: ["Kubernetes", "gRPC", "Consul", "Prometheus"],
                  colors: ["blue", "green", "purple", "orange"],
                },
                {
                  title: "Authentication Service",
                  description: "Secure user authentication system",
                  content:
                    "Developed a comprehensive authentication service with OAuth2, 2FA, and role-based access control.",
                  badges: ["OAuth2", "JWT", "RBAC", "2FA"],
                  colors: ["green", "blue", "purple", "red"],
                },
              ].map((project, index) => (
                <AnimatedSection key={project.title} animation="scale" duration={0.6} delay={index * 0.1}>
                  <Card
                    className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md ${isDark ? "border-gray-700/50" : "border-gray-200/50"} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full`}
                  >
                    <CardHeader>
                      <CardTitle
                        className={`flex items-center justify-between ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {project.title}
                        <ExternalLink className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                      </CardTitle>
                      <CardDescription className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>{project.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.badges.map((badge, badgeIndex) => (
                          <Badge
                            key={badge}
                            variant="secondary"
                            className={
                              isDark
                                ? `bg-${project.colors[badgeIndex]}-900/50 text-${project.colors[badgeIndex]}-200`
                                : `bg-${project.colors[badgeIndex]}-100 text-${project.colors[badgeIndex]}-800`
                            }
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${isDark ? "text-gray-300 border-gray-600 hover:bg-gray-700" : "text-gray-700 border-gray-300 hover:bg-gray-50"} bg-transparent hover:scale-105 transition-all duration-200`}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${isDark ? "text-gray-300 border-gray-600 hover:bg-gray-700" : "text-gray-700 border-gray-300 hover:bg-gray-50"} bg-transparent hover:scale-105 transition-all duration-200`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection animation="slideUp" duration={0.8}>
              <div className="text-center mb-12">
                <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Get In Touch</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
                <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
                  Ready to bring your ideas to life? Let's connect and discuss how we can work together.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <AnimatedSection animation="slideLeft" duration={0.8} delay={0.2}>
                <div
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border ${isDark ? "border-gray-700/50" : "border-gray-200/50"} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full`}
                >
                  <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div
                      className={`flex items-center space-x-4 p-3 rounded-lg ${isDark ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50"} transition-colors duration-300 group`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} font-medium`}>Email</p>
                        <p className={`${isDark ? "text-white" : "text-gray-900"} font-semibold`}>john.doe@email.com</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-4 p-3 rounded-lg ${isDark ? "hover:bg-green-900/20" : "hover:bg-green-50/50"} transition-colors duration-300 group`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} font-medium`}>Phone</p>
                        <p className={`${isDark ? "text-white" : "text-gray-900"} font-semibold`}>+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-4 p-3 rounded-lg ${isDark ? "hover:bg-purple-900/20" : "hover:bg-purple-50/50"} transition-colors duration-300 group`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} font-medium`}>Location</p>
                        <p className={`${isDark ? "text-white" : "text-gray-900"} font-semibold`}>San Francisco, CA</p>
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className={`mt-6 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          Quick Response
                        </p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          Usually responds within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Connect & Status */}
              <AnimatedSection animation="slideRight" duration={0.8} delay={0.3}>
                <div
                  className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border ${isDark ? "border-gray-700/50" : "border-gray-200/50"} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full`}
                >
                  <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
                    Let's Connect
                  </h3>

                  {/* Social Links */}
                  <div className="space-y-4 mb-6">
                    <a
                      href="#"
                      className={`flex items-center space-x-4 p-3 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors duration-300 group`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Github className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} font-medium`}>GitHub</p>
                        <p className={`${isDark ? "text-white" : "text-gray-900"} font-semibold`}>@johndoe</p>
                      </div>
                    </a>

                    <a
                      href="#"
                      className={`flex items-center space-x-4 p-3 rounded-lg ${isDark ? "hover:bg-blue-900/20" : "hover:bg-blue-50"} transition-colors duration-300 group`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Linkedin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} font-medium`}>LinkedIn</p>
                        <p className={`${isDark ? "text-white" : "text-gray-900"} font-semibold`}>@johndoe</p>
                      </div>
                    </a>
                  </div>

                  {/* Availability */}
                  <div
                    className={`${isDark ? "bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-700/50" : "bg-gradient-to-r from-green-50 to-blue-50 border-green-200/50"} p-4 rounded-lg border mb-6`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                          Available for Work
                        </p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          Open to new opportunities and collaborations
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preferred Contact */}
                  <div className={`pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                        Preferred Contact Method
                      </p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Email for detailed discussions, LinkedIn for professional networking
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
