import { useState, useEffect } from "react";

export function useDebouncedSearch(
  initialValue = "",
  setSearchParams,
  delay = 500
) {
  const [search, setSearch] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          params.set("search", search);
          return params;
        });
      } else {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          params.delete("search");
          return params;
        });
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [search, setSearchParams, delay]);

  return { search, setSearch };
}
