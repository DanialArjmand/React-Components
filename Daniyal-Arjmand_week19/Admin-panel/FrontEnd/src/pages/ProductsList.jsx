import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import AddModal from "../components/modals/AddModal";
import EditModal from "../components/modals/EditModal";
import DeleteModal from "../components/modals/DeleteModal";
import Pagination from "../components/Pagination";

import { useAuth } from "../context/AuthContext";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useProductMutations } from "../hooks/useProductMutations";
import { useSorting } from "../hooks/useSorting";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { usePagination } from "../hooks/usePagination";

import { PAGE_SIZE } from "../constants/pagination";

import { CiLogout } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import styles from "./ProductsList.module.css";
import searchIcon from "../assets/search-normal.svg";
import profile from "../assets/Felix-Vogel-4.svg";
import settingIcon from "../assets/setting-3.svg";
import deleteIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";

const formatPrice = (price) => {
  const num = Number(String(price).replace(/,/g, ""));
  if (isNaN(num)) return price;
  if (num >= 1000000000)
    return `${new Intl.NumberFormat("fa-IR").format(
      num / 1000000000
    )} میلیارد تومان`;
  if (num >= 1000000)
    return `${new Intl.NumberFormat("fa-IR").format(
      num / 1000000
    )} میلیون تومان`;
  return `${new Intl.NumberFormat("fa-IR").format(num)} تومان`;
};

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
  } = useProductsQuery({
    page,
    limit: PAGE_SIZE,
    name: debouncedSearchTerm,
  });

  const products = queryData?.data ?? [];
  const totalPages = queryData?.totalPages ?? 1;
  const sortedProducts = sortWithMemo(products);

  const [modalState, setModalState] = useState({ type: null, data: null });
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
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
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
    onBulkDeleteSuccess: () => {
      handleCancelBulkDelete();
      if (selectedIds.length === products.length && page > 1) {
        setPage(page - 1);
      } else {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
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
    if (modalState.type === "DELETE") {
      deleteProductMutation.mutate(modalState.data);
    } else if (modalState.type === "BULK_DELETE") {
      bulkDeleteMutation.mutate(selectedIds);
    }
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

  const handleSelectProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const areAllOnPageSelected =
    sortedProducts.length > 0 && selectedIds.length === sortedProducts.length;

  const handleSelectAll = () => {
    if (areAllOnPageSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedProducts.map((p) => p.id));
    }
  };

  const handleCancelBulkDelete = () => {
    setIsBulkDeleteMode(false);
    setSelectedIds([]);
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
      <header className={styles.header}>
        <div className={styles.adminStyles}>
          <button onClick={logout} title="خروج از حساب کاربری">
            <CiLogout className={styles.iconLogout} />
          </button>
          <p>
            {username}
            <span>مدیر</span>
          </p>
          <img src={profile} alt="profile" />
        </div>
        <div className={styles.searchProduct}>
          <input
            type="text"
            placeholder="جستجو کالا"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={searchIcon} alt="searchIcon" />
        </div>
      </header>

      <main>
        <div className={styles.headTitle}>
          <div className={styles.buttonContainer}>
            {!isBulkDeleteMode ? (
              <>
                <button
                  className={styles.addButton}
                  onClick={() => openModal("ADD")}
                >
                  افزودن محصول
                </button>
                <button
                  className={styles.deleteGroup}
                  onClick={() => setIsBulkDeleteMode(true)}
                >
                  حذف گروهی
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.cancelButton}
                  onClick={handleCancelBulkDelete}
                >
                  لغو
                </button>
                <button
                  className={styles.deleteConfirm}
                  onClick={() => openModal("BULK_DELETE")}
                  disabled={
                    selectedIds.length === 0 || bulkDeleteMutation.isLoading
                  }
                >
                  {bulkDeleteMutation.isLoading
                    ? "در حال حذف..."
                    : `حذف (${selectedIds.length})`}
                </button>
              </>
            )}
          </div>
          <div className={styles.title}>
            <h2>مدیریت کالا</h2>
            <img src={settingIcon} alt="settingIcon" />
          </div>
        </div>

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
              {isLoading ? (
                <tr>
                  <td
                    colSpan={isBulkDeleteMode ? 7 : 6}
                    style={{ textAlign: "center" }}
                  >
                    درحال بارگذاری...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={isBulkDeleteMode ? 7 : 6}
                    style={{ textAlign: "center" }}
                  >
                    {error.response?.data?.message ===
                    "Page 1 is out of bounds. There are only 0 pages."
                      ? "محصولی یافت نشد"
                      : error.message || "خطا در دریافت اطلاعات"}
                  </td>
                </tr>
              ) : sortedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={isBulkDeleteMode ? 7 : 6}
                    className={styles.noProductsText}
                  >
                    {debouncedSearchTerm
                      ? "محصولی یافت نشد"
                      : "هیچ محصولی ثبت نشده"}
                  </td>
                </tr>
              ) : (
                sortedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={
                      selectedIds.includes(product.id) ? styles.selectedRow : ""
                    }
                  >
                    {isBulkDeleteMode && (
                      <td>
                        <label className={styles.checkboxContainer}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                          />
                          <span className={styles.customCheckbox}></span>
                        </label>
                      </td>
                    )}
                    <td className={styles.rowNumber}>
                      {(page - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td>{product.name}</td>
                    <td className={styles.quantity}>{product.quantity}</td>
                    <td className={styles.price}>
                      {formatPrice(product.price)}
                    </td>
                    <td className={styles.idStyles} title={product.id}>
                      {product.id.slice(0, 8)}
                    </td>
                    <td className={styles.buttons}>
                      <div className={styles.action}>
                        <button
                          title="کپی کامل شناسه کالا"
                          onClick={() => handleCopyId(product.id)}
                        >
                          {copiedId === product.id ? (
                            <span className={styles.copiedText}>کپی شد</span>
                          ) : (
                            <IoCopyOutline className={styles.copyIcon} />
                          )}
                        </button>
                        <button
                          title="ویرایش"
                          onClick={() => openModal("EDIT", product)}
                        >
                          <img src={editIcon} alt="editIcon" />
                        </button>
                        <button
                          title="حذف"
                          onClick={() => openModal("DELETE", product)}
                        >
                          <img src={deleteIcon} alt="deleteIcon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
