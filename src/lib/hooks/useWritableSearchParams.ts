'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useWritableSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      replace(`${pathname}${params.size ? '?' : ''}${params.toString()}`);
    },
    [pathname, searchParams, replace],
  );

  return { searchParams, setParam };
};
