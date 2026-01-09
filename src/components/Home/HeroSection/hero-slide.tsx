import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Truck } from 'lucide-react';
import { contentVariants, imageVariants } from './hero-animations';

interface HeroSlideProps {
  slide: any;
}

export function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <img
          src={slide.image}
          alt={slide.title}
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/40 bg-linear-to-t from-black/80 via-black/20 to-black/40' />
      </div>

      {/* Content */}
      <motion.div
        className='relative z-10 flex max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center'
        variants={contentVariants}
      >
        <span className='inline-flex items-center rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-bold text-white shadow-sm backdrop-blur-md'>
          {slide.badge}
        </span>

        <h1 className='text-4xl leading-[1.1] font-black tracking-tight text-balance text-white drop-shadow-lg md:text-6xl lg:text-7xl'>
          {slide.title.split(',').length > 1 ? (
            <>
              {slide.title.split(',')[0]},
              <span className='bg-linear-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent'>
                {slide.title.split(',')[1]}
              </span>
            </>
          ) : (
            slide.title
          )}
        </h1>

        <p className='max-w-2xl text-lg leading-relaxed text-white/50 drop-shadow-md md:text-xl'>
          {slide.desc}
        </p>

        <div className='flex flex-wrap justify-center gap-4 pt-4'>
          <Link
            href='/auth/login'
            className='flex h-12 items-center gap-2 rounded-full bg-yellow-400 px-8 text-base font-bold text-black shadow-lg transition-all hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl'
          >
            <span>Get Started</span>
            <ArrowRight className='h-5 w-5' />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
