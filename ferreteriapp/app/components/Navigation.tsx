"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { Home, Grid3X3, ShoppingCart, User, Menu, X, LogOut, Search, Settings } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { user, logout, isLoading: authLoading } = useAuth()
  const { itemCount, isLoading: cartLoading } = useCart()

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    logout()
    setShowLogoutConfirm(false)
    setIsMenuOpen(false)
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/search", label: "Buscar", icon: Search },
    { href: "/categories", label: "Categorías", icon: Grid3X3 },
    { href: "/cart", label: "Carrito", icon: ShoppingCart, badge: cartLoading ? 0 : itemCount },
    { href: user ? "/profile" : "/login", label: user ? "Perfil" : "Ingresar", icon: User },
  ]

  // Agregar enlace de administrador solo para superadmin
  if (user?.role === "superadmin") {
    navItems.splice(4, 0, {
      href: "/superadmin",
      label: "Administrador",
      icon: Settings,
    })
  }

  // Mostrar loading state
  if (authLoading) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Ferretería el Dieguín</span>
            </Link>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Ferretería el Dieguín</span>
            </Link>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Salir</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-md sticky top-0 z-50">
          <div className="flex items-center justify-between px-4 h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-lg font-bold text-gray-800">el Dieguín</span>
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="bg-white border-t">
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 py-3 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {user && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 py-3 text-gray-600 hover:text-red-600 transition-colors w-full"
                  >
                    <LogOut size={20} />
                    <span>Salir</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition-colors relative"
              >
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="text-red-600" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">¿Cerrar Sesión?</h2>
              <p className="text-gray-600 mb-6">¿Estás seguro de que quieres cerrar tu sesión?</p>

              <div className="flex space-x-4">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
