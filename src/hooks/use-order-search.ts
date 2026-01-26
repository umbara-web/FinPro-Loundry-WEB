import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/src/hooks/use-debounce';
import { normalizeSearchTerm } from '@/src/lib/utils/search';
import { useEffect, useState } from 'react';

export function useOrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [text, setText] = useState(searchParams.get('search') || '');
  const debouncedText = useDebounce(text, 500);
  const normalizedDebouncedText = normalizeSearchTerm(debouncedText);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (normalizedDebouncedText === currentSearch) return;

    const params = new URLSearchParams(searchParams);
    if (normalizedDebouncedText) params.set('search', normalizedDebouncedText);
    else params.delete('search');

    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, [normalizedDebouncedText, pathname, router, searchParams]);

  return { text, setText };
}
