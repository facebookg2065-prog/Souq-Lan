import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AppHeader } from '@/components/app/header';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});


export const metadata: Metadata = {
  title: 'Souq Lan',
  description: 'A multi-vendor marketplace.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-body antialiased`}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            {children}
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
