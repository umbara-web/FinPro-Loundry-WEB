import { CheckCircle2 } from 'lucide-react';
import { ReactNode } from 'react';

interface PickupSummaryItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  isCompleted: boolean;
}

export function PickupSummaryItem({
  icon,
  title,
  subtitle,
  isCompleted,
}: PickupSummaryItemProps) {
  return (
    <div className='flex items-start gap-3'>
      <div className='mt-1 text-gray-400'>{icon}</div>
      <div>
        <p className='text-sm font-medium text-black dark:text-white'>
          {title}
        </p>
        <p className='max-w-50 truncate text-xs text-gray-500 dark:text-gray-400'>
          {subtitle}
        </p>
      </div>
      {isCompleted && (
        <CheckCircle2 className='ml-auto h-5 w-5 text-green-500' />
      )}
    </div>
  );
}
