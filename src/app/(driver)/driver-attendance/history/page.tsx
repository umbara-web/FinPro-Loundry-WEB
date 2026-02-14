import { AttendanceHistoryView } from '@/src/views/attendance/history';

export default function DriverAttendanceHistoryPage() {
  return <AttendanceHistoryView basePath='/driver-attendance' dashboardPath='/driver-dashboard' profilePath='/driver-profile' />;
}
