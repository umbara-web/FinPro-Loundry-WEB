'use client';

import { Button } from '@/src/components/ui/button';
import { useWallet } from '@/src/context/WalletContext';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useDebounce } from '@/src/hooks/use-debounce';
import { NotificationItem } from '@/src/components/dashboard/notifications/item';
import { NotificationFilters } from '@/src/components/dashboard/notifications/filters';

export default function NotificationsPage() {
  const { notifications, deleteNotification, clearNotifications } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter and Sort Logic
  const filteredNotifications = notifications
    .filter((notification) => {
      // Search Filter
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch =
        notification.title.toLowerCase().includes(searchLower) ||
        notification.message.toLowerCase().includes(searchLower);

      // Date Filter
      let matchesDate = true;
      if (dateRange?.from) {
        const notifDate = new Date(notification.time);
        const from = new Date(dateRange.from);
        from.setHours(0, 0, 0, 0); // Start of day

        matchesDate = notifDate >= from;

        if (dateRange.to) {
          const to = new Date(dateRange.to);
          to.setHours(23, 59, 59, 999); // End of day
          matchesDate = matchesDate && notifDate <= to;
        }
      }

      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.time).getTime();
      const dateB = new Date(b.time).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className='container mx-auto mt-10 flex max-w-7xl flex-col gap-6 lg:gap-8'>
      {/* Header Section */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-black tracking-tight text-slate-900 dark:text-white'>
            Notifikasi
          </h1>
          <p className='mt-2 text-slate-500 dark:text-[#92adc9]'>
            Lihat semua aktivitas dan pemberitahuan di akun Anda.
          </p>
        </div>
        {notifications.length > 0 && (
          <Button
            variant='outline'
            onClick={clearNotifications}
            className='w-auto cursor-pointer self-start text-red-600 hover:bg-red-50 hover:text-red-700 sm:self-center dark:text-red-400 dark:hover:bg-red-900/20'
          >
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      <NotificationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        sortOrder={sortOrder}
        onSortChange={() =>
          setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
        }
      />

      {/* Notifications List */}
      <div className='flex flex-col gap-4'>
        {filteredNotifications.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <div className='mb-4 rounded-full bg-slate-100 p-6 dark:bg-[#1a2632]'>
              <Bell className='h-12 w-12 text-slate-300 dark:text-slate-600' />
            </div>
            <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
              Tidak ada notifikasi
            </h3>
            <p className='text-slate-500 dark:text-[#92adc9]'>
              {searchTerm || dateRange
                ? 'Coba ubah filter pencarian Anda.'
                : 'Belum ada aktivitas terbaru di akun Anda.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onDelete={deleteNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}
