export const OrderStatusBadge = ({ status }: { status: string }) => {
  let colorClass =
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  if (['COMPLETED', 'DELIVERED', 'PAID'].includes(status))
    colorClass =
      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
  if (['WAITING_PAYMENT'].includes(status))
    colorClass =
      'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
  if (['ON_DELIVERY', 'READY_FOR_DELIVERY'].includes(status))
    colorClass =
      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${colorClass}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
};
