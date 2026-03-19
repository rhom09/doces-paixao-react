export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
}

export interface OrderFormData {
  category: string;
  productId: number | null;
  productName?: string;
  size: string;
  flavor: string;
  date: string;
  qty: string;
  name: string;
  phone: string;
  message: string;
}
