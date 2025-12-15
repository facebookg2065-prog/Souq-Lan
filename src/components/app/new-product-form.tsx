'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, Loader2 } from 'lucide-react';
import { handleGenerateDescription, handleSuggestCategories } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  keywords: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  discount: z.coerce.number().optional(),
  condition: z.enum(['new', 'used-like-new', 'used-good', 'used-fair']),
});

export function NewProductForm() {
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      keywords: '',
      description: '',
      condition: 'new',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      console.log(values);
      toast({
        title: "Product Submitted!",
        description: "Your new product has been listed.",
      });
      // Here you would typically call a server action to save the product
      // For now, we just log and show a toast
    });
  }

  const handleDescriptionGeneration = () => {
    const { name, keywords } = form.getValues();
    if (!name) {
      toast({ variant: 'destructive', title: 'Product Name Required', description: 'Please enter a product name to generate a description.' });
      return;
    }
    
    setIsGenerating(true);
    startTransition(async () => {
      const result = await handleGenerateDescription({ title: name, keywords: keywords || '' });
      setIsGenerating(false);
      if (result.success && result.description) {
        form.setValue('description', result.description);
        toast({ title: 'Description Generated!', description: 'The AI-powered description has been added.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      }
    });
  };
  
  const handleCategorySuggestion = () => {
    const { name, description } = form.getValues();
    if (!name || !description) {
      toast({ variant: 'destructive', title: 'Name and Description Required', description: 'Please provide a product name and description to get suggestions.' });
      return;
    }

    setIsSuggesting(true);
    startTransition(async () => {
      const result = await handleSuggestCategories({ productTitle: name, productDescription: description });
      setIsSuggesting(false);
      if (result.success && result.categories) {
        setSuggestedCategories(result.categories);
        toast({ title: 'Categories Suggested!', description: 'Select from the AI-powered suggestions.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Modern Teal Chair" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl><Input placeholder="e.g. chair, furniture, modern" {...field} /></FormControl>
                    <FormDescription>Comma-separated keywords for AI generation.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span>Description</span>
                      <Button type="button" variant="outline" size="sm" onClick={handleDescriptionGeneration} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Generate with AI
                      </Button>
                    </FormLabel>
                    <FormControl><Textarea placeholder="Describe your product in detail..." className="min-h-[150px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Media</CardTitle></CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-10 flex flex-col items-center justify-center text-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">Drag & drop images here, or click to browse</p>
                  <Button variant="outline" className="mt-4">Select Files</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Categorization</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span>Category</span>
                      <Button type="button" variant="outline" size="sm" onClick={handleCategorySuggestion} disabled={isSuggesting}>
                        {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Suggest
                      </Button>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="home-goods">Home Goods</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {suggestedCategories.length > 0 && (
                <div className="space-y-2">
                  <FormLabel className="text-sm">Suggested Categories</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {suggestedCategories.map((cat, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="cursor-pointer"
                        onClick={() => form.setValue('category', cat.toLowerCase().replace(/\s+/g, '-'))}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Pricing & Condition</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price (Optional)</FormLabel>
                    <FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used-like-new">Used - Like New</SelectItem>
                        <SelectItem value="used-good">Used - Good</SelectItem>
                        <SelectItem value="used-fair">Used - Fair</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
