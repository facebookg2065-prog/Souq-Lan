
import React from 'react';

export type Ad = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  rating: number;
  imageUrl: string;
  imageHint: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarHint: string;
};

export type Recommendation = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  price: number;
}

export type Category = {
  name: string;
  icon: React.ReactElement;
};
