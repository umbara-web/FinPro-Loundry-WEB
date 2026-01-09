'use client';

import { motion } from 'framer-motion';
import { Map, Store, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Locations() {
  return (
    <section
      className='overflow-hidden bg-white py-16 md:py-24 dark:bg-slate-950'
      id='locations'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='flex flex-col items-center gap-12 lg:flex-row'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='flex-1 space-y-8'
          >
            <div>
              <div className='text-primary-dark mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider uppercase dark:bg-blue-900/30'>
                <Map className='h-4 w-4' /> Coverage Area
              </div>
              <h2 className='text-primary mb-6 text-3xl font-extrabold tracking-tight md:text-4xl dark:text-white'>
                Kami Hadir di Dekat Anda
              </h2>
              <p className='text-lg leading-relaxed text-gray-500 dark:text-gray-400'>
                FreshLaundry telah memiliki lebih dari 15 outlet yang tersebar
                di Jabodetabek. Temukan outlet terdekat untuk layanan drop-off
                atau nikmati layanan antar-jemput gratis untuk radius 5km.
              </p>
            </div>

            <div className='space-y-4'>
              <div className='bg-background-light dark:bg-background-dark/50 flex items-start gap-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800'>
                <div className='text-primary-dark mt-1'>
                  <Store className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='text-primary font-bold dark:text-white'>
                    FreshLaundry Pusat - Jakarta Selatan
                  </h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Jl. Kemang Raya No. 12, Jakarta Selatan
                  </p>
                </div>
              </div>
              <div className='bg-background-light dark:bg-background-dark/50 flex items-start gap-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800'>
                <div className='text-primary-dark mt-1'>
                  <Store className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='text-primary font-bold dark:text-white'>
                    FreshLaundry Branch - BSD City
                  </h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Ruko Golden Boulevard, Blok F, BSD City
                  </p>
                </div>
              </div>
            </div>

            <Link href='/contact'>
              <button className='relative cursor-pointer p-1'>
                <div className='absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500' />
                <div className='group relative flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-bold text-white transition duration-200 hover:bg-transparent'>
                  Lihat Semua Outlet
                  <ArrowRight className='h-4 w-4' />
                </div>
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='relative w-full flex-1'
          >
            <div className='relative aspect-square w-full overflow-hidden rounded-2xl border-4 border-white shadow-2xl md:aspect-4/3 dark:border-gray-700'>
              <img
                alt='Map view of city streets'
                className='h-full w-full object-cover'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuB7cMm7NflHqEVjH8MeeVtfvsuD3UxfRHyL_uM4rfhILHB_Id_Gk3xBaZbVovs4o20RF5N0xzU_T9kLjxOrpnkdqSk7Ayx_49f5DS-4jQB0PYKPrDaAd7Um2YTgqfbuXOJOrYb-9EZaeCdry2I5y_O31a9rSqhR-wzKHAqJwsaoNRMKpLn_bBKQ88tekJ0qNJ1IHIbl2yMizRGBXaMZ8ipq6cdbLfyP8f22R43WT4FcixO-wzJPuyuP03tPMa8QpddxDvV0l0242A4'
              />

              {/* Map Markers Overlay Simulation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
                className='absolute top-1/4 left-1/3'
              >
                <div className='relative'>
                  <MapPin
                    className='text-primary-dark h-12 w-12 drop-shadow-md'
                    fill='currentColor'
                  />
                  <div className='absolute -bottom-1 left-2 h-2 w-8 rounded-full bg-black/20 blur-sm' />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: 1,
                  ease: 'easeInOut',
                }}
                className='absolute right-1/4 bottom-1/3'
              >
                <div className='relative'>
                  <MapPin
                    className='text-primary-dark h-12 w-12 drop-shadow-md'
                    fill='currentColor'
                  />
                  <div className='absolute -bottom-1 left-2 h-2 w-8 rounded-full bg-black/20 blur-sm' />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
