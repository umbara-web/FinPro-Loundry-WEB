import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange?: (date: Date) => void;
  onEndDateChange?: (date: Date) => void;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export function DateRangeFilter({
  startDate,
  endDate,
}: DateRangeFilterProps) {
  return (
    <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center h-full">
      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
        Periode Waktu
      </label>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300">{formatDate(startDate)}</span>
        </div>
        <span className="text-slate-400">-</span>
        <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300">{formatDate(endDate)}</span>
        </div>
      </div>
    </div>
  );
}
