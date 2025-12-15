
import type { Order, Ad, User, Recommendation, Category } from '@/lib/types';
import { Zap, Car, Building2, Shirt, Lamp, HeartPulse, Sparkles, Bone, BookOpen, PenTool } from 'lucide-react';
import React from 'react';

export const categories: Category[] = [
  { name: 'الإلكترونيات', icon: React.createElement(Zap, { className: "w-6 h-6" }) },
  { name: 'السيارات', icon: React.createElement(Car, { className: "w-6 h-6" }) },
  { name: 'العقارات', icon: React.createElement(Building2, { className: "w-6 h-6" }) },
  { name: 'الملابس', icon: React.createElement(Shirt, { className: "w-6 h-6" }) },
  { name: 'الأثاث', icon: React.createElement(Lamp, { className: "w-6 h-6" }) },
  { name: 'صحة وجمال', icon: React.createElement(HeartPulse, { className: "w-6 h-6" }) },
  { name: 'هوايات', icon: React.createElement(Sparkles, { className: "w-6 h-6" }) },
  { name: 'حيوانات أليفة', icon: React.createElement(Bone, { className: "w-6 h-6" }) },
  { name: 'كتب', icon: React.createElement(BookOpen, { className: "w-6 h-6" }) },
  { name: 'خدمات', icon: React.createElement(PenTool, { className: "w-6 h-6" }) },
];


export const products: Ad[] = [
  { id: 'AD001', name: 'كرسي عصري', vendor: 'شركة الأثاث', category: 'أثاث', price: 150.00, stock: 25, rating: 4.5, imageUrl: 'https://picsum.photos/seed/product1/600/400', imageHint: 'modern chair' },
  { id: 'AD002', name: 'سماعات لاسلكية', vendor: 'إلكترو مارت', category: 'إلكترونيات', price: 99.99, discountPrice: 79.99, stock: 150, rating: 4.8, imageUrl: 'https://picsum.photos/seed/product2/600/400', imageHint: 'headphones' },
  { id: 'AD003', name: 'ساعة ذكية', vendor: 'تك كادجيتس', category: 'إلكترونيات', price: 249.50, stock: 75, rating: 4.7, imageUrl: 'https://picsum.photos/seed/product3/600/400', imageHint: 'smartwatch' },
  { id: 'AD004', name: 'مزهرية سيراميك', vendor: 'ديكور المنزل', category: 'ديكور', price: 45.00, stock: 200, rating: 4.9, imageUrl: 'https://picsum.photos/seed/product4/600/400', imageHint: 'ceramic vase' },
  { id: 'AD005', name: 'حقيبة ظهر جلدية', vendor: 'فاشن ليدز', category: 'إكسسوارات', price: 120.00, stock: 40, rating: 4.6, imageUrl: 'https://picsum.photos/seed/product5/600/400', imageHint: 'leather backpack' },
  { id: 'AD006', name: 'مصباح مكتب بسيط', vendor: 'أفكار مشرقة', category: 'أثاث', price: 65.00, stock: 90, rating: 4.4, imageUrl: 'https://picsum.photos/seed/product6/600/400', imageHint: 'desk lamp' },
  { id: 'AD007', name: 'غيتار صوتي', vendor: 'عالم الموسيقى', category: 'هوايات', price: 300.00, stock: 15, rating: 4.9, imageUrl: 'https://picsum.photos/seed/product7/600/400', imageHint: 'acoustic guitar' },
  { id: 'AD008', name: 'أحذية رياضية', vendor: 'سبورتي فيت', category: 'ملابس', price: 89.99, stock: 300, rating: 4.7, imageUrl: 'https://picsum.photos/seed/product8/600/400', imageHint: 'running shoes' },
];

export const orders: Order[] = [
  { id: 'ORD001', customerName: 'ليام جونسون', customerEmail: 'liam@example.com', productName: 'سماعات لاسلكية', quantity: 1, total: 79.99, status: 'Shipped', date: '2023-10-26' },
  { id: 'ORD002', customerName: 'أوليفيا سميث', customerEmail: 'olivia@example.com', productName: 'كرسي عصري', quantity: 2, total: 300.00, status: 'Delivered', date: '2023-10-25' },
  { id: 'ORD003', customerName: 'نوح ويليامز', customerEmail: 'noah@example.com', productName: 'ساعة ذكية', quantity: 1, total: 249.50, status: 'Pending', date: '2023-10-27' },
  { id: 'ORD004', customerName: 'إيما براون', customerEmail: 'emma@example.com', productName: 'مزهرية سيراميك', quantity: 3, total: 135.00, status: 'Shipped', date: '2023-10-26' },
  { id: 'ORD005', customerName: 'آفا جونز', customerEmail: 'ava@example.com', productName: 'حقيبة ظهر جلدية', quantity: 1, total: 120.00, status: 'Delivered', date: '2023-10-24' },
];

export const users: User[] = [
    { id: 'USR001', name: 'ليام جونسون', email: 'liam@example.com', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100', avatarHint: 'person portrait' },
    { id: 'USR002', name: 'أوليفيا سميث', email: 'olivia@example.com', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100', avatarHint: 'person portrait' },
    { id: 'USR003', name: 'نوح ويليامز', email: 'noah@example.com', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100', avatarHint: 'person portrait' },
    { id: 'USR004', name: 'إيما براون', email: 'emma@example.com', avatarUrl: 'https://picsum.photos/seed/avatar4/100/100', avatarHint: 'person portrait' },
];

export const recommendations: Recommendation[] = [
  { id: 'REC001', name: 'مصباح مكتب بسيط', imageUrl: 'https://picsum.photos/seed/product6/600/400', imageHint: 'desk lamp', price: 65.00 },
  { id: 'REC002', name: 'مزهرية سيراميك', imageUrl: 'https://picsum.photos/seed/product4/600/400', imageHint: 'ceramic vase', price: 45.00 },
  { id: 'REC003', name: 'حقيبة ظهر جلدية', imageUrl: 'https://picsum.photos/seed/product5/600/400', imageHint: 'leather backpack', price: 120.00 },
];
