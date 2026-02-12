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
  PRESENT: { label: 'Hadir', bg: 'bg-green-500/15', text: 'text-green-400' },
  LATE: { label: 'Terlambat', bg: 'bg-orange-500/15', text: 'text-orange-400' },
  ABSENT: { label: 'Tidak Hadir', bg: 'bg-red-500/15', text: 'text-red-400' },
};
