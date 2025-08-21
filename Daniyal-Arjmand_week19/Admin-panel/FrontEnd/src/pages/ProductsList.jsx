import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiConfig";

import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

import { CiLogout } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import styles from "./ProductsList.module.css";
import searchIcon from "../assets/search-normal.svg";
import profile from "../assets/Felix-Vogel-4.svg";
import settingIcon from "../assets/setting-3.svg";
import deleteIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, limit, name }] = queryKey;
  const params = { page, limit, name: name || undefined };
  const { data } = await apiClient.get("/products", { params });
  return data;
};

function ProductsList() {
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const params = {};
    if (page > 1) params.page = page;
    if (debouncedSearchTerm) params.search = debouncedSearchTerm;
    setSearchParams(params, { replace: true });
  }, [page, debouncedSearchTerm, setSearchParams]);

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { page, limit: 7, name: debouncedSearchTerm }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  const products = queryData?.data ?? [];
  const totalPages = queryData?.totalPages ?? 1;

  const sortedProducts = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return products;

    return [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [products, sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === direction) {
        return { key: null, direction: null };
      }
      return { key, direction };
    });
  };

  const handleEnterBulkDeleteMode = () => {
    setIsBulkDeleteMode(true);
  };

  const handleCancelBulkDelete = () => {
    setIsBulkDeleteMode(false);
    setSelectedIds([]);
  };

  const handleSelectProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
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

  const areAllOnPageSelected =
    products.length > 0 && selectedIds.length === products.length;

  const handleSelectAll = () => {
    if (areAllOnPageSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    queryClient.clear();
    navigate("/");
  };

  const addProductMutation = useMutation({
    mutationFn: (newProduct) => apiClient.post("/products", newProduct),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
      toast.success(`محصول «${variables.name}» با موفقیت اضافه شد.`, {
        className: "toast-base toast-success",
        progressClassName: "toast-success-progress",
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطا در افزودن محصول");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct) =>
      apiClient.put(`/products/${updatedProduct.id}`, updatedProduct),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
      toast.success(`محصول «${variables.name}» با موفقیت ویرایش شد.`, {
        className: "toast-base toast-success",
        progressClassName: "toast-success-progress",
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطا در ویرایش محصول");
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (product) => apiClient.delete(`/products/${product.id}`),
    onSuccess: (data, variables) => {
      closeModal();
      toast.success(`محصول «${variables.name}» با موفقیت حذف شد.`, {
        className: "toast-base toast-delete",
        progressClassName: "toast-delete-progress",
      });
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطا در حذف محصول");
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids) => apiClient.delete("/products", { data: { ids } }),
    onSuccess: (data, variables) => {
      closeModal();
      toast.success(`تعداد ${variables.length} محصول با موفقیت حذف شد.`, {
        className: "toast-base toast-delete",
      });
      if (selectedIds.length === products.length && page > 1) {
        setPage(page - 1);
      } else {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
      setIsBulkDeleteMode(false);
      setSelectedIds([]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطا در حذف گروهی");
    },
  });

  const handleConfirmDeletion = () => {
    if (modalState.type === "DELETE") {
      deleteProductMutation.mutate(modalState.data);
    } else if (modalState.type === "BULK_DELETE") {
      bulkDeleteMutation.mutate(selectedIds);
    }
  };

  const handleOpenBulkDeleteModal = () => {
    if (selectedIds.length > 0) {
      openModal("BULK_DELETE");
    }
  };

  const openModal = (type, data = null) => setModalState({ type, data });

  const closeModal = () => setModalState({ type: null, data: null });

  const addProductHandler = (data) => {
    addProductMutation.mutate({
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  };

  const updateProductHandler = (data) => {
    updateProductMutation.mutate({
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  };

  const formatPrice = (price) => {
    const cleanPrice = String(price).replace(/,/g, "");
    const num = Number(cleanPrice);

    if (isNaN(num)) return price;

    if (num >= 1000000000) {
      const billions = num / 1000000000;
      return `${new Intl.NumberFormat("fa-IR").format(billions)} میلیارد تومان`;
    }
    if (num >= 1000000) {
      const millions = num / 1000000;
      return `${new Intl.NumberFormat("fa-IR").format(millions)} میلیون تومان`;
    }
    if (num >= 10000) {
      return `${new Intl.NumberFormat("fa-IR").format(num)} هزار تومان`;
    }
    return `${new Intl.NumberFormat("fa-IR").format(num)} تومان`;
  };

  let deleteModalTitle = "";
  if (modalState.type === "DELETE" && modalState.data) {
    deleteModalTitle = (
      <>
        آیا از حذف محصول
        <span className={styles.highlightedName}>«{modalState.data.name}»</span>
        مطمئن هستید؟
      </>
    );
  } else if (modalState.type === "BULK_DELETE") {
    deleteModalTitle = (
      <>
        آیا از حذف
        <span className={styles.highlightedName}>«{selectedIds.length}»</span>
        محصول مطمئن هستید؟
      </>
    );
  }

  return (
    <div className={styles.form}>
      <header className={styles.header}>
        <div className={styles.adminStyles}>
          <button onClick={handleLogout} title="خروج از حساب کاربری">
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
                  onClick={handleEnterBulkDeleteMode}
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
                  onClick={handleOpenBulkDeleteModal}
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
                <th className={styles.rowNumber}>شماره ردیف</th>
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
                  <td colSpan={isBulkDeleteMode ? 7 : 6}>درحال بارگذاری...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={isBulkDeleteMode ? 7 : 6}>
                    {error?.response?.data?.message || "خطا در دریافت اطلاعات"}
                  </td>
                </tr>
              ) : products.length === 0 ? (
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
                      {(page - 1) * 7 + index + 1}
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
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
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
        onUpdateProduct={updateProductHandler}
        product={modalState.data}
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
