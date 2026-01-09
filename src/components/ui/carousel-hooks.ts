import * as React from 'react';
import type { CarouselApi, CarouselContextProps } from './carousel-types';

export const CarouselContext = React.createContext<CarouselContextProps | null>(
  null
);

export function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

export function useCarouselCallbacks(api: CarouselApi) {
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const onSelect = React.useCallback((api: CarouselApi) => {
    return {
      canScrollPrev: api?.canScrollPrev() || false,
      canScrollNext: api?.canScrollNext() || false,
    };
  }, []);

  return { scrollPrev, scrollNext, onSelect };
}

export function useKeyboardNavigation(
  scrollPrev: () => void,
  scrollNext: () => void
) {
  return React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
}
