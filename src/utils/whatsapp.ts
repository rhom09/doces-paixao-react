export function getWhatsAppLink(productName: string) {
  const phone = '5511999999999' // Idealmente viria de uma config/CMS
  const message = encodeURIComponent(`Olá! Gostaria de encomendar o ${productName}.`)
  return `https://wa.me/${phone}?text=${message}`
}
