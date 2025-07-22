export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: OrderStatus;
  totalPrice: number;
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt?: string;
}
