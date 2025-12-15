import { LoginForm } from '@/components/app/login-form';
import { Store } from 'lucide-react';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Store className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Souq Lan</h1>
            <p className="text-muted-foreground">Welcome back to your marketplace</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </Suspense>
  );
}
