export interface AttendanceRecord {
  id: string;
  staffName: string;
  staffAvatar: string | null;
  staffRole: string;
  date: string;
  shiftName: string;
  clockIn: string;
  clockOut: string | null;
  duration: number;
  status: string;
  notes: string | null;
}

export const statusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  PRESENT: {
    label: 'Hadir',
    bg: 'bg-green-100 dark:bg-green-500/15',
    text: 'text-green-700 dark:text-green-400',
  },
  LATE: {
    label: 'Terlambat',
    bg: 'bg-orange-100 dark:bg-orange-500/15',
    text: 'text-orange-700 dark:text-orange-400',
  },
  ABSENT: {
    label: 'Tidak Hadir',
    bg: 'bg-red-100 dark:bg-red-500/15',
    text: 'text-red-700 dark:text-red-400',
  },
};

export type TimePreset =
  | 'TODAY'
  | 'YESTERDAY'
  | 'THIS_WEEK'
  | 'THIS_MONTH'
  | 'LAST_MONTH'
  | 'CUSTOM';

export const timePresetLabels: Record<TimePreset, string> = {
  TODAY: 'Hari Ini',
  YESTERDAY: 'Kemarin',
  THIS_WEEK: 'Minggu Ini',
  THIS_MONTH: 'Bulan Ini',
  LAST_MONTH: 'Bulan Lalu',
  CUSTOM: 'Sesuaikan',
};

export function getDateRangeFromPreset(
  preset: TimePreset
): { from: Date; to: Date } | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case 'TODAY': {
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      return { from: today, to: endOfToday };
    }

    case 'YESTERDAY': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);
      return { from: yesterday, to: endOfYesterday };
    }

    case 'THIS_WEEK': {
      const dayOfWeek = today.getDay();
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diffToMonday);
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      return { from: monday, to: endOfToday };
    }

    case 'THIS_MONTH': {
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      return { from: firstOfMonth, to: endOfToday };
    }

    case 'LAST_MONTH': {
      const firstOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );
      lastOfLastMonth.setHours(23, 59, 59, 999);
      return { from: firstOfLastMonth, to: lastOfLastMonth };
    }

    case 'CUSTOM':
      return null;
  }
}
