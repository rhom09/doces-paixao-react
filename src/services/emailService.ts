import emailjs from '@emailjs/browser';
import { ContactFormData, OrderFormData } from '../types/forms';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactForm(data: ContactFormData): Promise<void> {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        subject: `Novo Contato: ${data.type}`,
        message: data.message,
        type: data.type,
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.error('EmailJS Contact Error:', error);
    throw error;
  }
}

export async function sendOrderForm(data: OrderFormData): Promise<void> {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        phone: data.phone,
        subject: `Nova Encomenda: ${data.category}`,
        message: `
          Produto: ${data.productName || 'N/A'} (ID: ${data.productId})
          Categoria: ${data.category}
          Tamanho: ${data.size}
          Sabor: ${data.flavor}
          Data: ${data.date}
          Quantidade: ${data.qty}
          Mensagem: ${data.message}
        `,
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.error('EmailJS Order Error:', error);
    throw error;
  }
}
