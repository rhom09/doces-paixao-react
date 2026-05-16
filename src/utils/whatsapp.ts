export function getWhatsAppLink(productName: string) {
  const phone = '55119985738330' // Número atualizado
  const message = encodeURIComponent(`Olá! Gostaria de encomendar o ${productName}.`)
  return `https://wa.me/${phone}?text=${message}`
}
