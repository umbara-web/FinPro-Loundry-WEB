'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export function CallToAction() {
  return (
    <section className='bg-primary relative overflow-hidden py-20 dark:bg-black'>
      {/* Abstract Background Pattern */}
      <div className='pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-black/10 blur-3xl' />

      <div className='relative z-10 container mx-auto px-4 text-center md:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='mb-6 text-3xl font-black tracking-tight text-white md:text-5xl'>
            Siap Membuat Hidup Lebih Mudah?
          </h2>
          <p className='mx-auto mb-10 max-w-2xl text-xl text-blue-100'>
            Daftar sekarang dan dapatkan diskon 20% untuk laundry pertamamu.
            Gratis antar-jemput!
          </p>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link href='/auth/register'>
              <Button className='text-primary h-14 cursor-pointer rounded-xl bg-white px-8 text-lg font-bold shadow-xl transition-transform hover:-translate-y-1 hover:bg-gray-50'>
                Daftar Sekarang - Gratis!
              </Button>
            </Link>
            <Link href='/contact'>
              <button className='relative cursor-pointer p-1'>
                <div className='absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500' />
                <div className='group relative flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-3 text-lg font-bold text-white transition duration-200 hover:bg-transparent'>
                  <MessageCircle className='h-5 w-5' />
                  Hubungi Kami
                </div>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
