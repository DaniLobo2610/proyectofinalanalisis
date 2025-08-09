"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "./components/Navigation"
import ProductCard from "./components/ProductCard"
import WhatsAppFloat from "./components/WhatsAppFloat"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { ChevronRight, Star, Truck, Shield, Clock } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  stock: number
  active: boolean
}

interface Category {
  id: string
  name: string
  icon: string
  active: boolean
}

const initialCategories = [
  { id: "1", name: "Herramientas", icon: "🔨", active: true },
  { id: "2", name: "Pinturas", icon: "🎨", active: true },
  { id: "3", name: "Materiales Eléctricos", icon: "⚡", active: true },
  { id: "4", name: "Plomería", icon: "🔧", active: true },
  { id: "5", name: "Construcción", icon: "🏗️", active: true },
  { id: "6", name: "Jardinería", icon: "🌱", active: true },
]

const initialProducts = [
  {
    id: "1",
    name: "Martillo de Carpintero 16oz",
    description: "Martillo profesional con mango de madera, ideal para trabajos de carpintería y construcción.",
    price: 450,
    originalPrice: 520,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    category: "Herramientas",
    stock: 25,
    active: true,
    onSale: true,
  },
  {
    id: "2",
    name: "Taladro Inalámbrico 18V",
    description: "Taladro inalámbrico profesional con batería de litio y cargador incluido.",
    price: 2850,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
    category: "Herramientas",
    stock: 8,
    active: true,
    onSale: false,
  },
  {
    id: "3",
    name: "Pintura Látex Blanca 1 Galón",
    description: "Pintura látex de alta calidad, perfecta para interiores y exteriores.",
    price: 680,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop",
    category: "Pinturas",
    stock: 15,
    active: true,
    onSale: false,
  },
  {
    id: "4",
    name: "Cable Eléctrico 12 AWG",
    description: "Cable eléctrico de cobre calibre 12, ideal para instalaciones residenciales.",
    price: 25,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    category: "Materiales Eléctricos",
    stock: 100,
    active: true,
    onSale: false,
  },
  {
    id: "5",
    name: "Tubería PVC 4 pulgadas",
    description: "Tubería de PVC de 4 pulgadas para sistemas de drenaje y plomería.",
    price: 180,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    category: "Plomería",
    stock: 50,
    active: true,
    onSale: false,
  },
  {
    id: "6",
    name: "Cemento Portland 50kg",
    description: "Cemento Portland de alta resistencia para construcción.",
    price: 320,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
    category: "Construcción",
    stock: 30,
    active: true,
    onSale: false,
  },
  {
    id: "7",
    name: "Pala de Jardín",
    description: "Pala de acero con mango de madera para trabajos de jardinería.",
    price: 180,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    category: "Jardinería",
    stock: 20,
    active: true,
    onSale: false,
  },
  {
    id: "8",
    name: 'Sierra Circular 7 1/4"',
    description: "Sierra circular eléctrica de alta potencia para cortes precisos en madera.",
    price: 1560,
    originalPrice: 1850,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    category: "Herramientas",
    stock: 6,
    active: true,
    onSale: true,
  },
]

export default function Home() {
  const [products, setProducts, isLoadingProducts] = useLocalStorage<Product[]>("products", [])
  const [categories, setCategories, isLoadingCategories] = useLocalStorage<Category[]>("categories", initialCategories)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])
  const [displayCategories, setDisplayCategories] = useState<Category[]>([])

  useEffect(() => {
    // Inicializar productos si no existen
    if (!isLoadingProducts && products.length === 0) {
      setProducts(initialProducts)
    }
  }, [isLoadingProducts, products.length, setProducts])

  useEffect(() => {
    // Actualizar productos mostrados
    if (!isLoadingProducts && products.length > 0) {
      setDisplayProducts(products.filter((p: Product) => p.active).slice(0, 8))
    }
  }, [products, isLoadingProducts])

  useEffect(() => {
    // Actualizar categorías mostradas
    if (!isLoadingCategories) {
      setDisplayCategories(categories.filter((c: Category) => c.active))
    }
  }, [categories, isLoadingCategories])

  const isLoading = isLoadingProducts || isLoadingCategories

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Todo para tu hogar</h1>
              <p className="text-xl mb-8 opacity-90">
                La ferretería más completa de Comayagua con los mejores precios y calidad garantizada
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/categories" className="btn-secondary inline-block text-center">
                  Ver Productos
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Contactanos
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center"
                alt="Ferretería - Herramientas y materiales de construcción"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Promociones Banner */}
      <div className="bg-orange-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Star className="text-yellow-300" size={24} />
            <span className="font-semibold text-lg">¡OFERTA ESPECIAL! 15% de descuento en herramientas eléctricas</span>
            <Star className="text-yellow-300" size={24} />
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
              <p className="text-gray-600">En compras mayores a L 1,000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía</h3>
              <p className="text-gray-600">Productos con garantía de fábrica</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entrega en 24-48 horas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías Destacadas */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Categorías Destacadas</h2>
            <p className="text-gray-600">Encuentra todo lo que necesitas para tu proyecto</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories?category=${category.name}`}
                className="card p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Productos Destacados */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Productos Destacados</h2>
              <p className="text-gray-600">Los productos más vendidos de nuestra tienda</p>
            </div>
            <Link
              href="/categories"
              className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>Ver todos</span>
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/categories" className="btn-primary">
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="text-xl font-bold">Ferretería el Dieguín</span>
              </div>
              <p className="text-gray-400">Tu ferretería de confianza en Comayagua desde 1998</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    Nosotros
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categorías</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/categories?category=Herramientas" className="hover:text-white">
                    Herramientas
                  </Link>
                </li>
                <li>
                  <Link href="/categories?category=Pinturas" className="hover:text-white">
                    Pinturas
                  </Link>
                </li>
                <li>
                  <Link href="/categories?category=Materiales Eléctricos" className="hover:text-white">
                    Eléctricos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <p>📍 Comayagua, Barrio Arriba</p>
                <p>Media cuadra arriba del parque central</p>
                <p>📞 +504 2772-0000</p>
                <p>✉️ info@ferreterialdieguin.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ferretería el Dieguín. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />

      {/* Espaciado para navegación móvil */}
      <div className="h-20 md:hidden"></div>
    </div>
  )
}
