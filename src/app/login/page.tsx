import { LoginForm } from '@/components/app/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense>
      <div className="container relative flex h-screen flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8"><rect width="256" height="256" fill="none"></rect><path d="M216,48H40a8,8,0,0,0-8,8V176a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A8,8,0,0,0,216,48Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M32,88H224a0,0,0,0,1,0,0v88a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V88A0,0,0,0,1,32,88Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="104" y1="128" x2="152" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
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
