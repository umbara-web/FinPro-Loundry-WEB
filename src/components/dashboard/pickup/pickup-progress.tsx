interface PickupProgressProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  progress: number;
}

export function PickupProgress({
  currentStep,
  totalSteps,
  stepName,
  progress,
}: PickupProgressProps) {
  return (
    <div className='rounded-xl border border-slate-300 bg-slate-200 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800'>
      <div className='mb-2 flex items-center justify-between'>
        <span className='text-sm font-medium text-black dark:text-white'>
          Langkah {currentStep} dari {totalSteps}: {stepName}
        </span>
        <span className='text-primary text-sm font-bold'>
          {Math.round(progress)}%
        </span>
      </div>
      <div className='h-2.5 w-full rounded-full bg-slate-500 dark:bg-slate-300'>
        <div
          className='h-2.5 rounded-full bg-blue-500 transition-all duration-500 ease-out'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
