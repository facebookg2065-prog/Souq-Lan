import { NewProductForm } from '@/components/app/new-product-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NewProductPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Fill out the details below to list a new product on the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
