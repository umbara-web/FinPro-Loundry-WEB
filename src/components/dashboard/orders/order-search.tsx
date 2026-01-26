'use client';

import { Input } from '@/src/components/ui/input';
import { Search } from 'lucide-react';
import { useOrderSearch } from '@/src/hooks/use-order-search';

export function OrderSearch() {
  const { text, setText } = useOrderSearch();

  return (
    <div className='relative w-full max-w-md'>
      <Search className='absolute top-2.5 left-3 h-4 w-4 text-slate-500' />
      <Input
        placeholder='Cari ID Pesanan...'
        onChange={(e) => setText(e.target.value)}
        value={text}
        className='border-slate-700 bg-slate-800 pl-9 text-white placeholder:text-slate-400 focus-visible:ring-blue-600'
      />
    </div>
  );
}
