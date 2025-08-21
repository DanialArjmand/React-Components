import { useState, useMemo } from "react";

export function useBulkActions(items = []) {
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const areAllOnPageSelected = useMemo(
    () => items.length > 0 && selectedIds.length === items.length,
    [items, selectedIds]
  );

  const handleSelectAll = () => {
    if (areAllOnPageSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((p) => p.id));
    }
  };

  const handleCancelBulkDelete = () => {
    setIsBulkDeleteMode(false);
    setSelectedIds([]);
  };

  const reset = () => {
    setIsBulkDeleteMode(false);
    setSelectedIds([]);
  };

  return {
    isBulkDeleteMode,
    setIsBulkDeleteMode,
    selectedIds,
    handleSelectProduct,
    areAllOnPageSelected,
    handleSelectAll,
    handleCancelBulkDelete,
    resetBulkActions: reset,
  };
}
