'use client';

import * as React from 'react';
import { BadgeCheck, Leaf, Clock } from 'lucide-react';

export function AboutValues() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-4 text-center md:text-left'>
        <h2 className='text-4xl leading-tight font-bold tracking-[-0.015em] text-black dark:text-white'>
          Our Core Values
        </h2>
        <p className='max-w-180 text-lg text-slate-600 dark:text-slate-300'>
          Built on a foundation of trust and freshness, we strive to exceed
          expectations with every fold.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Value 1 */}
        <div className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'>
          <div className='flex size-12 items-center justify-center rounded-full bg-slate-900/10 text-blue-500'>
            <BadgeCheck className='h-8 w-8' />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-bold text-black dark:text-white'>
              Quality Assurance
            </h3>
            <p className='leading-relaxed text-slate-500 dark:text-slate-400'>
              We treat your clothes like our own. Professional cleaning
              standards for every single garment.
            </p>
          </div>
        </div>
        {/* Value 2 */}
        <div className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'>
          <div className='flex size-12 items-center justify-center rounded-full bg-green-500/10 text-green-600'>
            <Leaf className='h-8 w-8' />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-bold text-black dark:text-white'>
              Eco-Friendly
            </h3>
            <p className='leading-relaxed text-slate-500 dark:text-slate-400'>
              Using strictly biodegradable detergents and high-efficiency
              machines to protect the planet.
            </p>
          </div>
        </div>
        {/* Value 3 */}
        <div className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'>
          <div className='flex size-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-600'>
            <Clock className='h-8 w-8' />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-bold text-black dark:text-white'>
              Reliability
            </h3>
            <p className='leading-relaxed text-slate-500 dark:text-slate-400'>
              On-time pickup and delivery guarantees. We value your time as much
              as you do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
