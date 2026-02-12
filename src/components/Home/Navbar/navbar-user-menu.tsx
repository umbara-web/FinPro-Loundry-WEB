import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import {
  ChevronDown,
  User as UserIcon,
  Settings,
  LogOut,
  CreditCard,
  MapPin,
  History,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { User, useAuth } from '@/src/context/AuthContext';
import { useWallet } from '@/src/context/WalletContext';

interface NavbarUserMenuProps {
  user: User;
}

export function NavbarUserMenu({ user }: NavbarUserMenuProps) {
  const { logout } = useAuth();
  const { balance } = useWallet();

  const formatRole = (role?: string) => {
    if (!role) return 'Customer';
    return role
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 transition-colors outline-none hover:bg-gray-200 dark:hover:bg-gray-600'>
          <div className='relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 bg-gray-200 dark:border-gray-700'>
            {user.profile_picture_url ? (
              <img
                src={user.profile_picture_url}
                alt={user.name}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200'>
                {user.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div className='hidden flex-col items-start xl:flex'>
            <span className='max-w-24 truncate text-sm font-bold text-gray-900 dark:text-white'>
              {user.name?.toUpperCase() || 'USER'}
            </span>
            <span className='rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400'>
              {formatRole(user.role)}
            </span>
          </div>
          <ChevronDown className='h-4 w-4 text-gray-500' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='mt-2 w-56'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {user.name?.toUpperCase()}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <CreditCard className='mr-2 h-4 w-4' />
          <span>Saldo: Rp {balance.toLocaleString('id-ID')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {(user.role === 'WORKER' || user.role === 'DRIVER') && (
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link
              href={
                user.role === 'WORKER'
                  ? '/worker-dashboard'
                  : '/driver-dashboard'
              }
            >
              <LayoutDashboard className='mr-2 h-4 w-4' />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href='/dashboard/orders'>
            <History className='mr-2 h-4 w-4' />
            <span>Pesanan</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href='/dashboard/addresses'>
            <MapPin className='mr-2 h-4 w-4' />
            <span>Kelola Alamat</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href='/dashboard/profile'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Pengaturan</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400'
          onClick={() => logout()}
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
