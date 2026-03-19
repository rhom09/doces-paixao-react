import { z } from 'zod';

const PRODUCT_TYPES = ['Bolo', 'Cupcakes', 'Docinhos', 'Torta', 'Especial'] as const;

// Step 1: Your Data
export const step1Schema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(14, 'Telefone inválido'), // (00) 00000-0000
});

// Step 2: Your Order
export const step2Schema = z.object({
  productType: z.enum(PRODUCT_TYPES, {
    errorMap: () => ({ message: 'Selecione um tipo de produto' }),
  }),
  quantity: z.string().min(2, 'Mínimo de 2 caracteres'),
  eventDate: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0,0,0,0);
    const limit = new Date(today);
    limit.setDate(today.getDate() + 2);
    return date >= limit;
  }, { message: 'O prazo mínimo para encomendas é de 2 dias' }),
  theme: z.string().min(1, 'Informe o tema ou ocasião'),
});

// Step 3: Customization
export const step3Schema = z.object({
  flavors: z.array(z.string()).min(1, 'Selecione pelo menos um sabor'),
  restrictions: z.array(z.string()).optional(),
  message: z.string().max(100, 'A mensagem deve ter no máximo 100 caracteres').optional(),
  image: z.any().optional(), // File validation handled in component
});

// Step 4: Confirmation
export const step4Schema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos',
  }),
});

// Combined Schema
export const encomendaSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
});

export type EncomendaFormData = z.infer<typeof encomendaSchema>;
