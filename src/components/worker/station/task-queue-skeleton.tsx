export function TaskQueueSkeleton() {
  return (
    <div className='space-y-3 p-4'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='animate-pulse rounded-xl bg-(--color-station-surface) p-4'
        >
          <div className='mb-3 flex justify-between'>
            <div className='h-6 w-24 rounded-full bg-slate-700' />
            <div className='h-4 w-16 rounded bg-slate-700' />
          </div>
          <div className='flex items-center gap-4'>
            <div className='h-12 w-12 rounded-full bg-slate-700' />
            <div className='space-y-2'>
              <div className='h-4 w-24 rounded bg-slate-700' />
              <div className='h-3 w-32 rounded bg-slate-700' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
