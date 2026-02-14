import clsx from 'clsx';

export type AttendanceStatusVariant =
  | 'not_checked'
  | 'on_time'
  | 'late'
  | 'overtime'
  | 'checked_in';

interface AttendanceStatusBadgeProps {
  variant: AttendanceStatusVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<AttendanceStatusVariant, string> = {
  not_checked:
    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  on_time:
    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
  late: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  overtime: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  checked_in:
    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
};

const variantLabels: Record<AttendanceStatusVariant, string> = {
  not_checked: 'Belum Absen',
  on_time: 'Tepat Waktu',
  late: 'Terlambat',
  overtime: 'Lembur',
  checked_in: 'Sudah Absen',
};

export function AttendanceStatusBadge({
  variant,
  pulse = false,
  className,
}: AttendanceStatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase',
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span
          className={clsx('size-2 animate-pulse rounded-full', {
            'bg-amber-500': variant === 'not_checked',
            'bg-green-500': variant === 'on_time' || variant === 'checked_in',
            'bg-red-500': variant === 'late',
            'bg-blue-500': variant === 'overtime',
          })}
        />
      )}
      {variantLabels[variant]}
    </span>
  );
}
