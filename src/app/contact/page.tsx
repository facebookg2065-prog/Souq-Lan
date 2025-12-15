'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'يجب أن يتكون الاسم من حرفين على الأقل.' }),
  email: z.string().email({ message: 'الرجاء إدخال بريد إلكتروني صحيح.' }),
  message: z.string().min(10, { message: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.' }),
});

export default function ContactPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Here you would call a server action to send the message
        console.log(values);
        toast({
            title: 'تم إرسال الرسالة!',
            description: 'شكرًا لتواصلك معنا. سنقوم بالرد في أقرب وقت ممكن.',
        });
        form.reset();
    }

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-6">
            <h1 className="text-4xl font-bold font-headline">تواصل معنا</h1>
            <p className="text-lg text-muted-foreground">
                نحن هنا للمساعدة. سواء كان لديك سؤال حول المنصة، أو تحتاج إلى دعم، أو ترغب في تقديم ملاحظات، فريقنا جاهز للاستماع.
            </p>
            <div className="space-y-4">
                <a href="mailto:support@souqlan.com" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                    <span>support@souqlan.com</span>
                </a>
                <div className="flex items-center gap-3 text-lg">
                    <Phone className="w-6 h-6 text-primary" />
                    <span>+966 11 123 4567</span>
                </div>
            </div>
             {/* Social Links can be added here */}
        </div>
        <Card>
            <CardHeader>
            <CardTitle>أرسل لنا رسالة</CardTitle>
            <CardDescription>املأ النموذج أدناه وسنعاود الاتصال بك.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>الاسم</FormLabel>
                            <FormControl>
                            <Input placeholder="اسمك الكامل" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                            <Input placeholder="example@mail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>رسالتك</FormLabel>
                            <FormControl>
                            <Textarea placeholder="اكتب رسالتك هنا..." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        إرسال الرسالة
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
