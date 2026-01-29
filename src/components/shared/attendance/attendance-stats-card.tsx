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
    <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <p
        className={clsx(
          'text-xs font-bold uppercase tracking-wider mb-1',
          variantStyles[variant]
        )}
      >
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
        {unit && (
          <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>
        )}
      </p>
    </div>
  );
}
