'use client';

import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/src/components/ui/mode-toggle';
import { Button } from '@/src/components/ui/button';
import { useAuth } from '@/src/context/AuthContext';
import { NavbarLogo } from '@/src/components/Home/Navbar/navbar-logo';
import { usePathname } from 'next/navigation';

interface AdminHeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function AdminHeader({
    isSidebarOpen,
    onToggleSidebar,
}: AdminHeaderProps) {
    const { user } = useAuth();
    const pathname = usePathname();

    return (
        <header className='bg-[#0f172a] border-b border-slate-800 z-10 flex shrink-0 items-center justify-between px-6 py-4 whitespace-nowrap'>
            <div className='flex items-center gap-3'>
                <Button
                    variant='ghost'
                    size='icon'
                    className='flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 lg:hidden'
                    onClick={onToggleSidebar}
                >
                    {isSidebarOpen ? (
                        <X className='h-5.5 w-5.5' />
                    ) : (
                        <Menu className='h-5.5 w-5.5' />
                    )}
                </Button>
                <div>
                    <NavbarLogo isLoggedIn={true} pathname={pathname} />
                </div>
            </div>

            <div className='flex flex-1 items-center justify-end gap-4 md:gap-3'>
                <ModeToggle />

                <div className='flex items-center gap-3'>
                    <div className='relative size-10 overflow-hidden rounded-full border border-slate-700 ring-2 ring-blue-500/20'>
                        {user?.profile_picture_url ? (
                            <img
                                src={user.profile_picture_url}
                                alt={user.name}
                                className='h-full w-full object-cover'
                            />
                        ) : (
                            <div className='flex h-full w-full items-center justify-center bg-blue-900 text-sm font-bold text-blue-200'>
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                        )}
                    </div>
                    <div className='hidden flex-col items-start md:flex'>
                        <span className='text-sm font-bold text-white'>
                            {user?.name?.toUpperCase() || 'ADMIN'}
                        </span>
                        <span className='text-xs text-slate-400'>
                            {user?.role === 'SUPER_ADMIN' ? 'ADMIN' : (user?.role || 'ADMIN')}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
