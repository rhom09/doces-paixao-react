import emailjs from '@emailjs/browser';
import { ContactFormData, OrderFormData } from '../types/forms';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactForm(data: ContactFormData): Promise<void> {
  const templateParams = {
    nome:     data.name,
    email:    data.email,
    telefone: data.phone,
    assunto:  `Novo Contato: ${data.type}`,
    mensagem: data.message,
  };

  if (import.meta.env.DEV) {
    console.warn('EmailJS Contact Debug:', templateParams);
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch (error) {
    console.error('EmailJS Contact Error:', error);
    throw error;
  }
}

export async function sendOrderForm(data: OrderFormData): Promise<void> {
  const messageContent = `
    --- DADOS DO CLIENTE ---
    Nome: ${data.name}
    WhatsApp: ${data.phone}
    E-mail: ${data.email}

    --- PEDIDO ---
    Tipo: ${data.productType}
    Quantidade: ${data.quantity}
    Data do Evento: ${data.eventDate}
    Tema/Ocasião: ${data.theme}

    --- PERSONALIZAÇÃO ---
    Sabores: ${data.flavors.join(', ')}
    Restrições: ${data.restrictions?.join(', ') || 'Nenhuma'}
    Mensagem p/ Embalagem: ${data.message || 'N/A'}

    --- CONFIRMAÇÃO ---
    Termos aceitos: ${data.termsAccepted ? 'SIM' : 'NÃO'}
  `;

  const templateParams = {
    nome:     data.name,
    email:    data.email,
    telefone: data.phone,
    assunto:  `🍰 NOVA ENCOMENDA: ${data.productType} - ${data.name}`,
    mensagem: messageContent,
  };

  if (import.meta.env.DEV) {
    console.warn('EmailJS Order Debug:', templateParams);
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch (error) {
    console.error('EmailJS Order Error:', error);
    throw error;
  }
}
