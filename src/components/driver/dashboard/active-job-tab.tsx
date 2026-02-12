import { ActiveJob } from '@/src/types/driver';
import { ActiveJobCard } from '@/src/components/driver/dashboard/active-job-card';

interface ActiveJobTabProps {
  activeJob: ActiveJob | null;
}

export function ActiveJobTab({ activeJob }: ActiveJobTabProps) {
  return (
    <div>
      {activeJob ? (
        <ActiveJobCard activeJob={activeJob} />
      ) : (
        <div className='py-12 text-center text-[#8fadcc]'>
          Tidak ada tugas yang sedang berjalan.
        </div>
      )}
    </div>
  );
}
