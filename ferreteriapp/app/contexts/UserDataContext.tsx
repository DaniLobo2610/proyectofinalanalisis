"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "./AuthContext"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface UserData {
  wishlist: string[]
  favorites: string[]
  notifications: Notification[]
  orders: Order[]
  paymentMethods: PaymentMethod[]
  totalSpent: number
}

interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: "order" | "promotion" | "system"
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  date: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  paymentMethod: string
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface PaymentMethod {
  id: string
  type: "card" | "bank"
  name: string
  details: string
  isDefault: boolean
}

interface UserDataContextType {
  userData: UserData
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  addToFavorites: (productId: string) => void
  removeFromFavorites: (productId: string) => void
  isInFavorites: (productId: string) => boolean
  addNotification: (notification: Omit<Notification, "id">) => void
  markNotificationAsRead: (notificationId: string) => void
  deleteNotification: (notificationId: string) => void
  createOrder: (orderData: Omit<Order, "id" | "date">) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (methodId: string) => void
  setDefaultPaymentMethod: (methodId: string) => void
  addToTotalSpent: (amount: number) => void
  clearUserData: () => void
  isLoading: boolean
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

const defaultUserData: UserData = {
  wishlist: [],
  favorites: [],
  notifications: [],
  orders: [],
  paymentMethods: [],
  totalSpent: 0,
}

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth()
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [isInitialized, setIsInitialized] = useState(false)

  // Create dynamic key based on user
  const userDataKey = user ? `userData_${user.id}` : null

  // Only use localStorage hook when we have a user
  const [storedUserData, setStoredUserData, isLoadingUserData] = useLocalStorage<UserData | null>(
    userDataKey || "userData_temp",
    null,
  )
  const [globalOrders, setGlobalOrders, isLoadingOrders] = useLocalStorage<Order[]>("orders", [])

  // Initialize user data when user changes or data loads
  useEffect(() => {
    if (authLoading || isLoadingUserData || isLoadingOrders) {
      return
    }

    if (user && userDataKey) {
      if (storedUserData) {
        setUserData(storedUserData)
      } else {
        // Initialize new user data
        const initialData: UserData = {
          wishlist: [],
          favorites: [],
          notifications: [
            {
              id: Date.now().toString(),
              title: "¡Bienvenido!",
              message: "Gracias por registrarte en Ferretería El Dieguín",
              date: new Date().toISOString(),
              read: false,
              type: "system",
            },
          ],
          orders: [],
          paymentMethods: [],
          totalSpent: 0,
        }
        setUserData(initialData)
        setStoredUserData(initialData)
      }
    } else {
      // Reset data when user logs out
      setUserData(defaultUserData)
    }

    setIsInitialized(true)
  }, [user, userDataKey, storedUserData, authLoading, isLoadingUserData, isLoadingOrders, setStoredUserData])

  const updateUserData = useCallback(
    (updater: (prev: UserData) => UserData) => {
      if (!user || !userDataKey) return

      setUserData((prev) => {
        const newData = updater(prev)
        // Use setTimeout to avoid synchronous state updates
        setTimeout(() => {
          setStoredUserData(newData)
        }, 0)
        return newData
      })
    },
    [user, userDataKey, setStoredUserData],
  )

  const addToWishlist = useCallback(
    (productId: string) => {
      updateUserData((prev) => ({
        ...prev,
        wishlist: prev.wishlist.includes(productId) ? prev.wishlist : [...prev.wishlist, productId],
      }))
    },
    [updateUserData],
  )

  const removeFromWishlist = useCallback(
    (productId: string) => {
      updateUserData((prev) => ({
        ...prev,
        wishlist: prev.wishlist.filter((id) => id !== productId),
      }))
    },
    [updateUserData],
  )

  const isInWishlist = useCallback(
    (productId: string) => {
      return userData.wishlist.includes(productId)
    },
    [userData.wishlist],
  )

  const addToFavorites = useCallback(
    (productId: string) => {
      updateUserData((prev) => ({
        ...prev,
        favorites: prev.favorites.includes(productId) ? prev.favorites : [...prev.favorites, productId],
      }))
    },
    [updateUserData],
  )

  const removeFromFavorites = useCallback(
    (productId: string) => {
      updateUserData((prev) => ({
        ...prev,
        favorites: prev.favorites.filter((id) => id !== productId),
      }))
    },
    [updateUserData],
  )

  const isInFavorites = useCallback(
    (productId: string) => {
      return userData.favorites.includes(productId)
    },
    [userData.favorites],
  )

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      updateUserData((prev) => ({
        ...prev,
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
          },
          ...prev.notifications,
        ],
      }))
    },
    [updateUserData],
  )

  const markNotificationAsRead = useCallback(
    (notificationId: string) => {
      updateUserData((prev) => ({
        ...prev,
        notifications: prev.notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif,
        ),
      }))
    },
    [updateUserData],
  )

  const deleteNotification = useCallback(
    (notificationId: string) => {
      updateUserData((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((notif) => notif.id !== notificationId),
      }))
    },
    [updateUserData],
  )

  const createOrder = useCallback(
    (orderData: Omit<Order, "id" | "date">) => {
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      }

      updateUserData((prev) => ({
        ...prev,
        orders: [newOrder, ...prev.orders],
      }))

      // Add notification for new order
      setTimeout(() => {
        addNotification({
          title: "Pedido Creado",
          message: `Tu pedido #${newOrder.id} ha sido creado exitosamente`,
          date: new Date().toISOString(),
          read: false,
          type: "order",
        })
      }, 100)

      // Save order globally for admin
      setTimeout(() => {
        setGlobalOrders((prev) => [...prev, newOrder])
      }, 0)
    },
    [updateUserData, addNotification, setGlobalOrders],
  )

  const updateOrderStatus = useCallback(
    (orderId: string, status: Order["status"]) => {
      updateUserData((prev) => ({
        ...prev,
        orders: prev.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
      }))
    },
    [updateUserData],
  )

  const addPaymentMethod = useCallback(
    (method: Omit<PaymentMethod, "id">) => {
      updateUserData((prev) => ({
        ...prev,
        paymentMethods: [
          ...prev.paymentMethods,
          {
            ...method,
            id: Date.now().toString(),
          },
        ],
      }))
    },
    [updateUserData],
  )

  const removePaymentMethod = useCallback(
    (methodId: string) => {
      updateUserData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter((method) => method.id !== methodId),
      }))
    },
    [updateUserData],
  )

  const setDefaultPaymentMethod = useCallback(
    (methodId: string) => {
      updateUserData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.map((method) => ({
          ...method,
          isDefault: method.id === methodId,
        })),
      }))
    },
    [updateUserData],
  )

  const addToTotalSpent = useCallback(
    (amount: number) => {
      updateUserData((prev) => ({
        ...prev,
        totalSpent: prev.totalSpent + amount,
      }))
    },
    [updateUserData],
  )

  const clearUserData = useCallback(() => {
    if (user && userDataKey) {
      setUserData(defaultUserData)
      setTimeout(() => {
        setStoredUserData(null)
      }, 0)
    }
  }, [user, userDataKey, setStoredUserData])

  const isLoading = authLoading || isLoadingUserData || isLoadingOrders || !isInitialized

  return (
    <UserDataContext.Provider
      value={{
        userData,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        addNotification,
        markNotificationAsRead,
        deleteNotification,
        createOrder,
        updateOrderStatus,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        addToTotalSpent,
        clearUserData,
        isLoading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider")
  }
  return context
}
