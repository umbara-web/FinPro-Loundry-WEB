'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { OrderSubmissionTab } from './order-submission-tab';
import { OrderHistoryTab } from './order-history-tab';
import { Suspense } from 'react';

interface SubTab {
  id: string;
  label: string;
}

const subTabs: SubTab[] = [
  { id: 'submission', label: 'Buat Pesanan' },
  { id: 'history', label: 'Riwayat Pesanan' },
];

function OrderTabsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentTab = searchParams.get('tab') || 'submission'; // Default to submission

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabId);
    // Reset pagination when switching tabs if needed, but for now just switch tab
    if (tabId === 'submission') {
      // cleanup history params if switching to submission?
      // simple replacement for now
      router.push(`${pathname}?tab=${tabId}`);
    } else {
      router.push(`${pathname}?tab=${tabId}`);
    }
  };

  return (
    <div className='flex h-full flex-col gap-6'>
      <div className='flex items-center gap-3 border-l-4 border-blue-500 pl-4'>
        <h2 className='text-xl font-bold text-slate-900 dark:text-white'>
          Pesanan
        </h2>
      </div>

      {/* Sub-tabs */}
      <div className='bg-background-light dark:bg-background-dark sticky top-0 z-40 border-b border-slate-300 pt-2 pb-0 dark:border-slate-700'>
        <div className='no-scrollbar flex gap-8 overflow-x-auto border-b border-slate-300 dark:border-slate-700'>
          {subTabs.map((subTab) => {
            const isActive = currentTab === subTab.id;
            return (
              <button
                key={subTab.id}
                onClick={() => handleTabChange(subTab.id)}
                className={clsx(
                  'flex cursor-pointer items-center gap-2 border-b-2 px-1 pb-3 whitespace-nowrap',
                  isActive
                    ? 'border-blue-600'
                    : 'border-transparent hover:border-blue-600'
                )}
              >
                <p
                  className={clsx(
                    'text-sm font-bold',
                    isActive
                      ? 'text-blue-600'
                      : 'text-black group-hover:text-blue-600 dark:text-white'
                  )}
                >
                  {subTab.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab content */}
      <div
        className={clsx(
          'flex flex-1 flex-col gap-8 pb-20',
          currentTab === 'submission'
            ? 'no-scrollbar overflow-y-auto'
            : 'overflow-hidden'
        )}
      >
        {currentTab === 'submission' && <OrderSubmissionTab />}
        {currentTab === 'history' && <OrderHistoryTab />}
      </div>
    </div>
  );
}

export function OrderTabs() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderTabsContent />
    </Suspense>
  );
}
