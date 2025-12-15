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
            <h1 className="font-semibold text-3xl tracking-tight">Ads</h1>
            <p className="text-muted-foreground">Manage your ads and view their performance.</p>
          </div>
          <Button asChild>
            <Link href="/ads/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Ad
            </Link>
          </Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Ads</CardTitle>
          <CardDescription>
            A list of all ads in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Status
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
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
                    <Badge variant="secondary">Active</Badge>
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
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Pause</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
            Showing <strong>1-8</strong> of <strong>{ads.length}</strong> ads
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
