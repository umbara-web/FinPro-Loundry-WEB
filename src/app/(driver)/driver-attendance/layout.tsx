'use client';

import ProtectedRoute from '@/src/components/auth/protected-route';

export default function DriverAttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={['DRIVER']}>
      {children}
    </ProtectedRoute>
  );
}
