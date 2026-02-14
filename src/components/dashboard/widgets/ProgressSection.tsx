'use client';

interface ProgressSectionProps {
  config: {
    progress: number;
    step: number;
  };
}

const STEPS = [
  { label: 'Penjemputan', position: 25 },
  { label: 'Proses', position: 50 },
  { label: 'Pengantaran', position: 75 },
  { label: 'Selesai', position: 100 },
];

export function ProgressSection({ config }: ProgressSectionProps) {
  // Bar width matches the step position: step1=25%, step2=50%, step3=75%, step4=100%
  const barWidth = config.step > 0 ? config.step * 25 : 0;

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex justify-between text-sm text-slate-600 dark:text-[#92adc9]'>
        <span>Status Pesanan ({barWidth}%)</span>
        <span className='font-medium text-slate-900 dark:text-white'>
          Langkah {config.step} dari 4
        </span>
      </div>

      {/* Progress bar + dots in one relative container */}
      <div className='relative'>
        {/* Track */}
        <div className='h-2.5 w-full rounded-full bg-slate-100 dark:bg-[#111a22]'>
          <div
            className='h-2.5 rounded-full bg-green-500/70 transition-all duration-300'
            style={{ width: `${barWidth}%` }}
          />
        </div>

        {/* Step dots positioned at 25%, 50%, 75%, 100% */}
        <div className='mt-2'>
          {STEPS.map((s, i) => {
            const stepNum = i + 1;
            const isActive = config.step >= stepNum;
            const isCurrent = config.step === stepNum;

            const dotClass = isCurrent
              ? 'size-3 bg-green-500 ring-4 ring-green-500/20'
              : isActive
                ? 'size-2 bg-blue-500'
                : 'size-2 bg-slate-400 dark:bg-slate-600';

            return (
              <div
                key={s.label}
                className='absolute flex flex-col items-center'
                style={{
                  left: `${s.position}%`,
                  transform: 'translateX(-50%)',
                  top: '16px',
                }}
              >
                <div className={`rounded-full ${dotClass}`} />
                <span
                  className={`mt-1 text-[10px] whitespace-nowrap ${
                    isActive
                      ? 'text-primary font-bold dark:text-white'
                      : 'text-slate-500/30 dark:text-slate-400/30'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Spacer for the dots area */}
        <div className='h-10' />
      </div>
    </div>
  );
}
