import { useState, useMemo } from "react";

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { currentItems, firstItemIndex } = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const items = data.slice(firstItemIndex, lastItemIndex);
    return { currentItems: items, firstItemIndex };
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const generatePagination = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, "..."];
    }
    if (currentPage >= totalPages - 1) {
      return ["...", totalPages - 1, totalPages];
    }
    return [1, "...", currentPage];
  };

  const pageNumbersToDisplay = generatePagination();

  return {
    currentPage,
    currentItems,
    totalPages,
    pageNumbersToDisplay,
    setCurrentPage,
    nextPageHandler,
    prevPageHandler,
    firstItemIndex,
  };
};
