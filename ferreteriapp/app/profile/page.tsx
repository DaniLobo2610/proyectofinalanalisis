"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { useUserData } from "../contexts/UserDataContext"
import Navigation from "../components/Navigation"
import {
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  ShoppingBag,
  Bell,
  Heart,
  Settings,
  Trash2,
  Plus,
  X,
} from "lucide-react"

export default function Profile() {
  const { user, updateProfile, logout, changePassword, deleteAccount } = useAuth()
  const { userData, clearUserData, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useUserData()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState("")
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [paymentData, setPaymentData] = useState({
    type: "card" as "card" | "bank",
    name: "",
    details: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    setProfileData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      postalCode: user.postalCode || "",
    })
  }, [user, router])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(profileData)
    setIsEditing(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const success = await changePassword(passwordData.currentPassword, passwordData.newPassword)

    if (success) {
      alert("Contraseña actualizada exitosamente")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setShowPasswordChange(false)
    } else {
      alert("La contraseña actual es incorrecta")
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteEmail !== user?.email) {
      alert("El email no coincide")
      return
    }

    if (confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      const success = await deleteAccount(deleteEmail)

      if (success) {
        alert("Tu cuenta ha sido eliminada exitosamente")
        router.push("/")
      } else {
        alert("Error al eliminar la cuenta. Intenta nuevamente.")
      }
    }
  }

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault()
    addPaymentMethod({
      ...paymentData,
      isDefault: userData.paymentMethods.length === 0,
    })
    setPaymentData({ type: "card", name: "", details: "" })
    setShowAddPayment(false)
  }

  const formatPrice = (price: number) => `L ${price.toLocaleString()}`

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  if (!user) {
    return null
  }

  const tabs = [
    { id: "profile", label: "Mi Perfil", icon: User },
    { id: "orders", label: "Pedidos", icon: ShoppingBag, badge: userData.orders.length },
    { id: "wishlist", label: "Lista de Deseos", icon: Heart, badge: userData.wishlist.length },
    {
      id: "notifications",
      label: "Notificaciones",
      icon: Bell,
      badge: userData.notifications.filter((n) => !n.read).length,
    },
    { id: "payments", label: "Métodos de Pago", icon: CreditCard },
    { id: "settings", label: "Configuración", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">Total gastado</p>
                  <p className="text-lg font-bold text-blue-800">{formatPrice(userData.totalSpent)}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon size={20} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && tab.badge > 0 && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          activeTab === tab.id ? "bg-white text-blue-600" : "bg-blue-600 text-white"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Mi Perfil */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
                    <button onClick={() => setIsEditing(!isEditing)} className="btn-primary">
                      {isEditing ? "Cancelar" : "Editar"}
                    </button>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                            disabled={!isEditing}
                            className="input-field pl-10"
                          />
                          <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className="input-field pl-10"
                          />
                          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="input-field pl-10"
                          />
                          <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={profileData.postalCode}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, postalCode: e.target.value }))}
                            disabled={!isEditing}
                            className="input-field pl-10"
                          />
                          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          className="input-field pl-10"
                        />
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end">
                        <button type="submit" className="btn-primary">
                          Guardar Cambios
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Pedidos */}
              {activeTab === "orders" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Pedidos</h1>

                  {userData.orders.length > 0 ? (
                    <div className="space-y-4">
                      {userData.orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-800">Pedido #{order.id}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString("es-HN")}
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}
                              >
                                {getStatusText(order.status)}
                              </span>
                              <p className="text-lg font-bold text-gray-800 mt-1">{formatPrice(order.total)}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between text-sm">
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No tienes pedidos</h3>
                      <p className="text-gray-600 mb-6">Cuando realices tu primera compra, aparecerá aquí</p>
                      <button onClick={() => router.push("/categories")} className="btn-primary">
                        Explorar Productos
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Lista de Deseos */}
              {activeTab === "wishlist" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Deseos</h1>

                  {userData.wishlist.length > 0 ? (
                    <div className="text-center py-12">
                      <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {userData.wishlist.length} productos en tu lista
                      </h3>
                      <p className="text-gray-600">Funcionalidad de wishlist próximamente</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Tu lista está vacía</h3>
                      <p className="text-gray-600 mb-6">Agrega productos que te gusten para encontrarlos fácilmente</p>
                      <button onClick={() => router.push("/categories")} className="btn-primary">
                        Explorar Productos
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Notificaciones */}
              {activeTab === "notifications" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Notificaciones</h1>

                  {userData.notifications.length > 0 ? (
                    <div className="space-y-4">
                      {userData.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                              <p className="text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-sm text-gray-500 mt-2">
                                {new Date(notification.date).toLocaleDateString("es-HN")}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                /* deleteNotification(notification.id) */
                              }}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No tienes notificaciones</h3>
                      <p className="text-gray-600">Te notificaremos sobre tus pedidos y ofertas especiales</p>
                    </div>
                  )}
                </div>
              )}

              {/* Métodos de Pago */}
              {activeTab === "payments" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Métodos de Pago</h1>
                    <button onClick={() => setShowAddPayment(true)} className="btn-primary flex items-center space-x-2">
                      <Plus size={20} />
                      <span>Agregar Método</span>
                    </button>
                  </div>

                  {userData.paymentMethods.length > 0 ? (
                    <div className="space-y-4">
                      {userData.paymentMethods.map((method) => (
                        <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CreditCard className="text-gray-400" size={24} />
                              <div>
                                <h3 className="font-semibold text-gray-800">{method.name}</h3>
                                <p className="text-sm text-gray-600">{method.details}</p>
                                {method.isDefault && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Predeterminado
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!method.isDefault && (
                                <button
                                  onClick={() => setDefaultPaymentMethod(method.id)}
                                  className="text-blue-600 hover:text-blue-700 text-sm"
                                >
                                  Hacer predeterminado
                                </button>
                              )}
                              <button
                                onClick={() => removePaymentMethod(method.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No tienes métodos de pago</h3>
                      <p className="text-gray-600 mb-6">Agrega un método de pago para realizar compras más rápido</p>
                    </div>
                  )}
                </div>
              )}

              {/* Configuración */}
              {activeTab === "settings" && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>

                  <div className="space-y-6">
                    {/* Cambiar contraseña */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">Cambiar Contraseña</h3>
                          <p className="text-sm text-gray-600">Actualiza tu contraseña regularmente</p>
                        </div>
                        <button onClick={() => setShowPasswordChange(!showPasswordChange)} className="btn-primary">
                          {showPasswordChange ? "Cancelar" : "Cambiar"}
                        </button>
                      </div>

                      {showPasswordChange && (
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                          <input
                            type="password"
                            placeholder="Contraseña actual"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                            className="input-field"
                            required
                          />
                          <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                            className="input-field"
                            required
                          />
                          <input
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            className="input-field"
                            required
                          />
                          <button type="submit" className="btn-primary">
                            Actualizar Contraseña
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Eliminar cuenta */}
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-red-800">Eliminar Cuenta</h3>
                          <p className="text-sm text-red-600">Esta acción no se puede deshacer</p>
                        </div>
                        <button
                          onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                          {showDeleteConfirm ? "Cancelar" : "Eliminar"}
                        </button>
                      </div>

                      {showDeleteConfirm && (
                        <div className="space-y-4">
                          <p className="text-sm text-red-700">
                            Para confirmar la eliminación, escribe tu email: <strong>{user.email}</strong>
                          </p>
                          <input
                            type="email"
                            placeholder="Confirma tu email"
                            value={deleteEmail}
                            onChange={(e) => setDeleteEmail(e.target.value)}
                            className="input-field"
                          />
                          <button
                            onClick={handleDeleteAccount}
                            disabled={deleteEmail !== user.email}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium"
                          >
                            Confirmar Eliminación
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar método de pago */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Agregar Método de Pago</h2>
              <button onClick={() => setShowAddPayment(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de método</label>
                <select
                  value={paymentData.type}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, type: e.target.value as "card" | "bank" }))}
                  className="input-field"
                >
                  <option value="card">Tarjeta de Crédito/Débito</option>
                  <option value="bank">Transferencia Bancaria</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del método</label>
                <input
                  type="text"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder={paymentData.type === "card" ? "Mi Tarjeta Visa" : "Banco Atlántida"}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detalles</label>
                <input
                  type="text"
                  value={paymentData.details}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, details: e.target.value }))}
                  className="input-field"
                  placeholder={paymentData.type === "card" ? "**** **** **** 1234" : "Cuenta: 123456789"}
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPayment(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Agregar Método
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
