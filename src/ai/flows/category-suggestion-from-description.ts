'use server';

/**
 * @fileOverview Suggests product categories based on the product title and description.
 *
 * - suggestCategories - A function that suggests product categories.
 * - CategorySuggestionInput - The input type for the suggestCategories function.
 * - CategorySuggestionOutput - The return type for the suggestCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorySuggestionInputSchema = z.object({
  productTitle: z.string().describe('The title of the product.'),
  productDescription: z.string().describe('The description of the product.'),
});
export type CategorySuggestionInput = z.infer<typeof CategorySuggestionInputSchema>;

const CategorySuggestionOutputSchema = z.object({
  suggestedCategories: z.array(z.string()).describe('An array of suggested product categories.'),
});
export type CategorySuggestionOutput = z.infer<typeof CategorySuggestionOutputSchema>;

export async function suggestCategories(input: CategorySuggestionInput): Promise<CategorySuggestionOutput> {
  return categorySuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorySuggestionPrompt',
  input: {schema: CategorySuggestionInputSchema},
  output: {schema: CategorySuggestionOutputSchema},
  prompt: `You are an expert in product categorization for online marketplaces.
  Given the title and description of a product, suggest relevant categories for it.
  Return a JSON array of strings.

  Title: {{{productTitle}}}
  Description: {{{productDescription}}}
  Categories:`,
});

const categorySuggestionFlow = ai.defineFlow(
  {
    name: 'categorySuggestionFlow',
    inputSchema: CategorySuggestionInputSchema,
    outputSchema: CategorySuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
