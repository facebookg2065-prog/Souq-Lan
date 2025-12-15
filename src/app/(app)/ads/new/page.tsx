import { NewAdForm } from '@/components/app/new-ad-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NewAdPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>إضافة إعلان جديد</CardTitle>
            <CardDescription>
              املأ التفاصيل أدناه لإدراج إعلان جديد في السوق.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewAdForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
