export function getWhatsAppLink(productName?: string) {
  const phone = '55119985738330' // Número atualizado
  const message = productName
    ? encodeURIComponent(`Olá! Gostaria de encomendar o ${productName}.`)
    : encodeURIComponent('Olá! Gostaria de solicitar um orçamento para uma encomenda 🧁')
  return `https://wa.me/${phone}?text=${message}`
}
