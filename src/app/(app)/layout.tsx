import { AppSidebar } from '@/components/app/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-secondary/20">
              {children}
          </main>
        </div>
      </SidebarProvider>
  );
}
