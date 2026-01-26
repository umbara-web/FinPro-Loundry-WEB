'use client';

interface PaymentMethodOptionProps {
  value: string;
  selected: boolean;
  onSelect: () => void;
  icon: string;
  iconColor?: string;
  title: string;
  subtitle: string;
}

export function PaymentMethodOption({
  value,
  selected,
  onSelect,
  icon,
  iconColor = 'text-primary',
  title,
  subtitle,
}: PaymentMethodOptionProps) {
  const baseClasses =
    'group hover:border-primary/50 flex cursor-pointer items-center gap-4 rounded-xl border p-4 shadow-sm transition-all';
  const selectedClasses = selected
    ? 'border-primary bg-primary/5 dark:bg-primary/10'
    : 'dark:bg-surface-dark border-slate-200 bg-white dark:border-slate-700';

  return (
    <label className={`${baseClasses} ${selectedClasses}`}>
      <input
        type='radio'
        name='payment_method'
        value={value}
        className='text-primary focus:ring-primary h-5 w-5 border-slate-300'
        checked={selected}
        onChange={onSelect}
      />
      <div className='flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-black/20'>
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
      </div>
      <div className='flex grow flex-col'>
        <p className='text-sm font-bold'>{title}</p>
        <p className='text-sm text-slate-500 dark:text-slate-400'>{subtitle}</p>
      </div>
    </label>
  );
}
