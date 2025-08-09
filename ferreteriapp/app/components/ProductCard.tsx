"use client"

import type React from "react"

import Image from "next/image"
import { useCart } from "../contexts/CartContext"
import { Tag } from "lucide-react"

interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number | null
  image: string
  stock: number
  onSale?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="card p-4 h-full flex flex-col relative">
      {/* Etiqueta de oferta */}
      {product.onSale && product.originalPrice && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
            <Tag size={12} />
            <span>-{discountPercentage}%</span>
          </div>
        </div>
      )}

      {/* Etiqueta de stock bajo */}
      {product.stock <= 5 && product.stock > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Pocas unidades</span>
        </div>
      )}

      <div className="relative mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover rounded-lg"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjWdpFMVYyLvjjHqvkjlhyeUcjvGvqIi8b1BjjqTzSlT54b6bk+h0R+Rj5m1leJ4n+YjW"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

        {product.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{product.description}</p>}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              {product.onSale && product.originalPrice ? (
                <div>
                  <span className="text-lg font-bold text-red-600">L {product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    L {product.originalPrice.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-blue-600">L {product.price.toLocaleString()}</span>
              )}
            </div>

            {product.stock <= 0 ? (
              <span className="text-sm text-red-600 font-medium">Agotado</span>
            ) : (
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock <= 0 ? "Agotado" : "Agregar al Carrito"}
          </button>
        </div>
      </div>
    </div>
  )
}
