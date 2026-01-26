import { WashingMachine } from 'lucide-react';
import { ColourfulText } from '@/src/components/ui/colourful-text';

export function AuthLogo() {
  return (
    <div className='flex items-center gap-1'>
      <div className='text-primary dark:text-background-light flex size-10 items-center justify-center rounded-xl bg-transparent'>
        <WashingMachine className='h-6 w-6' />
      </div>
      <h2 className='text-primary text-xl font-bold tracking-tight dark:text-white'>
        <ColourfulText text='FreshLaundry' />
      </h2>
    </div>
  );
}
