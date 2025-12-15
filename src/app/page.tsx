
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { products as ads, categories } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  MapPin,
  Star,
  Tag,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[hsl(var(--primary-dark))] to-[hsl(var(--primary-light))]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-[1fr_550px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl xl:text-6xl/none font-headline">
                    اكتشف كنوزك التالية في سوق لان
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    السوق المثالي للبيع والشراء. استكشف آلاف الإعلانات من مجتمع البائعين الموثوقين لدينا.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="#featured-ads">تصفح الإعلانات</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/ads/new">أضف إعلانك</Link>
                  </Button>
                </div>
              </div>
               <Carousel className="w-full max-w-lg xl:max-w-xl mx-auto">
                <CarouselContent>
                  {ads.slice(0, 3).map((ad, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <Image
                              src={ad.imageUrl}
                              alt={ad.name}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover aspect-[3/2]"
                              data-ai-hint={ad.imageHint}
                            />
                          </CardContent>
                          <CardHeader className="p-4">
                             <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg font-headline">{ad.name}</h3>
                                <div className="font-bold text-primary text-lg">${ad.price.toFixed(2)}</div>
                             </div>
                             <p className="text-sm text-muted-foreground">{ad.vendor}</p>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  تصفح حسب الفئة
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ابحث عما تريده بالضبط من خلال استكشاف فئاتنا المختارة بعناية.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-12">
              {categories.map((category) => (
                <Link
                  href="#"
                  key={category.name}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-center font-headline">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Ads Section */}
        <section id="featured-ads" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                إعلانات مميزة
              </h2>
              <Button asChild variant="link">
                <Link href="#">
                  عرض الكل <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ads.map((ad) => (
                <Card key={ad.id} className="group overflow-hidden">
                  <CardHeader className="p-0 relative">
                    <Image
                      src={ad.imageUrl}
                      alt={ad.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={ad.imageHint}
                    />
                     <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-background/50 backdrop-blur-sm hover:bg-background/75 rounded-full h-8 w-8">
                        <Heart className="w-4 h-4 text-white" />
                      </Button>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg truncate font-headline">{ad.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Tag className="w-4 h-4" />
                      <span>{ad.category}</span>
                    </div>
                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>الرياض</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                       <div className="text-xl font-bold text-primary">${ad.price.toFixed(2)}</div>
                       <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{ad.rating}</span>
                       </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                     <Button asChild className="w-full">
                        <Link href="#">عرض التفاصيل</Link>
                     </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary-dark text-primary-foreground py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
                <h4 className="font-bold text-lg font-headline">سوق لان</h4>
                <p className="text-sm text-primary-foreground/80">سوقك لكل شيء.</p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold font-headline">روابط سريعة</h4>
                <ul className="space-y-1 text-sm text-primary-foreground/80">
                    <li><Link href="/about" className="hover:underline">حول التطبيق</Link></li>
                    <li><Link href="/who-we-are" className="hover:underline">من نحن</Link></li>
                    <li><Link href="/contact" className="hover:underline">تواصل بنا</Link></li>
                    <li><Link href="/privacy-policy" className="hover:underline">سياسة الخصوصية</Link></li>
                </ul>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold font-headline">الأقسام</h4>
                 <ul className="space-y-1 text-sm text-primary-foreground/80">
                    <li><Link href="#" className="hover:underline">الإلكترونيات</Link></li>
                    <li><Link href="#" className="hover:underline">الأثاث</Link></li>
                    <li><Link href="#" className="hover:underline">الملابس</Link></li>
                    <li><Link href="#" className="hover:underline">المركبات</Link></li>
                </ul>
            </div>
             <div className="space-y-2">
                <h4 className="font-semibold font-headline">الدعم</h4>
                 <ul className="space-y-1 text-sm text-primary-foreground/80">
                    <li><Link href="/contact" className="hover:underline">مركز المساعدة</Link></li>
                    <li><Link href="#" className="hover:underline">شروط الخدمة</Link></li>
                </ul>
            </div>
        </div>
      </footer>
    </div>
  );
}
