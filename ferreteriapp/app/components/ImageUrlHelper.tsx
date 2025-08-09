"use client"

import { useState } from "react"
import { ExternalLink, AlertCircle, CheckCircle, Copy } from "lucide-react"

interface ImageUrlHelperProps {
  onImageSelect: (url: string) => void
}

export default function ImageUrlHelper({ onImageSelect }: ImageUrlHelperProps) {
  const [testUrl, setTestUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // URLs de ejemplo que funcionan bien
  const exampleUrls = [
    {
      category: "Herramientas",
      urls: [
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400&h=400&fit=crop",
      ],
    },
    {
      category: "Pinturas",
      urls: [
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
      ],
    },
    {
      category: "Construcción",
      urls: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
      ],
    },
  ]

  const testImageUrl = async (url: string) => {
    if (!url) {
      setIsValidUrl(null)
      return
    }

    setIsLoading(true)
    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      const promise = new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        setTimeout(() => resolve(false), 5000) // Timeout después de 5 segundos
      })

      img.src = url
      const isValid = await promise
      setIsValidUrl(isValid)
    } catch (error) {
      setIsValidUrl(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUrlChange = (url: string) => {
    setTestUrl(url)
    if (url) {
      testImageUrl(url)
    } else {
      setIsValidUrl(null)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    onImageSelect(url)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Probar URL de imagen</label>
        <div className="relative">
          <input
            type="url"
            value={testUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="input-field pr-10"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <div className="absolute right-3 top-3">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            ) : isValidUrl === true ? (
              <CheckCircle className="text-green-600" size={16} />
            ) : isValidUrl === false ? (
              <AlertCircle className="text-red-600" size={16} />
            ) : null}
          </div>
        </div>

        {isValidUrl === false && (
          <p className="text-red-600 text-sm mt-1">❌ Esta imagen no se puede cargar. Intenta con otra URL.</p>
        )}

        {isValidUrl === true && (
          <div className="mt-2">
            <p className="text-green-600 text-sm mb-2">✅ Imagen válida</p>
            <img src={testUrl || "/placeholder.svg"} alt="Preview" className="w-20 h-20 object-cover rounded border" />
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-800 mb-3">💡 URLs de ejemplo que funcionan:</h4>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {exampleUrls.map((category) => (
            <div key={category.category}>
              <h5 className="text-sm font-medium text-gray-700 mb-2">{category.category}:</h5>
              <div className="space-y-1">
                {category.urls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <img
                      src={url || "/placeholder.svg"}
                      alt="Example"
                      className="w-8 h-8 object-cover rounded border"
                    />
                    <code className="flex-1 bg-gray-100 px-2 py-1 rounded text-xs">{url.substring(0, 50)}...</code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(url)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Usar esta imagen"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <AlertCircle className="text-yellow-600 mt-0.5" size={16} />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">¿Por qué no funcionan las imágenes del navegador?</p>
            <ul className="text-xs space-y-1">
              <li>• Las URLs del navegador suelen ser temporales</li>
              <li>• Muchas tienen restricciones CORS</li>
              <li>• Algunas requieren autenticación</li>
            </ul>
            <p className="mt-2 text-xs">
              <strong>Recomendación:</strong> Usa servicios como Unsplash, Pixabay, o sube las imágenes a un servicio de
              hosting.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <ExternalLink className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Servicios recomendados para imágenes:</p>
            <ul className="text-xs space-y-1">
              <li>
                • <strong>Unsplash:</strong> unsplash.com (gratuitas)
              </li>
              <li>
                • <strong>Pixabay:</strong> pixabay.com (gratuitas)
              </li>
              <li>
                • <strong>Imgur:</strong> imgur.com (hosting gratuito)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
