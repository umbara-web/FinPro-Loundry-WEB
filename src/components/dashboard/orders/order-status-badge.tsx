export const OrderStatusBadge = ({ status }: { status: string }) => {
  let colorClass =
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';

  const s = status;

  if (['COMPLETED', 'DELIVERED', 'PAID'].includes(s))
    colorClass =
      'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20';

  if (['WAITING_PAYMENT'].includes(s))
    colorClass =
      'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20';

  if (['ON_DELIVERY', 'READY_FOR_DELIVERY'].includes(s))
    colorClass =
      'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20'; // Changed to purple to match "Dikirim" design

  if (['IN_WASHING', 'IN_IRONING', 'IN_PACKING', 'ongoing'].includes(s))
    colorClass =
      'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20';

  if (['CANCELLED'].includes(s))
    colorClass =
      'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20';

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${colorClass}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};
