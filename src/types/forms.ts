export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  productType: string;
  quantity: string; // Changed from number to string
  eventDate: string;
  theme: string;
  flavors: string[];
  restrictions?: string[];
  message?: string;
  termsAccepted: boolean;
}
