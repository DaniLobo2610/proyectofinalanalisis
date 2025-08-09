"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "../components/Navigation"
import ProductCard from "../components/ProductCard"
import { Grid3X3 } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  active: boolean
}

interface Category {
  id: string
  name: string
  icon: string
  active: boolean
}

export default function CategoriesPageContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("name")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Si no hay categorías, agregamos unas por defecto
    if (!localStorage.getItem("categories")) {
      const categoriasIniciales: Category[] = [
        { id: "1", name: "Herramientas", icon: "🔧", active: true },
        { id: "2", name: "Pinturas", icon: "🎨", active: true },
        { id: "3", name: "Electricidad", icon: "💡", active: true },
        { id: "4", name: "Fontanería", icon: "🚰", active: true }
      ]
      localStorage.setItem("categories", JSON.stringify(categoriasIniciales))
    }

    // Si no hay productos, agregamos unos por defecto
    if (!localStorage.getItem("products")) {
      const productosIniciales: Product[] = [
        { id: "1", name: "Martillo", description: "Martillo de acero", price: 150, image: "/martillo.jpg", category: "Herramientas", stock: 10, active: true },
        { id: "2", name: "Brocha", description: "Brocha para pintura", price: 50, image: "/brocha.jpg", category: "Pinturas", stock: 25, active: true },
        { id: "3", name: "Bombillo LED", description: "Bombillo LED 9W", price: 30, image: "/bombillo.jpg", category: "Electricidad", stock: 50, active: true },
        { id: "4", name: "Llave inglesa", description: "Llave ajustable", price: 120, image: "/llave.jpg", category: "Herramientas", stock: 15, active: true },
        { id: "5", name: "Pintura blanca", description: "Pintura látex 1 galón", price: 250, image: "/pintura.jpg", category: "Pinturas", stock: 8, active: true },
        { id: "6", name: "Tubo PVC", description: "Tubo PVC 1 pulgada", price: 80, image: "/tubo.jpg", category: "Fontanería", stock: 20, active: true }
      ]
      localStorage.setItem("products", JSON.stringify(productosIniciales))
    }

    loadData()
  }, [])

  const loadData = () => {
    try {
      // Cargar productos
      const savedProducts = localStorage.getItem("products")
      if (savedProducts) {
        const allProducts = JSON.parse(savedProducts)
        setProducts(allProducts.filter((p: Product) => p.active))
      }

      // Cargar categorías
      const savedCategories = localStorage.getItem("categories")
      if (savedCategories) {
        const allCategories = JSON.parse(savedCategories)
        setCategories(allCategories.filter((c: Category) => c.active))
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products
    .filter((product) => selectedCategory === "" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const getProductsByCategory = (categoryName: string) => {
    return products.filter((product) => product.category === categoryName)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {selectedCategory ? `Categoría: ${selectedCategory}` : "Todas las Categorías"}
          </h1>
          <p className="text-gray-600">
            {selectedCategory
              ? `${filteredProducts.length} productos en ${selectedCategory}`
              : `${products.length} productos disponibles`}
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full input-field"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full input-field">
                <option value="name">Nombre A-Z</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory("")
                  setSortBy("name")
                }}
                className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Vista por categorías cuando no hay filtro específico */}
        {!selectedCategory ? (
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryProducts = getProductsByCategory(category.name)
              if (categoryProducts.length === 0) return null

              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{category.icon}</span>
                      <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {categoryProducts.length} productos
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Ver todos →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {categoryProducts.slice(0, 6).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Vista de productos filtrados */
          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Grid3X3 className="text-gray-400" size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">No hay productos disponibles en esta categoría</p>
                <button onClick={() => setSelectedCategory("")} className="btn-primary">
                  Ver Todas las Categorías
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
