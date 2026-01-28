'use client';

import ProtectedRoute from '@/src/components/auth/protected-route';
import { StationHeader } from '@/src/components/worker/station';
import { useAuth } from '@/src/context/AuthContext';
import { StationType } from '@/src/types/station';

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // Get station type from user data or default to WASHING
  // This can be extended to read from user.station when backend provides it
  const stationType: StationType = 'WASHING';

  return (
    <ProtectedRoute roles={['WORKER']}>
      <div className="flex h-screen flex-col overflow-hidden bg-[--color-station-bg] font-sans text-white">
        <StationHeader stationType={stationType} />
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
