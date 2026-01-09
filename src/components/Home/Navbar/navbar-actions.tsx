import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { ModeToggle } from '@/src/components/ui/mode-toggle';
// import { NavbarUserMenu } from './navbar-user-menu';
import type { Session } from 'next-auth';

interface NavbarActionsProps {
  isLoggedIn: boolean;
  session: Session | null;
}

export function NavbarActions({ isLoggedIn, session }: NavbarActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='z-10 hidden items-center gap-3 lg:flex'
    >
      <ModeToggle />

      {isLoggedIn && session ? (
        <div className='ml-2 flex items-center gap-4'>
          {/* Notification Icon */}
          <button className='relative rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>
            <Bell className='h-5 w-5 text-gray-600 dark:text-gray-300' />
            <span className='absolute top-1.5 right-1.5 h-2 w-2 rounded-full border border-white bg-red-500 dark:border-black' />
          </button>

          {/* Divider */}
          <div className='h-8 w-px bg-gray-200 dark:bg-gray-700' />

          {/* User Dropdown */}
          {/* <NavbarUserMenu session={session} /> */}
        </div>
      ) : (
        <>
          <Link href='/auth/login'>
            <Button className='text-primary h-10 cursor-pointer items-center justify-center rounded-lg bg-transparent px-5 text-sm font-bold transition-colors hover:scale-105 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800'>
              Login
            </Button>
          </Link>
          <Link href='/auth/register'>
            <Button className='bg-primary-dark hover:bg-primary flex h-10 cursor-pointer items-center justify-center rounded-lg px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/30 transition-all hover:scale-105'>
              Daftar
            </Button>
          </Link>
        </>
      )}
    </motion.div>
  );
}
