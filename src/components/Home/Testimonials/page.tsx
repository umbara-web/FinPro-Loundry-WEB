'use client';

import { AnimatedTestimonials } from '@/src/components/ui/animated-testimonials';
import { TESTIMONIALS } from '@/src/data/testimonials';

export function Testimonials() {
  return (
    <section
      className='bg-background-light dark:bg-background-dark py-16 md:py-24'
      id='testimonials'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl dark:text-white'>
            Kata Pelanggan Kami
          </h2>
          <p className='text-lg text-gray-500 dark:text-gray-400'>
            Ribuan pelanggan telah mempercayakan pakaian kesayangan mereka
            kepada FreshLaundry.
          </p>
        </div>
        <div className='relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200/50 bg-gray-200/50 p-6 shadow-xl dark:border-gray-800 dark:bg-slate-900 dark:shadow-blue-500/50'>
          {/* Magic Border Container */}
          <div className='pointer-events-none absolute inset-0 z-0 rounded-[inherit]'>
            <div
              className='absolute inset-0 rounded-[inherit]'
              style={{
                padding: '2px', // Border width
                background: 'transparent',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
              }}
            >
              <div className='absolute -inset-full animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#2b7fff_50%,#0000_100%)] opacity-100' />
            </div>
          </div>

          <div className='relative z-10'>
            <AnimatedTestimonials
              testimonials={TESTIMONIALS.map((t) => ({
                quote: t.content.replace(/^"|"$/g, ''), // Remove quotes if present since component design seems to handle it or it looks cleaner
                name: t.name,
                designation: t.role,
                src: t.avatar,
                rating: t.rating,
              }))}
              autoplay={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
