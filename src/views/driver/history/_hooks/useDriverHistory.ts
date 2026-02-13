import { useState, useEffect } from 'react';
import { DriverJobHistory } from '@/src/types/driver';
import { driverService } from '@/src/services/driver';

export const useDriverHistory = () => {
  const [jobs, setJobs] = useState<DriverJobHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pickup' | 'delivery'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await driverService.getDriverHistory({ page, limit: 10 });
        if (data.data) {
          setJobs(data.data || []);
          setTotalPages(data.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'all') return true;
    return job.type === filter.toUpperCase();
  });

  return {
    jobs,
    loading,
    filter,
    setFilter,
    page,
    setPage,
    totalPages,
    filteredJobs,
  };
};
