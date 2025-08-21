import { useMemo, useState } from "react";

export function useSorting(initial = { key: null, direction: null }) {
  const [sortConfig, setSortConfig] = useState(initial);

  const handleSort = (key, direction) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === direction) {
        return { key: null, direction: null };
      }
      return { key, direction };
    });
  };

  const getSorted = (items) => {
    if (!sortConfig.key || !sortConfig.direction) return items;
    return [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const sortWithMemo = (items) =>
    useMemo(() => getSorted(items), [items, sortConfig]);

  return { sortConfig, handleSort, sortWithMemo };
}
