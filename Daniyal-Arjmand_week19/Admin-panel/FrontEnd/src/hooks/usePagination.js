export function usePagination(searchParams, setSearchParams) {
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;

  const setPage = (newPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

  const setLimit = (newLimit) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("limit", newLimit);
      params.set("page", 1);
      return params;
    });
  };

  return { page, limit, setPage, setLimit };
}
