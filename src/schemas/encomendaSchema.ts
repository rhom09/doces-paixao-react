import { z } from 'zod';

const PRODUCT_TYPES = ['Bolo', 'Cupcakes', 'Docinhos', 'Torta', 'Especial'] as const;

// Step 1: Your Data
export const step1Schema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(14, 'Telefone inválido'), // (00) 00000-0000
});

// Step 2: Your Order
const minDate = new Date();
minDate.setDate(minDate.getDate() + 7);

export const step2Schema = z.object({
  productType: z.enum(PRODUCT_TYPES, {
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_enum_value') return { message: 'Selecione um tipo de produto' };
      return { message: ctx.defaultError };
    }
  }),
  quantity: z.number({ invalid_type_error: 'Informe a quantidade' }).min(1, 'Quantidade mínima é 1'),
  eventDate: z.string().refine((val) => {
    const date = new Date(val);
    return date >= minDate;
  }, { message: 'A data deve ser de pelo menos 7 dias a partir de hoje' }),
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
