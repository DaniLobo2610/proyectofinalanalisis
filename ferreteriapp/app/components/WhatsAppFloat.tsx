'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '50499999999' // Número de WhatsApp de la ferretería
    const message = 'Hola, me interesa conocer más sobre sus productos.'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={30} />
    </button>
  )
}
