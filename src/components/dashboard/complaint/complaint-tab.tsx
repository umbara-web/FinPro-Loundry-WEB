'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { ComplaintHistoryTab } from './complaint-history-tab';
import { ComplaintSubmissionTab } from './complaint-submission-tab';

interface SubTab {
  id: string;
  label: string;
}

const subTabs: SubTab[] = [
  { id: 'submission', label: 'Pengajuan Komplain' },
  { id: 'history', label: 'Riwayat Komplain' },
];

export function ComplaintTab() {
  const [activeSubTab, setActiveSubTab] = useState('submission');

  return (
    <div className='flex h-full flex-col gap-6'>
      {/* Sub-tabs */}
      <div className='bg-background-light dark:bg-background-dark sticky top-0 z-40 border-b border-slate-300 pt-2 pb-0 dark:border-slate-700'>
        <div className='no-scrollbar flex gap-8 overflow-x-auto border-b border-slate-300 dark:border-slate-700'>
          {subTabs.map((subTab) => {
            const isActive = activeSubTab === subTab.id;
            return (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id)}
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
          'flex flex-1 flex-col gap-8 py-6 pr-4',
          activeSubTab === 'submission'
            ? 'overflow-y-auto'
            : 'h-full overflow-hidden'
        )}
      >
        {activeSubTab === 'submission' && <ComplaintSubmissionTab />}
        {activeSubTab === 'history' && <ComplaintHistoryTab />}
      </div>
    </div>
  );
}
