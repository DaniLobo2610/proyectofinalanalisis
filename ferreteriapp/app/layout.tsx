import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { UserDataProvider } from "./contexts/UserDataContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ferretería el Dieguín - Todo para tu hogar",
  description: "La mejor ferretería de Honduras con herramientas, pinturas y materiales de construcción",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <UserDataProvider>{children}</UserDataProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
