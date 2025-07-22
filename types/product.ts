export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description?: string | string[];
  price: number;
  category: string;
  stock: number;
  images: string[];
  tags?: string[];
  featured?: boolean;
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  rating: number;
  numReviews?: number;
  createdAt?: string;
  updatedAt?: string;
}
