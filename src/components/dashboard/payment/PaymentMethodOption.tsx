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
    'group hover:border-blue-500 dark:hover:border-blue-500 flex cursor-pointer items-center gap-4 rounded-xl border p-4 shadow-sm transition-all';
  const selectedClasses = selected
    ? 'border-blue-500 bg-primary/5 dark:bg-primary/10'
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
      <div className='flex h-10 w-24 items-center justify-center rounded-lg bg-white'>
        <img src={icon} alt={title} className='h-10 w-20 object-contain' />
      </div>
      <div className='flex grow flex-col'>
        <p className='text-sm font-bold'>{title}</p>
        <p className='text-sm text-slate-500 dark:text-slate-400'>{subtitle}</p>
      </div>
    </label>
  );
}
