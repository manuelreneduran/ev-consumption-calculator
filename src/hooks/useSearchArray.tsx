import { useMemo } from "react";

import Fuse from "fuse.js";

export function useSearchArray<T>(
  list: readonly T[],
  {
    searchQuery,
    searchBy,
  }: {
    searchQuery: string;
    searchBy: string[];
  }
): readonly T[] {
  const fuse = useMemo(
    () =>
      new Fuse(list, {
        keys: searchBy,
        threshold: 0.2,
      }),
    [list, searchBy]
  );
  return !searchQuery
    ? list
    : fuse.search(searchQuery).map((result) => result.item);
}
