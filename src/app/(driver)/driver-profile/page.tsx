import { ProfileView } from '@/src/views/profile';

export default function DriverProfilePage() {
  return <ProfileView dashboardPath="/driver-dashboard" attendancePath="/driver-attendance" profilePath="/driver-profile" />;
}
