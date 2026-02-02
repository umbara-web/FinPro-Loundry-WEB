'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import { useEffect, useState } from 'react';

export function WelcomeSection() {
  const { user } = useAuth();

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 11) setGreeting('Selamat Pagi');
      else if (hour >= 11 && hour < 15) setGreeting('Selamat Siang');
      else if (hour >= 15 && hour < 18) setGreeting('Selamat Sore');
      else setGreeting('Selamat Malam');
    };

    updateGreeting();
    // Update every minute to keep it real-time
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-center justify-between gap-10 md:flex-row md:items-end'>
      <WelcomeText userName={user?.name} greeting={greeting} />
      <CreateOrderButton />
    </div>
  );
}

function WelcomeText({
  userName,
  greeting,
}: {
  userName?: string;
  greeting: string;
}) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <h1 className='text-3xl leading-tight font-black tracking-tight text-slate-900 md:text-4xl dark:text-white'>
        {greeting},<br />
        <span className='text-primary dark:text-white'>
          {userName?.toUpperCase() || 'USER'}
        </span>{' '}
        ! 👋
      </h1>
      <p className='text-base font-normal text-slate-500 dark:text-[#92adc9]'>
        Pantau status cucian dan atur pesanan Anda di sini.
      </p>
    </div>
  );
}

function CreateOrderButton() {
  return (
    <Link href='/dashboard/orders?tab=submission'>
      <Button
        variant='outline'
        className='group flex h-12 w-auto transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-white shadow-lg shadow-blue-500/20 transition-all hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 dark:text-white dark:hover:text-black'
      >
        <PlusCircle className='h-5 w-5 transition-transform group-hover:rotate-90' />
        <span className='text-base font-bold tracking-wide'>
          Buat Pesanan Baru
        </span>
      </Button>
    </Link>
  );
}
