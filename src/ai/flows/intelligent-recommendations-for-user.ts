'use server';
/**
 * @fileOverview Provides product recommendations to a user based on their history and profile.
 *
 * - intelligentRecommendationsForUser - A function that generates product recommendations for a user.
 * - IntelligentRecommendationsForUserInput - The input type for the intelligentRecommendationsForUser function.
 * - IntelligentRecommendationsForUserOutput - The return type for the intelligentRecommendationsForUser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentRecommendationsForUserInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate recommendations.'),
  browsingHistory: z.array(z.string()).describe('List of product IDs the user has viewed.'),
  purchaseHistory: z.array(z.string()).describe('List of product IDs the user has purchased.'),
  userProfile: z
    .object({
      age: z.number().optional().describe('The user\u2019s age.'),
      gender: z.string().optional().describe('The user\u2019s gender.'),
      interests: z.array(z.string()).optional().describe('The user\u2019s interests.'),
    })
    .describe('The user profile information.'),
  numberOfRecommendations: z.number().default(5).describe('The number of product recommendations to generate.'),
});
export type IntelligentRecommendationsForUserInput = z.infer<typeof IntelligentRecommendationsForUserInputSchema>;

const IntelligentRecommendationsForUserOutputSchema = z.object({
  productRecommendations: z
    .array(z.string())
    .describe('A list of product IDs recommended for the user, limited to the number requested in the input.'),
});
export type IntelligentRecommendationsForUserOutput = z.infer<typeof IntelligentRecommendationsForUserOutputSchema>;

export async function intelligentRecommendationsForUser(input: IntelligentRecommendationsForUserInput): Promise<IntelligentRecommendationsForUserOutput> {
  return intelligentRecommendationsForUserFlow(input);
}

const identifyItemCharacteristicsTool = ai.defineTool({
  name: 'identifyItemCharacteristics',
  description: 'Identifies the key characteristics of a product based on its description.',
  inputSchema: z.object({
    productId: z.string().describe('The ID of the product.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of key characteristics of the product.'),
});

const prompt = ai.definePrompt({
  name: 'intelligentRecommendationsForUserPrompt',
  input: {schema: IntelligentRecommendationsForUserInputSchema},
  output: {schema: IntelligentRecommendationsForUserOutputSchema},
  tools: [identifyItemCharacteristicsTool],
  prompt: `You are an expert recommendation system designed to provide personalized product recommendations to users based on their past behavior and profile information.

  User ID: {{userId}}
  Browsing History: {{browsingHistory}}
  Purchase History: {{purchaseHistory}}
  User Profile: {{userProfile}}

  Based on this information, recommend {{numberOfRecommendations}} products that the user is likely to be interested in.  Use the identifyItemCharacteristics tool to determine the characteristics of the products the user has viewed and purchased, and select other products with similar characteristics.

  Return a list of product IDs for the recommended products.  Do not provide any explanation, just a JSON array of product IDs.
  `,
});

const intelligentRecommendationsForUserFlow = ai.defineFlow(
  {
    name: 'intelligentRecommendationsForUserFlow',
    inputSchema: IntelligentRecommendationsForUserInputSchema,
    outputSchema: IntelligentRecommendationsForUserOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
