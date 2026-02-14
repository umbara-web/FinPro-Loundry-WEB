import clsx from 'clsx';

interface AttendanceStatsCardProps {
  label: string;
  value: number;
  unit?: string;
  variant?: 'default' | 'success' | 'danger' | 'primary';
}

const variantStyles: Record<string, string> = {
  default: 'text-slate-500 dark:text-slate-400',
  success: 'text-green-600 dark:text-green-500',
  danger: 'text-red-500 dark:text-red-400',
  primary: 'text-[#137fec]',
};

export function AttendanceStatsCard({
  label,
  value,
  unit,
  variant = 'default',
}: AttendanceStatsCardProps) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#1e293b]'>
      <p
        className={clsx(
          'mb-1 text-xs font-bold tracking-wider uppercase',
          variantStyles[variant]
        )}
      >
        {label}
      </p>
      <p className='text-2xl font-bold text-slate-900 dark:text-white'>
        {value}
        {unit && (
          <span className='ml-1 text-sm font-normal text-slate-400'>
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}
