"use client"

import Navigation from "../components/Navigation"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h1>
            <p className="text-xl text-gray-600">
              Estamos aquí para ayudarte con todos tus proyectos de construcción y hogar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                      <p className="text-gray-600">
                        Comayagua, Barrio Arriba
                        <br />
                        Media cuadra arriba del parque central
                        <br />
                        Comayagua, Honduras, C.A.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Teléfonos</h3>
                      <p className="text-gray-600">
                        +504 2772-0000
                        <br />
                        +504 9999-9999 (WhatsApp)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Mail className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">
                        info@ferreterialdieguin.com
                        <br />
                        ventas@ferreterialdieguin.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Horarios de Atención</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>
                          <strong>Lunes a Viernes:</strong> 7:00 AM - 6:00 PM
                        </p>
                        <p>
                          <strong>Sábados:</strong> 7:00 AM - 5:00 PM
                        </p>
                        <p>
                          <strong>Domingos:</strong> 8:00 AM - 12:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp destacado */}
              <div className="bg-green-500 text-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <MessageCircle size={32} />
                  <div>
                    <h3 className="text-xl font-bold mb-2">¡Contáctanos por WhatsApp!</h3>
                    <p className="mb-4">Respuesta inmediata para tus consultas</p>
                    <a
                      href="https://wa.me/50499999999?text=Hola, me interesa conocer más sobre sus productos."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-green-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Chatear Ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                    <input type="text" required className="input-field" placeholder="Tu nombre completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                    <input type="tel" required className="input-field" placeholder="+504 9999-9999" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" required className="input-field" placeholder="tu@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asunto *</label>
                  <select className="input-field" required>
                    <option value="">Selecciona un tema</option>
                    <option value="cotizacion">Solicitar Cotización</option>
                    <option value="productos">Consulta sobre Productos</option>
                    <option value="entrega">Información de Entrega</option>
                    <option value="reclamo">Reclamo o Sugerencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                  <textarea
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Describe tu consulta o solicitud..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-primary">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestra Ubicación</h2>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="text-lg font-semibold">Ferretería el Dieguín</p>
                <p>Comayagua, Barrio Arriba</p>
                <p>Media cuadra arriba del parque central</p>
                <p>Comayagua, Honduras</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
