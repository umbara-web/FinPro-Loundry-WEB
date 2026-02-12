'use client';

import { useAuth } from '@/src/context/AuthContext';
import { MobileBottomNav } from '@/src/components/shared/attendance';
import { LogOut, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileViewProps {
  dashboardPath?: string;
  attendancePath?: string;
  profilePath?: string;
}

export function ProfileView({
  dashboardPath = '/worker-dashboard',
  attendancePath = '/worker-attendance',
  profilePath = '/worker-profile'
}: ProfileViewProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="flex h-full flex-col bg-[#f6f7f8] dark:bg-[#101922] overflow-hidden">
      {/* Header */}
      <header className="flex-none border-b border-slate-200 dark:border-[#233648] bg-white dark:bg-[#101922] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(dashboardPath)}
            className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Profil Saya
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-lg space-y-6">
          {/* Profile Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-slate-100 dark:border-slate-700 bg-slate-200 dark:bg-slate-700">
                {user?.profile_picture_url ? (
                  <img
                    src={user.profile_picture_url}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-400">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {user?.name || 'User Name'}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {user?.role || 'WORKER'}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.email || 'email@example.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Outlet</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.outlet_id ? `Outlet #${user.outlet_id}` : 'Main Outlet'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600 active:scale-95"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        basePath={attendancePath}
        dashboardPath={dashboardPath}
        profilePath={profilePath}
      />
    </div>
  );
}
