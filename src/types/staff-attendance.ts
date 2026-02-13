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
