'use client';

import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/src/components/layout/MainFooter';
import { Hero } from '@/src/components/Home/HeroSection/page';
import { AboutValues } from '@/src/components/Home/AboutUs/about-values';
import { AboutJourney } from '@/src/components/Home/AboutUs/about-journey';
import { AboutTeam } from '@/src/components/Home/AboutUs/about-team';
import { AboutCTA } from '@/src/components/Home/AboutUs/about-cta';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main
      id='about'
      className='bg-background-light dark:bg-background-dark text-primary relative min-h-screen overflow-x-hidden antialiased dark:text-white'
    >
      <div className='container mx-auto px-4'>
        <div className='fixed top-4 z-50 text-lg font-medium'>
          <Link
            href='/'
            className='flex items-center gap-2 transition-colors hover:text-blue-500'
          >
            <ArrowLeft className='h-6 w-6' />
            <span className='text-xl font-bold'>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
      <Hero />
      <div className='custom-container flex w-full flex-col items-center px-4 py-12 md:px-10 lg:px-40'>
        <div className='flex w-full max-w-240 flex-col gap-16'>
          <AboutValues />
          <AboutJourney />
          <AboutTeam />
        </div>
      </div>
      <AboutCTA />
      <Footer />
    </main>
  );
}
