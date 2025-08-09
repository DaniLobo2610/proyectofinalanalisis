'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import { CheckCircle, Package, Clock, Truck } from 'lucide-react'

export default function OrderSuccess() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir después de 10 segundos
    const timer = setTimeout(() => {
      router.push('/')
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación en breve.
          </p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">¿Qué sigue?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Preparación</h3>
                <p className="text-sm text-gray-600">Preparamos tu pedido con cuidado</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-orange-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Procesamiento</h3>
                <p className="text-sm text-gray-600">24-48 horas hábiles</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="text-green-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Entrega</h3>
                <p className="text-sm text-gray-600">Entrega en tu domicilio</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/profile')}
              className="btn-primary mr-4"
            >
              Ver Mis Pedidos
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Continuar Comprando
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Serás redirigido automáticamente en 10 segundos...
          </p>
        </div>
      </div>
      
      <div className="h-20 md:hidden"></div>
    </div>
  )
}
