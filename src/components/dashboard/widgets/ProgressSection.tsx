'use client';

interface ProgressSectionProps {
  config: {
    progress: number;
    step: number;
  };
}

export function ProgressSection({ config }: ProgressSectionProps) {
  return (
    <div className='flex flex-col gap-3'>
      <ProgressHeader progress={config.progress} step={config.step} />
      <ProgressBar progress={config.progress} />
      <ProgressSteps step={config.step} />
    </div>
  );
}

function ProgressHeader({
  progress,
  step,
}: {
  progress: number;
  step: number;
}) {
  return (
    <div className='flex justify-between text-sm text-slate-600 dark:text-[#92adc9]'>
      <span>Proses Pencucian ({progress}%)</span>
      <span className='font-medium text-slate-900 dark:text-white'>
        Langkah {step} dari 4
      </span>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className='h-2.5 w-full rounded-full bg-slate-100 dark:bg-[#111a22]'>
      <div
        className='bg-primary h-2.5 rounded-full'
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

function ProgressSteps({ step }: { step: number }) {
  const steps = [
    { label: 'Dijemput', minStep: 1 },
    { label: 'Dicuci', minStep: 2 },
    { label: 'Setrika', minStep: 3 },
    { label: 'Diantar', minStep: 4 },
  ];

  return (
    <div className='mt-1 flex justify-between'>
      {steps.map((s) => (
        <StepIndicator
          key={s.label}
          label={s.label}
          isActive={step >= s.minStep}
          isCurrent={step === s.minStep}
        />
      ))}
    </div>
  );
}

function StepIndicator({
  label,
  isActive,
  isCurrent,
}: {
  label: string;
  isActive: boolean;
  isCurrent: boolean;
}) {
  const dotClass = isCurrent
    ? 'size-3 bg-blue-500 ring-4 ring-blue-500/20'
    : isActive
      ? 'size-2 bg-blue-500'
      : 'size-2 bg-slate-400 dark:bg-slate-600';

  return (
    <div
      className={`flex flex-col items-center gap-1 ${isActive ? '' : 'opacity-30'}`}
    >
      <div className={`rounded-full ${dotClass}`}></div>
      <span
        className={`text-[10px] ${isActive ? 'text-primary font-bold dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
      >
        {label}
      </span>
    </div>
  );
}
