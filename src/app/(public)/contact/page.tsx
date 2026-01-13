'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/src/components/layout/MainFooter';
import { ContactHero } from '@/src/components/Home/Contact/contact-hero';
import { ContactForm } from '@/src/components/Home/Contact/contact-form';
import { ContactInfo } from '@/src/components/Home/Contact/contact-info';
import { ContactMap } from '@/src/components/Home/Contact/contact-map';
import { ContactFAQ } from '@/src/components/Home/Contact/contact-faq';

export default function ContactPage() {
  return (
    <main
      id='contact'
      className='bg-background-light text-primary dark:bg-background-dark relative min-h-screen overflow-x-hidden antialiased dark:text-white'
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

      <div className='mt-10 w-full px-4 py-8 md:px-10 md:py-12'>
        <div className='mx-auto max-w-300 space-y-8'>
          <ContactHero />

          <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12'>
            <div className='lg:col-span-7 xl:col-span-8'>
              <ContactForm />
            </div>

            <div className='flex flex-col gap-6 lg:col-span-5 xl:col-span-4'>
              <ContactInfo />
              <ContactMap />
              <ContactFAQ />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
