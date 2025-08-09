"use client"

import Navigation from "../components/Navigation"
import { Users, Target, Heart, Shield } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Sobre Nosotros</h1>
            <p className="text-xl text-gray-600">Más de 25 años siendo tu ferretería de confianza en Honduras</p>
          </div>

          {/* Historia */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                <strong>Ferretería el Dieguín</strong> nació en 1998 como un pequeño negocio familiar en el corazón de
                Comayagua. Fundada por Diego Martínez con la visión de ofrecer herramientas y materiales de construcción
                de calidad a precios justos para la comunidad hondureña.
              </p>
              <p className="mb-4">
                Lo que comenzó como una pequeña tienda de barrio, se ha convertido en una de las ferreterías más
                reconocidas de Comayagua, manteniendo siempre nuestros valores familiares y el compromiso con la
                excelencia en el servicio al cliente.
              </p>
              <p>
                Hoy en día, seguimos siendo una empresa familiar que se enorgullece de apoyar a constructores,
                carpinteros, electricistas, plomeros y familias hondureñas en todos sus proyectos, desde los más
                pequeños hasta los más ambiciosos.
              </p>
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <Target className="text-blue-600 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">Nuestra Misión</h2>
              </div>
              <p className="text-gray-600">
                Proveer herramientas, materiales y soluciones de construcción de la más alta calidad, con un servicio
                personalizado y precios competitivos, contribuyendo al desarrollo y crecimiento de nuestros clientes y
                comunidad.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <Heart className="text-red-600 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">Nuestra Visión</h2>
              </div>
              <p className="text-gray-600">
                Ser la ferretería líder en Comayagua, reconocida por nuestra excelencia en servicio, calidad de
                productos y compromiso con el desarrollo sostenible de nuestra región, manteniendo siempre nuestros
                valores familiares.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Calidad</h3>
                <p className="text-gray-600 text-sm">
                  Ofrecemos solo productos de marcas reconocidas y con garantía de fábrica.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-green-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Servicio</h3>
                <p className="text-gray-600 text-sm">
                  Atención personalizada y asesoría técnica especializada para cada cliente.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-orange-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Confianza</h3>
                <p className="text-gray-600 text-sm">
                  Construimos relaciones duraderas basadas en la honestidad y transparencia.
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Nuestros Logros</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-blue-200">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-blue-200">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5,000+</div>
                <div className="text-blue-200">Productos Disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-200">Marcas Reconocidas</div>
              </div>
            </div>
          </div>

          {/* Equipo */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestro Equipo</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">Diego Martínez</h3>
                <p className="text-gray-600 text-sm">Fundador y Director General</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">María González</h3>
                <p className="text-gray-600 text-sm">Gerente de Ventas</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-800">Carlos Rodríguez</h3>
                <p className="text-gray-600 text-sm">Jefe de Almacén</p>
              </div>
            </div>
          </div>

          {/* Compromiso */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestro Compromiso</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Con la Comunidad</h3>
                <p className="text-gray-600 mb-4">
                  Apoyamos proyectos comunitarios y programas de capacitación técnica para jóvenes de Comayagua,
                  contribuyendo al desarrollo de oficios especializados en construcción.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Con el Medio Ambiente</h3>
                <p className="text-gray-600 mb-4">
                  Promovemos el uso de materiales eco-amigables y prácticas sostenibles en la construcción, trabajando
                  con proveedores comprometidos con el cuidado del medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20 md:hidden"></div>
    </div>
  )
}
