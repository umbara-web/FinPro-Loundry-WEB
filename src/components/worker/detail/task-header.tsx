import { StationTask, StationConfig } from '@/src/types/station';
import { ArrowLeft } from 'lucide-react';

interface TaskHeaderProps {
  task: StationTask;
  config: StationConfig;
  expectedTotal: number;
  onBack?: () => void;
}

export function TaskHeader({
  task,
  config,
  expectedTotal,
  onBack,
}: TaskHeaderProps) {
  return (
    <div className='p-4 lg:p-8 lg:pb-4'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          {/* Back Button (Mobile & Tablet Portrait) */}
          {onBack && (
            <button
              onClick={onBack}
              className='mb-4 flex items-center gap-2 text-sm font-medium text-(--color-station-text-muted) hover:text-white lg:hidden'
            >
              <ArrowLeft className='h-4 w-4' />
              Kembali ke Antrean
            </button>
          )}

          <div className='mb-2 flex flex-wrap items-center gap-3'>
            <h2 className='text-xl font-bold tracking-tight text-white md:text-3xl'>
              Proses Cucian #{task.invoiceNumber}
            </h2>
            <span
              className='rounded-md px-3 py-1 text-xs font-semibold md:text-sm'
              style={{
                backgroundColor: `${config.color}20`,
                color: config.color,
              }}
            >
              {task.serviceType} Wash
            </span>
          </div>
          <p className='text-sm text-(--color-station-text-muted) md:text-base'>
            Input detail item cucian untuk verifikasi sebelum proses.
          </p>
        </div>
        <div className='hidden text-right xl:block'>
          <p className='mb-1 text-sm text-(--color-station-text-muted)'>
            Total Item
          </p>
          <p className='font-mono text-2xl font-bold text-white'>
            {expectedTotal}{' '}
            <span className='text-base text-(--color-station-text-muted)'>
              pcs
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
