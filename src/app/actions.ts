'use server';

import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/product-description-generator';
import { suggestCategories, CategorySuggestionInput } from '@/ai/flows/category-suggestion-from-description';
import { z } from 'zod';
import { products } from '@/lib/data';

// Dummy action to simulate saving a product
const addProductSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export async function addProduct(formData: FormData) {
    const rawFormData = {
        name: formData.get('name'),
        description: formData.get('description'),
    };
    
    console.log('Product saved (simulated):', rawFormData);
    // In a real app, you would save this to a database
    // and revalidate the path to update the product list.
}

export async function handleGenerateDescription(input: GenerateProductDescriptionInput) {
  try {
    const result = await generateProductDescription(input);
    return { success: true, description: result.description };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate description.' };
  }
}

export async function handleSuggestCategories(input: CategorySuggestionInput) {
  try {
    const result = await suggestCategories(input);
    return { success: true, categories: result.suggestedCategories };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to suggest categories.' };
  }
}
