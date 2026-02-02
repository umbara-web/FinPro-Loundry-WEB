'use client';

import {
  WelcomeSection,
  StatsOverview,
  ActiveOrders,
  AddressWidget,
  ActivityWidget,
} from '@/src/components/dashboard/widgets';

export default function DashboardPage() {
  return (
    <main className='dark:bg-background-dark bg-background-light flex-1 overflow-y-auto p-4 md:p-8 lg:px-12'>
      <div className='mx-auto flex max-w-300 flex-col gap-8'>
        <WelcomeSection />
        <StatsOverview />
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-3'>
          <ActiveOrders />
          <div className='flex flex-col gap-6'>
            <AddressWidget />
            <ActivityWidget />
          </div>
        </div>
        <div className='h-8'></div>
      </div>
    </main>
  );
}
