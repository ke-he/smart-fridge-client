'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useWritableSearchParams = <T>() => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setParam = useCallback(
    (key: keyof T, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key as string, value);
      } else {
        params.delete(key as string);
      }

      replace(`${pathname}${params.size ? '?' : ''}${params.toString()}`);
    },
    [pathname, searchParams, replace],
  );

  return { searchParams, setParam };
};
