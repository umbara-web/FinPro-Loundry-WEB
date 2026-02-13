'use client';

import { use } from 'react';
import { WorkerTaskDetailView } from '@/src/views/Worker/History/Detail';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <WorkerTaskDetailView taskId={id} />;
}
