import clsx from 'clsx';
import { Truck, CheckCircle } from 'lucide-react';
import { DeliveryStep, StepConfig } from '../_types';

interface DeliveryProgressProps {
  currentStep: DeliveryStep;
}

const steps: StepConfig[] = [
  {
    key: 'IN_PROGRESS',
    label: 'Memuat Barang & Menuju Pelanggan',
    icon: <Truck className='h-4 w-4' />,
  },
  {
    key: 'DONE',
    label: 'Drop Off Selesai',
    icon: <CheckCircle className='h-4 w-4' />,
  },
];

export function DeliveryProgress({ currentStep }: DeliveryProgressProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.key === currentStep);
  };

  return (
    <div className='rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#182634]'>
      <h3 className='mb-6 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white'>
        <Truck className='h-5 w-5 text-blue-600 dark:text-blue-500' />
        Progres Pengantaran
      </h3>
      <div className='grid grid-cols-[40px_1fr] gap-x-2'>
        {steps.map((step, index) => {
          const currentIndex = getCurrentStepIndex();
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} className='contents'>
              <div className='flex flex-col items-center gap-1 pt-1'>
                <div
                  className={clsx(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    isActive &&
                      'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] dark:bg-blue-600 dark:shadow-[0_0_15px_rgba(10,127,245,0.4)]',
                    isCompleted && 'bg-green-500 text-white',
                    !isActive &&
                      !isCompleted &&
                      'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className='h-4 w-4' />
                  ) : (
                    step.icon
                  )}
                </div>
                {!isLast && (
                  <div
                    className={clsx(
                      'h-12 w-0.5',
                      isCompleted
                        ? 'bg-green-500'
                        : isActive
                          ? 'bg-blue-600 dark:bg-blue-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                    )}
                  />
                )}
              </div>
              <div className='flex flex-1 flex-col pb-8'>
                <p
                  className={clsx(
                    'text-base font-medium',
                    isActive
                      ? 'font-bold text-slate-900 dark:text-white'
                      : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {step.label}
                </p>
                <p
                  className={clsx(
                    'mt-1 text-sm',
                    isActive
                      ? 'font-medium text-blue-600 dark:text-blue-500'
                      : 'text-slate-400 dark:text-slate-500'
                  )}
                >
                  {isActive
                    ? 'Status Saat Ini'
                    : isCompleted
                      ? 'Selesai'
                      : 'Menunggu'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { steps };
