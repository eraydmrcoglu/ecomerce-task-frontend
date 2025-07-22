export type Role = 'admin' | 'user';

export interface Address {
  _id?: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string;
  addresses?: Address[];
  favoriteCategories?: string[];
  wishlist?: string[];
  createdAt?: string;
  updatedAt?: string;
}
