"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "customer" | "superadmin"
  phone?: string
  address?: string
  postalCode?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
  updateProfile: (userData: Partial<User>) => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  deleteAccount: (email: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialUsers = [
  {
    id: "1",
    email: "admin@ferreteria.com",
    password: "admin123",
    name: "Administrador",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "cliente@email.com",
    password: "cliente123",
    name: "Juan Pérez",
    role: "customer" as const,
    phone: "+504 9999-9999",
    address: "Comayagua, Honduras",
  },
  {
    id: "3",
    email: "danilobo2018@gmail.com",
    password: "admin123456",
    name: "Diego Martínez",
    role: "superadmin" as const,
    phone: "+504 2772-0000",
    address: "Comayagua, Barrio Arriba, media cuadra arriba del parque central, Comayagua, Honduras C.A.",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const [currentUser, setCurrentUser, isLoadingUser] = useLocalStorage<User | null>("currentUser", null)
  const [users, setUsers, isLoadingUsers] = useLocalStorage<any[]>("users", [])

  // Initialize users and current user
  useEffect(() => {
    if (isLoadingUser || isLoadingUsers) {
      return
    }

    // Initialize users if empty
    if (users.length === 0) {
      setUsers(initialUsers)
    }

    // Set current user if exists
    if (currentUser) {
      setUser(currentUser)
    }

    setIsInitialized(true)
  }, [isLoadingUser, isLoadingUsers, users.length, currentUser, setUsers])

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const foundUser = users.find((u: any) => u.email === email && u.password === password)

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          setCurrentUser(userWithoutPassword)
          return true
        }
        return false
      } catch (error) {
        console.error("Login error:", error)
        return false
      }
    },
    [users, setCurrentUser],
  )

  const register = useCallback(
    async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
      try {
        const existingUser = users.find((u: any) => u.email === userData.email)

        if (existingUser) {
          return false // Usuario ya existe
        }

        const newUser = {
          ...userData,
          id: Date.now().toString(),
        }

        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)

        const { password: _, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)
        setCurrentUser(userWithoutPassword)
        return true
      } catch (error) {
        console.error("Register error:", error)
        return false
      }
    },
    [users, setUsers, setCurrentUser],
  )

  const logout = useCallback(() => {
    setUser(null)
    setCurrentUser(null)
  }, [setCurrentUser])

  const updateProfile = useCallback(
    (userData: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
        setCurrentUser(updatedUser)

        // Update in users list
        const userIndex = users.findIndex((u: any) => u.id === user.id)
        if (userIndex !== -1) {
          const updatedUsers = [...users]
          updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...userData }
          setUsers(updatedUsers)
        }
      }
    },
    [user, users, setCurrentUser, setUsers],
  )

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<boolean> => {
      if (!user) return false

      try {
        const userIndex = users.findIndex((u: any) => u.id === user.id)

        if (userIndex === -1) return false

        // Verify current password
        if (users[userIndex].password !== currentPassword) {
          return false
        }

        // Update password
        const updatedUsers = [...users]
        updatedUsers[userIndex].password = newPassword
        setUsers(updatedUsers)

        return true
      } catch (error) {
        console.error("Error changing password:", error)
        return false
      }
    },
    [user, users, setUsers],
  )

  const deleteAccount = useCallback(
    async (email: string): Promise<boolean> => {
      if (!user || user.email !== email) return false

      try {
        // Remove user from users list
        const filteredUsers = users.filter((u: any) => u.id !== user.id)
        setUsers(filteredUsers)

        // Logout
        logout()

        return true
      } catch (error) {
        console.error("Error deleting account:", error)
        return false
      }
    },
    [user, users, setUsers, logout],
  )

  const isLoading = isLoadingUser || isLoadingUsers || !isInitialized

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        changePassword,
        deleteAccount,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
