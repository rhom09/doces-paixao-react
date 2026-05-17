import { EncomendaFormData } from "@/schemas/encomendaSchema"

export function getWhatsAppLink(productName?: string) {
  const phone = '5511985738330' // Número atualizado
  const message = productName
    ? encodeURIComponent(`Olá! Gostaria de encomendar o ${productName}.`)
    : encodeURIComponent('Olá! Gostaria de solicitar um orçamento para uma encomenda 🧁')
  return `https://wa.me/${phone}?text=${message}`
}

export function getOrderWhatsAppLink(data: EncomendaFormData) {
  const phone = '5511985738330'

  const message = `
🍰 *NOVA ENCOMENDA*

📋 *DADOS DO CLIENTE*
Nome: ${data.name}
WhatsApp: ${data.phone}
E-mail: ${data.email}

🎂 *PEDIDO*
Tipo: ${data.productType}
Quantidade: ${data.quantity}
Data do Evento: ${new Date(data.eventDate).toLocaleDateString('pt-BR')}

🎨 *PERSONALIZAÇÃO*
Sabores: ${data.flavors.join(', ')}
${data.restrictions?.length ? `Restrições: ${data.restrictions.join(', ')}` : ''}
${data.message ? `Mensagem: ${data.message}` : ''}
  `.trim()

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
