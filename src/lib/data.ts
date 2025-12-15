import type { Order, Ad, User, Recommendation } from '@/lib/types';

export const products: Ad[] = [
  { id: 'AD001', name: 'Modern Teal Chair', vendor: 'Furniture Co.', category: 'Furniture', price: 150.00, stock: 25, rating: 4.5, imageUrl: 'https://picsum.photos/seed/product1/600/400', imageHint: 'modern chair' },
  { id: 'AD002', name: 'Wireless Headphones', vendor: 'ElectroMart', category: 'Electronics', price: 99.99, discountPrice: 79.99, stock: 150, rating: 4.8, imageUrl: 'https://picsum.photos/seed/product2/600/400', imageHint: 'headphones' },
  { id: 'AD003', name: 'Smart Watch', vendor: 'TechGadgets', category: 'Electronics', price: 249.50, stock: 75, rating: 4.7, imageUrl: 'https://picsum.photos/seed/product3/600/400', imageHint: 'smartwatch' },
  { id: 'AD004', name: 'Ceramic Vase', vendor: 'Home Decor Inc.', category: 'Home Goods', price: 45.00, stock: 200, rating: 4.9, imageUrl: 'https://picsum.photos/seed/product4/600/400', imageHint: 'ceramic vase' },
  { id: 'AD005', name: 'Leather Backpack', vendor: 'FashionLeads', category: 'Accessories', price: 120.00, stock: 40, rating: 4.6, imageUrl: 'https://picsum.photos/seed/product5/600/400', imageHint: 'leather backpack' },
  { id: 'AD006', name: 'Minimalist Desk Lamp', vendor: 'Bright Ideas', category: 'Home Goods', price: 65.00, stock: 90, rating: 4.4, imageUrl: 'https://picsum.photos/seed/product6/600/400', imageHint: 'desk lamp' },
  { id: 'AD007', name: 'Acoustic Guitar', vendor: 'Music World', category: 'Instruments', price: 300.00, stock: 15, rating: 4.9, imageUrl: 'https://picsum.photos/seed/product7/600/400', imageHint: 'acoustic guitar' },
  { id: 'AD008', name: 'Running Shoes', vendor: 'SportyFeet', category: 'Apparel', price: 89.99, stock: 300, rating: 4.7, imageUrl: 'https://picsum.photos/seed/product8/600/400', imageHint: 'running shoes' },
];

export const orders: Order[] = [
  { id: 'ORD001', customerName: 'Liam Johnson', customerEmail: 'liam@example.com', productName: 'Wireless Headphones', quantity: 1, total: 79.99, status: 'Shipped', date: '2023-10-26' },
  { id: 'ORD002', customerName: 'Olivia Smith', customerEmail: 'olivia@example.com', productName: 'Modern Teal Chair', quantity: 2, total: 300.00, status: 'Delivered', date: '2023-10-25' },
  { id: 'ORD003', customerName: 'Noah Williams', customerEmail: 'noah@example.com', productName: 'Smart Watch', quantity: 1, total: 249.50, status: 'Pending', date: '2023-10-27' },
  { id: 'ORD004', customerName: 'Emma Brown', customerEmail: 'emma@example.com', productName: 'Ceramic Vase', quantity: 3, total: 135.00, status: 'Shipped', date: '2023-10-26' },
  { id: 'ORD005', customerName: 'Ava Jones', customerEmail: 'ava@example.com', productName: 'Leather Backpack', quantity: 1, total: 120.00, status: 'Delivered', date: '2023-10-24' },
];

export const users: User[] = [
    { id: 'USR001', name: 'Liam Johnson', email: 'liam@example.com', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100', avatarHint: 'person portrait' },
    { id: 'USR002', name: 'Olivia Smith', email: 'olivia@example.com', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100', avatarHint: 'person portrait' },
    { id: 'USR003', name: 'Noah Williams', email: 'noah@example.com', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100', avatarHint: 'person portrait' },
    { id: 'USR004', name: 'Emma Brown', email: 'emma@example.com', avatarUrl: 'https://picsum.photos/seed/avatar4/100/100', avatarHint: 'person portrait' },
];

export const recommendations: Recommendation[] = [
  { id: 'REC001', name: 'Minimalist Desk Lamp', imageUrl: 'https://picsum.photos/seed/product6/600/400', imageHint: 'desk lamp', price: 65.00 },
  { id: 'REC002', name: 'Ceramic Vase', imageUrl: 'https://picsum.photos/seed/product4/600/400', imageHint: 'ceramic vase', price: 45.00 },
  { id: 'REC003', name: 'Leather Backpack', imageUrl: 'https://picsum.photos/seed/product5/600/400', imageHint: 'leather backpack', price: 120.00 },
];
