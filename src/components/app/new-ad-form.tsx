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
            <CardHeader><CardTitle>تفاصيل الإعلان</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الإعلان</FormLabel>
                    <FormControl><Input placeholder="مثال: كرسي عصري للبيع" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكلمات المفتاحية</FormLabel>
                    <FormControl><Input placeholder="مثال: كرسي, أثاث, عصري" {...field} /></FormControl>
                    <FormDescription>كلمات مفتاحية مفصولة بفواصل لتوليد الوصف بالذكاء الاصطناعي.</FormDescription>
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
                      <span>الوصف</span>
                      <Button type="button" variant="outline" size="sm" onClick={handleDescriptionGeneration} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        توليد بالذكاء الاصطناعي
                      </Button>
                    </FormLabel>
                    <FormControl><Textarea placeholder="صف المنتج بالتفصيل..." className="min-h-[150px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>الوسائط</CardTitle></CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-10 flex flex-col items-center justify-center text-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">اسحب الصور وأفلتها هنا، أو انقر للتصفح (يدعم صور متعددة)</p>
                  <Button variant="outline" className="mt-4">اختر الملفات</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>التصنيف والموقع</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span>الفئة</span>
                      <Button type="button" variant="outline" size="sm" onClick={handleCategorySuggestion} disabled={isSuggesting}>
                        {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        اقترح
                      </Button>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="اختر فئة" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">إلكترونيات</SelectItem>
                        <SelectItem value="furniture">أثاث</SelectItem>
                        <SelectItem value="apparel">ملابس</SelectItem>
                        <SelectItem value="home-goods">أدوات منزلية</SelectItem>
                        <SelectItem value="accessories">إكسسوارات</SelectItem>
                        <SelectItem value="vehicles">مركبات</SelectItem>
                        <SelectItem value="property">عقارات</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {suggestedCategories.length > 0 && (
                <div className="space-y-2">
                  <FormLabel className="text-sm">الفئات المقترحة</FormLabel>
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
                    <FormLabel>الموقع</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="مثال: الرياض, السعودية" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>التسعير والنوع</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
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
                    <FormLabel>نوع الإعلان</FormLabel>
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
                            عادي
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="featured" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            مميز <Badge variant="outline" className="ml-2">+$</Badge>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="paid" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            حملة مدفوعة <Badge variant="outline" className="ml-2">ميزانية</Badge>
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
                    <FormLabel>مدة الإعلان</FormLabel>
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
                              <span>اختر تاريخ انتهاء الصلاحية</span>
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
                      متى سينتهي هذا الإعلان؟ (اختياري)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            إرسال الإعلان للمراجعة
          </Button>
        </div>
      </form>
    </Form>
  );
}
