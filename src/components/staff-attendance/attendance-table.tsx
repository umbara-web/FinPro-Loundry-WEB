import { format } from 'date-fns';
import { RefreshCw, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils/utils';
import type { AttendanceRecord } from '@/src/types/staff-attendance';
import { statusConfig } from '@/src/types/staff-attendance';

const columns = [
  { label: 'Staff', hideClass: '' },
  { label: 'Role', hideClass: '' },
  { label: 'Tanggal', hideClass: '' },
  { label: 'Shift', hideClass: 'hidden sm:table-cell' },
  { label: 'Masuk', hideClass: '' },
  { label: 'Pulang', hideClass: 'hidden sm:table-cell' },
  { label: 'Durasi', hideClass: 'hidden md:table-cell' },
  { label: 'Status', hideClass: '' },
];

interface AttendanceTableProps {
  records: AttendanceRecord[];
  isLoading: boolean;
}

export function AttendanceTable({ records, isLoading }: AttendanceTableProps) {
  return (
    <div className='overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#182634]'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-[#101922]/50'>
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400',
                    col.hideClass
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className='p-12 text-center text-slate-500 dark:text-slate-400'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <RefreshCw className='h-6 w-6 animate-spin text-blue-600 dark:text-[#0a7ff5]' />
                    <span>Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className='p-12 text-center text-slate-500 dark:text-slate-400'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <Users className='h-8 w-8 text-slate-300 dark:text-slate-600' />
                    <span>Tidak ada data kehadiran untuk periode ini</span>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((record) => {
                const status =
                  statusConfig[record.status] || statusConfig.PRESENT;
                return (
                  <tr
                    key={record.id}
                    className='transition-colors hover:bg-slate-50 dark:hover:bg-[#1e3044]'
                  >
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full'>
                          {record.staffAvatar ? (
                            <img
                              src={record.staffAvatar}
                              alt={record.staffName}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center bg-blue-100 text-xs font-bold text-blue-600 dark:bg-[#0a7ff5]/20 dark:text-[#0a7ff5]'>
                              {record.staffName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className='font-medium text-slate-900 dark:text-white'>
                          {record.staffName}
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold',
                          record.staffRole === 'WORKER'
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                            : 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                        )}
                      >
                        {record.staffRole}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-slate-500 dark:text-slate-400'>
                      {format(new Date(record.date), 'dd MMM yyyy')}
                    </td>
                    <td className='hidden px-4 py-3 text-slate-500 sm:table-cell dark:text-slate-400'>
                      {record.shiftName}
                    </td>
                    <td className='px-4 py-3 font-medium text-green-600 dark:text-green-400'>
                      {format(new Date(record.clockIn), 'HH:mm')}
                    </td>
                    <td className='hidden px-4 py-3 font-medium text-red-600 sm:table-cell dark:text-red-400'>
                      {record.clockOut
                        ? format(new Date(record.clockOut), 'HH:mm')
                        : '–'}
                    </td>
                    <td className='hidden px-4 py-3 text-slate-500 md:table-cell dark:text-slate-400'>
                      {record.duration > 0 ? `${record.duration}h` : '–'}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold',
                          status.bg,
                          status.text
                        )}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
