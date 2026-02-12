import { AttendanceHistoryView } from '@/src/views/attendance/history';

export default function WorkerAttendanceHistoryPage() {
  return (
    <AttendanceHistoryView
      basePath='/worker-attendance'
      dashboardPath='/worker-dashboard'
      profilePath='/worker-profile'
    />
  );
}
