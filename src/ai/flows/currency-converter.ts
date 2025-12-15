'use server';
/**
 * @fileOverview Converts currency from USD to a target currency using a mock exchange rate.
 *
 * - convertCurrency - A function that converts a currency amount.
 * - CurrencyConversionInput - The input type for the convertCurrency function.
 * - CurrencyConversionOutput - The return type for the convertCurrency function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CurrencyConversionInputSchema = z.object({
  amount: z.number().describe('The amount in the base currency (USD).'),
  targetCurrency: z.string().describe('The target currency code (e.g., "EUR", "SAR").'),
});
export type CurrencyConversionInput = z.infer<typeof CurrencyConversionInputSchema>;

const CurrencyConversionOutputSchema = z.object({
  convertedAmount: z.number().describe('The converted amount in the target currency.'),
  currency: z.string().describe('The target currency code.'),
});
export type CurrencyConversionOutput = z.infer<typeof CurrencyConversionOutputSchema>;

export async function convertCurrency(input: CurrencyConversionInput): Promise<CurrencyConversionOutput> {
  return currencyConverterFlow(input);
}

const getExchangeRateTool = ai.defineTool(
  {
    name: 'getExchangeRateTool',
    description: 'Gets the exchange rate between two currencies.',
    inputSchema: z.object({
      baseCurrency: z.string().default('USD'),
      targetCurrency: z.string(),
    }),
    outputSchema: z.object({
      rate: z.number(),
    }),
  },
  async (input) => {
    // MOCK IMPLEMENTATION: In a real-world scenario, you would fetch this from an API.
    const mockRates: Record<string, number> = {
      'EUR': 0.93,
      'SAR': 3.75,
      'AED': 3.67,
      'USD': 1.0,
    };
    const rate = mockRates[input.targetCurrency] || 1;
    console.log(`Mock exchange rate for ${input.targetCurrency}: ${rate}`);
    return { rate };
  }
);

const prompt = ai.definePrompt({
  name: 'currencyConversionPrompt',
  input: { schema: CurrencyConversionInputSchema },
  output: { schema: CurrencyConversionOutputSchema },
  tools: [getExchangeRateTool],
  prompt: `Convert the given amount to the target currency. Use the getExchangeRateTool to find the correct exchange rate.

  Amount: {{amount}}
  Target Currency: {{targetCurrency}}
  
  Return ONLY the final JSON object with the converted amount and currency symbol.`,
});

const currencyConverterFlow = ai.defineFlow(
  {
    name: 'currencyConverterFlow',
    inputSchema: CurrencyConversionInputSchema,
    outputSchema: CurrencyConversionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
