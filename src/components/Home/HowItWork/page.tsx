'use client';

import { motion } from 'framer-motion';
import { STEPS } from '@/src/data/how-it-works';
import { PinContainer } from '@/src/components/ui/3d-pin';

export function HowItWorks() {
  return (
    <section className='bg-white py-16 md:py-24 dark:bg-[#0b1018]'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl dark:text-white'>
              Cara Kerjanya
            </h2>
            <p className='text-lg text-gray-500 dark:text-gray-400'>
              Nikmati kemudahan laundry dalam 4 langkah mudah. Kami jemput,
              proses, dan antar kembali.
            </p>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='flex min-h-100 items-center justify-center py-10'
            >
              <PinContainer
                title={`Step ${step.id}`}
                href='#services'
                className='-z-50 w-[18rem]'
              >
                <div
                  className='group relative flex h-96 w-[18rem] basis-full flex-col rounded-2xl bg-cover bg-center p-4 tracking-tight text-slate-100/50 sm:basis-1/2'
                  style={{ backgroundImage: `url(${step.backgroundImage})` }}
                >
                  <div className='absolute inset-0 rounded-2xl bg-black/60' />
                  <div className='relative z-10 flex h-full flex-col'>
                    <div className='relative mt-0 flex min-h-48 w-full flex-1 items-center justify-center overflow-hidden rounded-2xl'>
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${step.gradient} opacity-100`}
                      />
                      <div
                        className={`flex h-24 w-24 transform items-center justify-center rounded-3xl border border-white/20 bg-white/20 shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110`}
                      >
                        <step.icon
                          className='h-10 w-10 text-white drop-shadow-md'
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-2 p-2'>
                      <h3 className='m-0! max-w-xs pb-2! text-xl font-bold text-slate-100'>
                        {step.title}
                      </h3>
                      <div className='m-0! p-0! text-base font-normal'>
                        <span className='text-slate-100'>
                          {step.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
