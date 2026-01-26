'use client';

import { ComplaintTab } from '@/src/components/dashboard/complaint/complaint-tab';

export default function ComplaintsPage() {
  return (
    <div className='container mx-auto flex h-[calc(100vh-6rem)] max-w-7xl flex-col px-6 py-8'>
      <div className='mb-6 flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Komplain</h1>
        <p className='text-muted-foreground'>
          Kelola dan ajukan komplain terkait pesanan Anda.
        </p>
      </div>

      <ComplaintTab />
    </div>
  );
}
