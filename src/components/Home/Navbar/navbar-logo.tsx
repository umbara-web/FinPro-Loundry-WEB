import Link from 'next/link';
import { WashingMachine } from 'lucide-react';
import { ColourfulText } from '@/src/components/ui/colourful-text';
import { motion } from 'framer-motion';

interface NavbarLogoProps {
  isLoggedIn: boolean;
  pathname: string;
}

export function NavbarLogo({ isLoggedIn, pathname }: NavbarLogoProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    const targetPath = isLoggedIn ? '/dashboard' : '/';
    if (pathname === targetPath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className='z-10 flex items-center gap-1'
    >
      <Link
        href={isLoggedIn ? '/dashboard' : '/'}
        className='flex items-center gap-1'
        onClick={handleLogoClick}
      >
        <div className='text-primary dark:text-background-light flex size-10 items-center justify-center rounded-xl bg-transparent'>
          <WashingMachine className='h-6 w-6' />
        </div>
        <h2 className='text-primary text-xl font-bold tracking-tight dark:text-white'>
          <ColourfulText text='FreshLaundry' />
        </h2>
      </Link>
    </motion.div>
  );
}
