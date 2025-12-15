'use server';

import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/product-description-generator';
import { suggestCategories, CategorySuggestionInput } from '@/ai/flows/category-suggestion-from-description';
import { z } from 'zod';

// Dummy action to simulate saving an ad
const addAdSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export async function addAd(formData: FormData) {
    const rawFormData = {
        name: formData.get('name'),
        description: formData.get('description'),
    };
    
    console.log('Ad saved (simulated):', rawFormData);
    // In a real app, you would save this to a database
    // and revalidate the path to update the ad list.
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
