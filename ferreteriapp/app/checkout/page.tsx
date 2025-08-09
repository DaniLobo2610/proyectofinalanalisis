'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useUserData } from '../contexts/UserDataContext'
import { CreditCard, Truck, MapPin, Phone, Mail, User } from 'lucide-react'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const { createOrder, addToTotalSpent, userData } = useUserData()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'transfer'
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    if (items.length === 0) {
      router.push('/cart')
      return
    }

    // Pre-llenar con datos del usuario
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      paymentMethod: 'transfer'
    })
  }, [user, items, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const finalTotal = total >= 1000 ? total : total + 100

      // Crear el pedido
      createOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: finalTotal,
        status: 'pending',
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        paymentMethod: formData.paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 'Pago Contra Entrega'
      })

      // Agregar al total gastado
      addToTotalSpent(finalTotal)

      // Limpiar el carrito
      clearCart()

      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Redirigir a confirmación
      router.push('/order-success')
    } catch (error) {
      console.error('Error processing order:', error)
      alert('Error al procesar el pedido. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => `L ${price.toLocaleString()}`
  const shippingCost = total >= 1000 ? 0 : 100
  const finalTotal = total + shippingCost

  if (!user || items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Información de Entrega</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field pl-10"
                    />
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field pl-10"
                    />
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field pl-10"
                      placeholder="+504 9999-9999"
                    />
                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección de entrega
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="input-field pl-10"
                      placeholder="Dirección completa"
                    />
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Método de pago
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="mr-3"
                      />
                      <div className="flex items-center space-x-3">
                        <CreditCard className="text-blue-600" size={24} />
                        <div>
                          <p className="font-semibold">Transferencia Bancaria</p>
                          <p className="text-sm text-gray-600">Pago por transferencia o depósito</p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="mr-3"
                      />
                      <div className="flex items-center space-x-3">
                        <Truck className="text-green-600" size={24} />
                        <div>
                          <p className="font-semibold">Pago Contra Entrega</p>
                          <p className="text-sm text-gray-600">Paga cuando recibas tu pedido</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Procesando...' : `Confirmar Pedido - ${formatPrice(finalTotal)}`}
                </button>
              </form>
            </div>

            {/* Resumen del pedido */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                  </span>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {total < 1000 && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-700 text-sm">
                    Agrega {formatPrice(1000 - total)} más para obtener envío gratis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-20 md:hidden"></div>
    </div>
  )
}
