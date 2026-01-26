import { motion, AnimatePresence } from 'framer-motion';
import { ModeToggle } from '@/src/components/ui/mode-toggle';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { signOut } from 'next-auth/react';

interface NavbarMobileProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  isVerified: boolean;
  menuItems: Array<{ label: string; href: string }>;
}

export function NavbarMobile({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isLoggedIn,
  isVerified,
  menuItems,
}: NavbarMobileProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className='z-10 flex items-center justify-center lg:hidden'>
        <ModeToggle />
        <Button
          variant='ghost'
          className='z-10 flex size-10 cursor-pointer items-center justify-center text-gray-700 lg:hidden dark:text-gray-200'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='fixed inset-x-4 top-24 z-50 h-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl lg:hidden dark:border-gray-800 dark:bg-black'
          >
            <nav className='flex flex-col gap-2'>
              {isLoggedIn && !isVerified && (
                <div className='mb-2 flex items-center justify-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-2 text-sm font-medium text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-500'>
                  <span className='relative flex h-2 w-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75'></span>
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-yellow-500'></span>
                  </span>
                  Akun Belum Diverifikasi
                </div>
              )}
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='text-md p-3 font-medium text-black transition-colors hover:rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className='mt-4 flex flex-col items-center gap-3 border-t border-gray-200 pt-4 dark:border-gray-800'>
                <div className='flex w-full justify-end'></div>
                {isLoggedIn ? (
                  <Button
                    variant='outline'
                    className='h-12 w-full rounded-lg border-red-200 bg-red-50 font-bold text-red-600 hover:bg-red-100'
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href='/auth/login' className='w-full'>
                      <Button
                        variant='outline'
                        className='h-12 cursor-pointer rounded-lg bg-gray-100 font-bold text-black hover:bg-gray-500/90 hover:text-white'
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href='/auth/register' className='w-full'>
                      <Button
                        variant='outline'
                        className='h-12 rounded-lg bg-gray-950 font-bold text-white hover:bg-gray-500/90 hover:text-black'
                      >
                        Daftar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
