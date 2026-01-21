export const getMembershipTier = (points: number) => {
  if (points >= 1000) {
    return {
      label: 'Platinum Member',
      colorClass:
        'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      textClass: 'text-purple-600 dark:text-purple-400',
    };
  } else if (points >= 300) {
    return {
      label: 'Gold Member',
      colorClass:
        'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      textClass: 'text-amber-600 dark:text-amber-400',
    };
  } else if (points >= 100) {
    return {
      label: 'Silver Member',
      colorClass:
        'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
      textClass: 'text-slate-600 dark:text-slate-400',
    };
  } else {
    return {
      label: 'Bronze Member',
      colorClass:
        'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      textClass: 'text-orange-600 dark:text-orange-400',
    };
  }
};
