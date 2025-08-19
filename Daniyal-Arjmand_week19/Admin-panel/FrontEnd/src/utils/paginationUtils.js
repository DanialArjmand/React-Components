export const generatePageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, "...", totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, totalPages];
};
