import { DriverJobHistory } from '@/src/types/driver';
import { HistoryItem } from './HistoryItem';

interface HistoryListProps {
  loading: boolean;
  jobs: DriverJobHistory[];
}

export const HistoryList = ({ loading, jobs }: HistoryListProps) => {
  return (
    <div className='flex flex-col gap-4'>
      {loading ? (
        <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
          Memuat...
        </div>
      ) : jobs.length === 0 ? (
        <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
          Tidak ada riwayat pekerjaan.
        </div>
      ) : (
        jobs.map((job) => <HistoryItem key={job.id} job={job} />)
      )}
    </div>
  );
};
