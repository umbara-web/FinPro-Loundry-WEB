'use client';

import ProtectedRoute from '@/src/components/auth/protected-route';

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute roles={['WORKER']}>{children}</ProtectedRoute>;
}
