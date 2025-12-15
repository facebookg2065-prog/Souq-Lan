'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  MessageCircle,
  Settings,
  Store,
  LogOut,
  Megaphone,
} from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signOut } from '@/firebase/auth/actions';


const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/ads', label: 'Ads', icon: Megaphone },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/customers', label: 'Customers', icon: Users2 },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await firebaseSignOut(auth);
    await signOut();
    router.push('/login');
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary"><rect width="256" height="256" fill="none"></rect><path d="M216,48H40a8,8,0,0,0-8,8V176a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A8,8,0,0,0,216,48Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M32,88H224a0,0,0,0,1,0,0v88a8,8,0,0,1-8,8H40a8,8-0,0,1-8-8V88A0,0,0,0,1,32,88Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="104" y1="128" x2="152" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
          <span className="font-semibold text-lg">Souq Lan</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={item.label}
                >
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
         <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/settings" passHref>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/settings')} tooltip="Settings">
                        <span>
                            <Settings />
                            <span>Settings</span>
                        </span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout" onClick={handleLogout}>
                    <span>
                        <LogOut />
                        <span>Logout</span>
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
