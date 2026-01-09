'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel';
import { HERO_SLIDES } from '@/src/data/hero';
import { HeroSlide } from './hero-slide';

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className='relative mt-16 h-[calc(70vh-4rem)] min-h-150 w-full overflow-hidden dark:bg-black'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className='group h-full w-full'
      >
        <CarouselContent className='ml-0 h-full'>
          {HERO_SLIDES.map((slide) => (
            <CarouselItem key={slide.id} className='h-full pl-0'>
              <div className='h-full w-full'>
                <HeroSlide slide={slide} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='left-4 h-12 w-12 translate-y-20 border-none bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white/20 md:left-8 md:-translate-y-1/2 lg:left-44' />
        <CarouselNext className='right-4 h-12 w-12 translate-y-20 border-none bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white/20 md:right-8 md:-translate-y-1/2 lg:right-44' />

        {/* Dots Pagination */}
        <div className='absolute right-0 bottom-8 left-0 z-20 flex justify-center gap-2'>
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-yellow-400'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
