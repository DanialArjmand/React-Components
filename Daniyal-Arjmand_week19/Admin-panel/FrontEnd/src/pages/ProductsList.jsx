import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import AddModal from "../components/modals/AddModal";
import EditModal from "../components/modals/EditModal";
import DeleteModal from "../components/modals/DeleteModal";
import Pagination from "../components/Pagination";
import { ProductsTable } from "../components/ProductsComponents/ProductsTable";
import { ProductsHeader } from "../components/ProductsComponents/ProductsHeader";
import { ProductsActions } from "../components/ProductsComponents/ProductsActions";

import { useAuth } from "../context/AuthContext";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useProductMutations } from "../hooks/useProductMutations";
import { useSorting } from "../hooks/useSorting";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { usePagination } from "../hooks/usePagination";
import { useBulkActions } from "../hooks/useBulkActions";
import { PAGE_SIZE } from "../constants/pagination";
import styles from "./ProductsList.module.css";

function ProductsList() {
  const queryClient = useQueryClient();
  const { username, logout } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const { page, setPage } = usePagination(searchParams, setSearchParams);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  const { sortConfig, handleSort, sortWithMemo } = useSorting();
  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useProductsQuery({ page, limit: PAGE_SIZE, name: debouncedSearchTerm });

  const products = queryData?.data ?? [];
  const totalPages = queryData?.totalPages ?? 1;
  const sortedProducts = sortWithMemo(products);

  const {
    isBulkDeleteMode,
    setIsBulkDeleteMode,
    selectedIds,
    handleSelectProduct,
    areAllOnPageSelected,
    handleSelectAll,
    handleCancelBulkDelete,
    resetBulkActions,
  } = useBulkActions(sortedProducts);

  const [modalState, setModalState] = useState({ type: null, data: null });
  const [copiedId, setCopiedId] = useState(null);
  const openModal = (type, data = null) => setModalState({ type, data });
  const closeModal = () => setModalState({ type: null, data: null });

  const {
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,
    bulkDeleteMutation,
  } = useProductMutations({
    onAddSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
    onUpdateSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
    onDeleteSuccess: () => {
      if (products.length === 1 && page > 1) setPage(page - 1);
      else queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onBulkDeleteSuccess: () => {
      resetBulkActions();
      if (selectedIds.length === products.length && page > 1) setPage(page - 1);
      else queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const addProductHandler = (data) =>
    addProductMutation.mutate({
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });

  const updateProductHandler = (data) =>
    updateProductMutation.mutate({
      ...modalState.data,
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });

  const handleConfirmDeletion = () => {
    if (modalState.type === "DELETE")
      deleteProductMutation.mutate(modalState.data);
    else if (modalState.type === "BULK_DELETE")
      bulkDeleteMutation.mutate(selectedIds);
    closeModal();
  };

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("خطا در کپی کردن شناسه: ", err);
    }
  };

  const deleteModalTitle = useMemo(() => {
    if (modalState.type === "DELETE" && modalState.data) {
      return (
        <>
          آیا از حذف محصول{" "}
          <span className={styles.highlightedName}>
            «{modalState.data.name}»
          </span>{" "}
          مطمئن هستید؟
        </>
      );
    }
    if (modalState.type === "BULK_DELETE") {
      return (
        <>
          آیا از حذف{" "}
          <span className={styles.highlightedName}>«{selectedIds.length}»</span>{" "}
          محصول مطمئن هستید؟
        </>
      );
    }
    return "";
  }, [modalState, selectedIds.length]);

  useEffect(() => {
    const currentSearchInUrl = searchParams.get("search") || "";
    if (debouncedSearchTerm !== currentSearchInUrl) {
      setSearchParams(
        (prev) => {
          if (debouncedSearchTerm) {
            prev.set("search", debouncedSearchTerm);
            prev.set("page", "1");
          } else {
            prev.delete("search");
          }
          return prev;
        },
        { replace: true }
      );
    }
  }, [debouncedSearchTerm, searchParams, setSearchParams]);

  return (
    <div className={styles.form}>
      <ProductsHeader
        username={username}
        logout={logout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main>
        <ProductsActions
          isBulkDeleteMode={isBulkDeleteMode}
          setIsBulkDeleteMode={setIsBulkDeleteMode}
          handleCancelBulkDelete={handleCancelBulkDelete}
          openAddModal={() => openModal("ADD")}
          openBulkDeleteModal={() => openModal("BULK_DELETE")}
          selectedIds={selectedIds}
          isBulkDeleting={bulkDeleteMutation.isLoading}
        />

        <div dir="rtl" className={styles.tableProducts}>
          <table>
            <thead>
              <tr>
                {isBulkDeleteMode && (
                  <th className={styles.checkboxAll}>
                    <label className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={areAllOnPageSelected}
                        onChange={handleSelectAll}
                      />
                      <span className={styles.customCheckbox}></span>
                      <span className={styles.selectAllText}>انتخاب همه</span>
                    </label>
                  </th>
                )}
                <th className={styles.rowNumber}>ردیف</th>
                <th className={styles.nameProducts}>نام کالا</th>
                <th className={styles.quantity}>
                  <div className={styles.sortableHeader}>
                    موجودی
                    <div className={styles.sortIcons}>
                      <span
                        onClick={() => handleSort("quantity", "descending")}
                        className={`${styles.sortIcon} ${
                          sortConfig.key === "quantity" &&
                          sortConfig.direction === "descending"
                            ? styles.activeDesc
                            : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => handleSort("quantity", "ascending")}
                        className={`${styles.sortIcon} ${
                          sortConfig.key === "quantity" &&
                          sortConfig.direction === "ascending"
                            ? styles.activeAsc
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className={styles.price}>
                  <div className={styles.sortableHeader}>
                    قیمت
                    <div className={styles.sortIcons}>
                      <span
                        onClick={() => handleSort("price", "descending")}
                        className={`${styles.sortIcon} ${
                          sortConfig.key === "price" &&
                          sortConfig.direction === "descending"
                            ? styles.activeDesc
                            : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => handleSort("price", "ascending")}
                        className={`${styles.sortIcon} ${
                          sortConfig.key === "price" &&
                          sortConfig.direction === "ascending"
                            ? styles.activeAsc
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className={styles.idStyles}>شناسه کالا</th>
                <th className={styles.buttons}></th>
              </tr>
            </thead>
            <tbody>
              <ProductsTable
                isLoading={isLoading}
                isError={isError}
                error={error}
                products={sortedProducts}
                debouncedSearchTerm={debouncedSearchTerm}
                isBulkDeleteMode={isBulkDeleteMode}
                selectedIds={selectedIds}
                handleSelectProduct={handleSelectProduct}
                page={page}
                copiedId={copiedId}
                handleCopyId={handleCopyId}
                openEditModal={(product) => openModal("EDIT", product)}
                openDeleteModal={(product) => openModal("DELETE", product)}
              />
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </main>

      <AddModal
        isOpen={modalState.type === "ADD"}
        onClose={closeModal}
        onAddProduct={addProductHandler}
        isSubmitting={addProductMutation.isLoading}
      />
      <EditModal
        isOpen={modalState.type === "EDIT"}
        onClose={closeModal}
        product={modalState.data}
        onUpdateProduct={updateProductHandler}
        isSubmitting={updateProductMutation.isLoading}
      />
      <DeleteModal
        isOpen={
          modalState.type === "DELETE" || modalState.type === "BULK_DELETE"
        }
        onClose={closeModal}
        onConfirm={handleConfirmDeletion}
        title={deleteModalTitle}
        isSubmitting={
          deleteProductMutation.isLoading || bulkDeleteMutation.isLoading
        }
      />
    </div>
  );
}

export default ProductsList;
