import { WorkerJobHistory } from '../_types';
import { HistoryItem } from './HistoryItem';

interface HistoryListProps {
  jobs: WorkerJobHistory[];
  loading: boolean;
}

export const HistoryList = ({ jobs, loading }: HistoryListProps) => {
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
