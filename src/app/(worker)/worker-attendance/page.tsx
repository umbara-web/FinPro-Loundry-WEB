import { AttendanceView } from '@/src/views/attendance';

export default function WorkerAttendancePage() {
  return <AttendanceView basePath="/worker-attendance" backPath="/worker-dashboard" profilePath="/worker-profile" />;
}
