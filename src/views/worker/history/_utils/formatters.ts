export const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getTaskTypeLabel = (type: string) => {
  switch (type) {
    case 'WASHING':
      return 'Cuci';
    case 'IRONING':
      return 'Setrika';
    case 'PACKING':
      return 'Packing';
    default:
      return type;
  }
};

export const getTaskTypeColor = (type: string) => {
  switch (type) {
    case 'WASHING':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    case 'IRONING':
      return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
    case 'PACKING':
      return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
    default:
      return 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400';
  }
};
