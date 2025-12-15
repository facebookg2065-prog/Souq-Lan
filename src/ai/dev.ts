'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/product-description-generator.ts';
import '@/ai/flows/category-suggestion-from-description.ts';
import '@/ai/flows/intelligent-recommendations-for-user.ts';
import '@/ai/flows/currency-converter.ts';
