'use client';

import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

import { SERVICES } from '@/src/data/services';

export function Services() {
  return (
    <section
      className='bg-background-light dark:bg-background-dark py-16 md:py-24'
      id='services'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end'>
          <div className='max-w-2xl'>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl dark:text-white'
            >
              Layanan Kami
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='text-lg text-gray-500 dark:text-gray-400'
            >
              Pilih layanan yang sesuai dengan kebutuhan pakaian Anda.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='text-primary flex items-center gap-1 font-bold hover:underline dark:text-gray-200'
            href='#pricing'
          >
            Lihat daftar harga lengkap <ArrowRight className='h-4 w-4' />
          </motion.a>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/50 dark:border-gray-800 dark:bg-slate-950 dark:hover:shadow-xl dark:hover:shadow-blue-600/50'
            >
              <div className='relative h-48 overflow-hidden'>
                <img
                  alt={service.title}
                  className='h-full w-full object-fill transition-transform duration-500 group-hover:scale-105'
                  src={service.image}
                />
                {service.tag && (
                  <div
                    className={`absolute top-4 right-4 ${service.tagColor} rounded-full px-3 py-1 text-xs font-bold shadow-md`}
                  >
                    {service.tag}
                  </div>
                )}
              </div>
              <div className='flex flex-1 flex-col p-6'>
                <h3 className='text-primary mb-2 text-xl font-bold dark:text-white'>
                  {service.title}
                </h3>
                <p className='mb-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400'>
                  {service.desc}
                </p>
                <div className='mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700'>
                  <div>
                    <span className='text-xs text-gray-500'>Mulai dari</span>
                    <div className='text-primary text-lg font-black dark:text-white'>
                      {service.price}
                      <span className='text-xs font-normal text-gray-500'>
                        {service.unit}
                      </span>
                    </div>
                  </div>
                  <button className='text-primary-dark hover:bg-primary rounded-lg bg-blue-50 p-2 transition-colors hover:text-white dark:bg-blue-900/30'>
                    <Plus className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
