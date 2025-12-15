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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, Loader2, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { handleGenerateDescription, handleSuggestCategories } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Ad title must be at least 3 characters.' }),
  keywords: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  adType: z.enum(['normal', 'featured', 'paid']),
  duration: z.date().optional(),
});

export function NewAdForm() {
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      keywords: '',
      description: '',
      adType: 'normal',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      console.log(values);
      toast({
        title: "Ad Submitted!",
        description: "Your new ad has been listed for review.",
      });
      // Here you would typically call a server action to save the ad
    });
  }

  const handleDescriptionGeneration = () => {
    const { title, keywords } = form.getValues();
    if (!title) {
      toast({ variant: 'destructive', title: 'Ad Title Required', description: 'Please enter an ad title to generate a description.' });
      return;
    }
    
    setIsGenerating(true);
    startTransition(async () => {
      const result = await handleGenerateDescription({ title: title, keywords: keywords || '' });
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
    const { title, description } = form.getValues();
    if (!title || !description) {
      toast({ variant: 'destructive', title: 'Title and Description Required', description: 'Please provide an ad title and description to get suggestions.' });
      return;
    }

    setIsSuggesting(true);
    startTransition(async () => {
      const result = await handleSuggestCategories({ productTitle: title, productDescription: description });
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
            <CardHeader><CardTitle>Ad Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad Title</FormLabel>
                    <FormControl><Input placeholder="e.g. Modern Teal Chair for Sale" {...field} /></FormControl>
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
                    <FormControl><Textarea placeholder="Describe your item in detail..." className="min-h-[150px]" {...field} /></FormControl>
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
                  <p className="mt-4 text-muted-foreground">Drag & drop images here, or click to browse (multiple supported)</p>
                  <Button variant="outline" className="mt-4">Select Files</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Categorization & Location</CardTitle></CardHeader>
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
                        <SelectItem value="vehicles">Vehicles</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
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
               <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g. Riyadh, Saudi Arabia" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Pricing & Type</CardTitle></CardHeader>
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
                name="adType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Ad Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="normal" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Normal
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="featured" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Featured <Badge variant="outline" className="ml-2">+$</Badge>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="paid" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Paid Campaign <Badge variant="outline" className="ml-2">Budget</Badge>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ad Duration</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an expiration date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When will this ad expire? (Optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Ad for Review
          </Button>
        </div>
      </form>
    </Form>
  );
}
