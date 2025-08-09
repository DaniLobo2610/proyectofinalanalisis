"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navigation from "../components/Navigation"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      router.push("/login")
      return
    }
    router.push("/checkout")
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-gray-400" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">Agrega algunos productos para comenzar tu compra</p>
            <button onClick={() => router.push("/categories")} className="btn-primary">
              Explorar Productos
            </button>
          </div>
        </div>

        <div className="h-20 md:hidden"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
          <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium">
            Vaciar carrito
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-blue-600 font-bold">L {item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-8 text-center font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">L {(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700 mt-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">L {total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold">{total >= 1000 ? "Gratis" : "L 100"}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">L {(total >= 1000 ? total : total + 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {total < 1000 && (
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
                  <p className="text-orange-700 text-sm">
                    Agrega L {(1000 - total).toLocaleString()} más para obtener envío gratis
                  </p>
                </div>
              )}

              <button onClick={handleCheckout} disabled={loading} className="w-full btn-primary disabled:opacity-50">
                {loading ? "Procesando..." : "Proceder al Pago"}
              </button>

              <button
                onClick={() => router.push("/categories")}
                className="w-full mt-3 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
