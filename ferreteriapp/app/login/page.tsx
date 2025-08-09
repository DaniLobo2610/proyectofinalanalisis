"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import Navigation from "../components/Navigation"
import { Eye, EyeOff, Lock, Mail, Phone, ArrowLeft } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotPhone, setForgotPhone] = useState("")
  const [recoveredPassword, setRecoveredPassword] = useState("")
  const [forgotError, setForgotError] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Email o contraseña incorrectos")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotError("")
    setForgotLoading(true)
    setRecoveredPassword("")

    try {
      // Buscar usuario por email y teléfono
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === forgotEmail.toLowerCase() && u.phone === forgotPhone,
      )

      if (foundUser) {
        // Mostrar la contraseña
        setRecoveredPassword(foundUser.password)
      } else {
        setForgotError("No se encontró una cuenta con ese email y teléfono")
      }
    } catch (error) {
      setForgotError("Error al recuperar la contraseña")
    } finally {
      setForgotLoading(false)
    }
  }

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotEmail("")
    setForgotPhone("")
    setRecoveredPassword("")
    setForgotError("")
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-12 w-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Lock className="text-white" size={24} />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Recuperar Contraseña</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Ingresa tu email y teléfono para recuperar tu contraseña
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="forgotEmail"
                      name="forgotEmail"
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="tu@email.com"
                    />
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label htmlFor="forgotPhone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="forgotPhone"
                      name="forgotPhone"
                      type="tel"
                      required
                      value={forgotPhone}
                      onChange={(e) => setForgotPhone(e.target.value)}
                      className="input-field pl-10"
                      placeholder="+504 9999-9999"
                    />
                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                </div>
              </div>

              {forgotError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{forgotError}</div>
              )}

              {recoveredPassword && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <h3 className="text-green-800 font-semibold">¡Contraseña encontrada!</h3>
                  </div>
                  <div className="bg-white border border-green-300 rounded p-3 mt-3">
                    <p className="text-sm text-gray-600 mb-2">Tu contraseña es:</p>
                    <p className="text-lg font-mono font-bold text-green-700 bg-green-50 px-3 py-2 rounded border">
                      {recoveredPassword}
                    </p>
                  </div>
                  <p className="text-sm text-green-700 mt-3">
                    Por seguridad, te recomendamos cambiar tu contraseña después de iniciar sesión.
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={resetForgotPassword}
                  className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Volver</span>
                </button>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotLoading ? "Buscando..." : "Recuperar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="h-20 md:hidden"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Lock className="text-white" size={24} />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                crear una cuenta nueva
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="tu@email.com"
                  />
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 pr-10"
                    placeholder="Tu contraseña"
                  />
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
