interface OrderTimelineProps {
  status: string;
  updatedAt: string;
  createdAt: string;
}

export function OrderTimeline({
  status,
  updatedAt,
  createdAt,
}: OrderTimelineProps) {
  return (
    <div className='dark:bg-surface-dark rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700'>
      <h3 className='mb-4 font-bold'>Status Timeline</h3>
      <div className='ml-2 flex flex-col gap-4 border-l-2 border-slate-200 pl-2 dark:border-slate-700'>
        {/* Simple Timeline render */}
        <div className='relative pl-6'>
          <div className='bg-primary dark:border-surface-dark absolute top-1 -left-2.25 h-4 w-4 rounded-full border-2 border-white'></div>
          <p className='text-sm font-bold'>{status}</p>
          <p className='text-xs text-slate-500'>
            {new Date(updatedAt).toLocaleString()}
          </p>
        </div>
        <div className='relative pl-6 opacity-50'>
          <div className='dark:border-surface-dark absolute top-1 -left-2.25 h-4 w-4 rounded-full border-2 border-white bg-slate-300 dark:bg-slate-600'></div>
          <p className='text-sm font-bold'>Created</p>
          <p className='text-xs text-slate-500'>
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
