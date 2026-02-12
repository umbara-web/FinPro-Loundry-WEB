import { ProfileView } from '@/src/views/profile';

export default function WorkerProfilePage() {
  return <ProfileView dashboardPath="/worker-dashboard" attendancePath="/worker-attendance" profilePath="/worker-profile" />;
}
