
import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { products as ads } from '@/lib/data';

export default function AdsPage() {
  return (
    <div className="flex flex-col gap-4">
       <div className="flex items-center">
          <div className="flex-1">
            <h1 className="font-semibold text-3xl tracking-tight">إعلاناتي</h1>
            <p className="text-muted-foreground">إدارة إعلاناتك وعرض أدائها.</p>
          </div>
          <Button asChild>
            <Link href="/ads/new">
              <PlusCircle className="mr-2 h-4 w-4" /> إضافة إعلان
            </Link>
          </Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>كل الإعلانات</CardTitle>
          <CardDescription>
            قائمة بجميع إعلاناتك في المتجر.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">صورة</span>
                </TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead className="hidden md:table-cell">السعر</TableHead>
                <TableHead className="hidden md:table-cell">
                  الحالة
                </TableHead>
                <TableHead>
                  <span className="sr-only">إجراءات</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={ad.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={ad.imageUrl}
                      width="64"
                      data-ai-hint={ad.imageHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ad.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${ad.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">نشط</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">فتح القائمة</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                        <DropdownMenuItem>إيقاف مؤقت</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            عرض <strong>1-8</strong> من <strong>{ads.length}</strong> إعلان
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
