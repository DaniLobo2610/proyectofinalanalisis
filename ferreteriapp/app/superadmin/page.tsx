"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "../contexts/AuthContext"
import Navigation from "../components/Navigation"
import ImageUrlHelper from "../components/ImageUrlHelper"
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, ArrowLeft, Tag, X, Percent } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number | null
  image: string
  category: string
  stock: number
  active: boolean
  onSale?: boolean
}

export default function SuperAdmin() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showSaleModal, setShowSaleModal] = useState(false)
  const [showImageHelper, setShowImageHelper] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [saleProduct, setSaleProduct] = useState<Product | null>(null)
  const [salePercentage, setSalePercentage] = useState(10)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: null as number | null,
    image: "",
    category: "",
    stock: 0,
    active: true,
    onSale: false,
  })

  useEffect(() => {
    if (!user || user.role !== "superadmin") {
      router.push("/login")
      return
    }

    loadProducts()
  }, [user, router])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, categoryFilter])

  const loadProducts = () => {
    try {
      const savedProducts = localStorage.getItem("products")
      if (savedProducts) {
        const productList = JSON.parse(savedProducts)
        setProducts(productList)
      }
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    setFilteredProducts(filtered)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProduct) {
      // Editar producto existente
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...formData } : product,
      )
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))
    } else {
      // Crear nuevo producto
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
      }
      const updatedProducts = [...products, newProduct]
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))
    }

    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      stock: product.stock,
      active: product.active,
      onSale: product.onSale || false,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      const updatedProducts = products.filter((product) => product.id !== id)
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))
    }
  }

  const toggleActive = (id: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, active: !product.active } : product,
    )
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  const handleSaleClick = (product: Product) => {
    setSaleProduct(product)
    setSalePercentage(10)
    setShowSaleModal(true)
  }

  const applySale = () => {
    if (!saleProduct) return

    const discountAmount = (saleProduct.price * salePercentage) / 100
    const newPrice = Math.round((saleProduct.price - discountAmount) * 100) / 100

    const updatedProducts = products.map((product) =>
      product.id === saleProduct.id
        ? {
            ...product,
            originalPrice: saleProduct.price,
            price: newPrice,
            onSale: true,
          }
        : product,
    )

    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    setShowSaleModal(false)
    setSaleProduct(null)
  }

  const removeSale = (id: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            price: product.originalPrice || product.price,
            originalPrice: null,
            onSale: false,
          }
        : product,
    )
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      originalPrice: null,
      image: "",
      category: "",
      stock: 0,
      active: true,
      onSale: false,
    })
    setEditingProduct(null)
    setShowModal(false)
    setShowImageHelper(false)
  }

  const categories = [...new Set(products.map((p) => p.category))]

  // Cálculo corregido para el preview de la oferta
  const calculateSalePreview = () => {
    if (!saleProduct) return { original: 0, discount: 0, final: 0 }

    const original = saleProduct.price
    const discount = Math.round(((original * salePercentage) / 100) * 100) / 100
    const final = Math.round((original - discount) * 100) / 100

    return { original, discount, final }
  }

  const salePreview = calculateSalePreview()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== "superadmin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-800">
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Panel Super Administrador</h1>
                <p className="text-gray-600">Gestión completa de productos - {products.length} productos en total</p>
              </div>
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary flex items-center space-x-2">
              <Plus size={20} />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input-field">
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <span className="text-gray-600">
                Mostrando {filteredProducts.length} de {products.length} productos
              </span>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {product.name}
                            {product.onSale && <Tag className="ml-2 text-red-500" size={16} />}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">L {product.price.toLocaleString()}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          L {product.originalPrice.toLocaleString()}
                        </div>
                      )}
                      {product.onSale && product.originalPrice && (
                        <div className="text-xs text-red-600 font-medium">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${product.stock <= 5 ? "text-red-600" : "text-gray-900"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.active ? "Activo" : "Inactivo"}
                        </span>
                        {product.onSale && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                            En Oferta
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleActive(product.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title={product.active ? "Desactivar" : "Activar"}
                        >
                          {product.active ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                          onClick={() => (product.onSale ? removeSale(product.id) : handleSaleClick(product))}
                          className="text-orange-600 hover:text-orange-900"
                          title={product.onSale ? "Quitar oferta" : "Poner en oferta"}
                        >
                          <Tag size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Nombre del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="input-field h-24 resize-none"
                    placeholder="Descripción del producto"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio actual (L)</label>
                    <input
                      type="text"
                      required
                      value={formData.price || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, "")
                        setFormData((prev) => ({ ...prev, price: Number.parseFloat(value) || 0 }))
                      }}
                      className="input-field"
                      placeholder="0.00"
                      style={{ appearance: "textfield" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio original (L) - Opcional
                    </label>
                    <input
                      type="text"
                      value={formData.originalPrice || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, "")
                        setFormData((prev) => ({
                          ...prev,
                          originalPrice: value ? Number.parseFloat(value) : null,
                        }))
                      }}
                      className="input-field"
                      placeholder="0.00"
                      style={{ appearance: "textfield" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input
                    type="text"
                    required
                    value={formData.stock || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "")
                      setFormData((prev) => ({ ...prev, stock: Number.parseInt(value) || 0 }))
                    }}
                    className="input-field"
                    placeholder="0"
                    style={{ appearance: "textfield" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Pinturas">Pinturas</option>
                    <option value="Materiales Eléctricos">Materiales Eléctricos</option>
                    <option value="Plomería">Plomería</option>
                    <option value="Construcción">Construcción</option>
                    <option value="Jardinería">Jardinería</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">URL de la imagen</label>
                    <button
                      type="button"
                      onClick={() => setShowImageHelper(!showImageHelper)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showImageHelper ? "Ocultar ayuda" : "Ayuda con imágenes"}
                    </button>
                  </div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    className="input-field"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />

                  {showImageHelper && (
                    <div className="mt-4 border border-gray-200 rounded-lg p-4">
                      <ImageUrlHelper onImageSelect={(url) => setFormData((prev) => ({ ...prev, image: url }))} />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                      Producto activo
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="onSale"
                      checked={formData.onSale}
                      onChange={(e) => setFormData((prev) => ({ ...prev, onSale: e.target.checked }))}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="onSale" className="ml-2 block text-sm text-gray-900">
                      En oferta
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProduct ? "Actualizar" : "Crear"} Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para configurar oferta */}
      {showSaleModal && saleProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Configurar Oferta</h2>
              <button onClick={() => setShowSaleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{saleProduct.name}</h3>
                <p className="text-sm text-gray-600">Precio actual: L {saleProduct.price.toLocaleString()}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Porcentaje de descuento</label>
                <div className="relative">
                  <input
                    type="text"
                    value={salePercentage || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "")
                      const numValue = Number.parseInt(value) || 0
                      setSalePercentage(Math.min(Math.max(numValue, 1), 90))
                    }}
                    className="input-field pr-10"
                    placeholder="10"
                    style={{ appearance: "textfield" }}
                  />
                  <Percent className="absolute right-3 top-3 text-gray-400" size={20} />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Precio original:</span>
                  <span className="font-semibold">L {salePreview.original.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Descuento ({salePercentage}%):</span>
                  <span className="text-red-600 font-semibold">-L {salePreview.discount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Precio final:</span>
                    <span className="text-lg font-bold text-green-600">L {salePreview.final.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowSaleModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button onClick={applySale} className="flex-1 btn-secondary">
                  Aplicar Oferta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
