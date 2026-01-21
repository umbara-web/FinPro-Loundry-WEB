import type { ElementType } from 'react';
import { WashingMachine, type LucideIcon } from 'lucide-react';
import ColourfulText from '@/src/components/ui/colourful-text';

type LogoProps = {
  text?: string;
  Icon?: LucideIcon;
  className?: string;
  heading?: ElementType;
};

export default function Logo({
  text = 'FreshLaundry',
  Icon = WashingMachine,
  className = '',
  heading: Heading = 'h2',
}: LogoProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className='text-primary dark:text-background-light flex size-10 items-center justify-center rounded-xl bg-transparent'>
        <Icon className='h-6 w-6' />
      </div>

      <Heading className='text-primary text-xl font-bold tracking-tight dark:text-white'>
        <ColourfulText text={text} />
      </Heading>
    </div>
  );
}
