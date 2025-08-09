'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, AlertTriangle, DollarSign, Eye } from 'lucide-react'

interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  lowStockProducts: number
  recentOrders: any[]
  topProducts: any[]
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    lowStockProducts: 0,
    recentOrders: [],
    topProducts: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login')
      return
    }

    loadDashboardData()
  }, [user, router])

  const loadDashboardData = () => {
    try {
      // Cargar productos
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      const activeProducts = products.filter((p: any) => p.active)
      const lowStock = products.filter((p: any) => p.stock <= 5)

      // Cargar usuarios
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const customers = users.filter((u: any) => u.role === 'customer')

      // Cargar pedidos
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const totalSales = orders.reduce((sum: number, order: any) => sum + order.total, 0)

      // Productos más vendidos (simulado)
      const topProducts = activeProducts.slice(0, 5).map((product: any) => ({
        ...product,
        sold: Math.floor(Math.random() * 50) + 10
      }))

      setStats({
        totalSales,
        totalOrders: orders.length,
        totalProducts: activeProducts.length,
        totalUsers: customers.length,
        lowStockProducts: lowStock.length,
        recentOrders: orders.slice(-5).reverse(),
        topProducts
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Panel Administrativo</h1>
              <p className="text-gray-600">Bienvenido, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Eye size={20} />
                <span>Ver Tienda</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ventas Totales</p>
                <p className="text-2xl font-bold text-green-600">L {stats.totalSales.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pedidos</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Productos</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Usuarios</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Alertas */}
        {stats.lowStockProducts > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-red-600" size={20} />
              <span className="text-red-800 font-semibold">
                {stats.lowStockProducts} productos con stock bajo
              </span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pedidos Recientes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Pedidos Recientes</h2>
              <button
                onClick={() => router.push('/admin/orders')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todos
              </button>
            </div>
            
            {stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">L {order.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status === 'pending' ? 'Pendiente' :
                         order.status === 'shipped' ? 'Enviado' : 'Entregado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No hay pedidos recientes</p>
            )}
          </div>

          {/* Productos Más Vendidos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Productos Más Vendidos</h2>
              <button
                onClick={() => router.push('/admin/products')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todos
              </button>
            </div>
            
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sold} vendidos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">L {product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enlaces Rápidos */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Gestión Rápida</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/admin/products')}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <Package className="mx-auto mb-3 text-blue-600" size={32} />
              <p className="font-semibold">Productos</p>
            </button>
            
            <button
              onClick={() => router.push('/admin/orders')}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <ShoppingCart className="mx-auto mb-3 text-green-600" size={32} />
              <p className="font-semibold">Pedidos</p>
            </button>
            
            <button
              onClick={() => router.push('/admin/users')}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <Users className="mx-auto mb-3 text-purple-600" size={32} />
              <p className="font-semibold">Usuarios</p>
            </button>
            
            <button
              onClick={() => router.push('/admin/reports')}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <BarChart3 className="mx-auto mb-3 text-orange-600" size={32} />
              <p className="font-semibold">Reportes</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
