"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "../components/Navigation"
import ProductCard from "../components/ProductCard"
import { Search, SlidersHorizontal } from "lucide-react"

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

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchQuery, categoryFilter, priceRange, sortBy])

  const loadProducts = () => {
    try {
      const savedProducts = localStorage.getItem("products")
      if (savedProducts) {
        const allProducts = JSON.parse(savedProducts)
        setProducts(allProducts.filter((p: Product) => p.active))
      }
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtro por categoría
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    // Filtro por precio
    filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

    // Ordenamiento
    filtered.sort((a, b) => {
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

    setFilteredProducts(filtered)
  }

  const categories = [...new Set(products.map((p) => p.category))]

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
        {/* Header de búsqueda */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Buscar Productos"}
          </h1>

          {/* Barra de búsqueda */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-primary flex items-center space-x-2 md:hidden"
            >
              <SlidersHorizontal size={20} />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Filtros</h2>

              {/* Categorías */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Categoría</h3>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full input-field"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rango de precios */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Precio (L)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Mínimo</label>
                    <input
                      type="number"
                      min="0"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({ ...prev, min: Number.parseInt(e.target.value) || 0 }))
                      }
                      className="w-full input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Máximo</label>
                    <input
                      type="number"
                      min="0"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({ ...prev, max: Number.parseInt(e.target.value) || 10000 }))
                      }
                      className="w-full input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Ordenamiento */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Ordenar por</h3>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full input-field">
                  <option value="name">Nombre A-Z</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                </select>
              </div>

              {/* Limpiar filtros */}
              <button
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("")
                  setPriceRange({ min: 0, max: 10000 })
                  setSortBy("name")
                }}
                className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{filteredProducts.length} productos encontrados</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-gray-400" size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">Intenta ajustar tus filtros o buscar con otros términos</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("")
                    setPriceRange({ min: 0, max: 10000 })
                  }}
                  className="btn-primary"
                >
                  Limpiar Búsqueda
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
