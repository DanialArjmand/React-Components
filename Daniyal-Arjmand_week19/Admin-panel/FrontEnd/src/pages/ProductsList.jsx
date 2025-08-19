import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api/apiConfig";

import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

import { CiLogout } from "react-icons/ci";
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

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);

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

  const addProductMutation = useMutation({
    mutationFn: (newProduct) => apiClient.post("/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct) =>
      apiClient.put(`/products/${updatedProduct.id}`, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => apiClient.delete(`/products/${productId}`),
    onSuccess: () => {
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
      closeModal();
    },
  });

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

  const confirmDeleteHandler = () => {
    deleteProductMutation.mutate(modalState.data.id);
  };

  const products = queryData?.data ?? [];
  const totalPages = queryData?.totalPages ?? 1;

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

  return (
    <div className={styles.form}>
      <header className={styles.header}>
        <div className={styles.adminStyles}>
          <button>
            <CiLogout className={styles.iconLogout} />
          </button>
          <p>
            میلاد عظمی<span>مدیر</span>
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
          <div>
            <button onClick={() => openModal("ADD")}>افزودن محصول</button>
            <button className={styles.deleteGroup}>حذف گروهی</button>
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
                <th>شماره ردیف</th>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className={styles.noProductsText}>
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="6" className={styles.noProductsText}>
                    خطا در دریافت اطلاعات
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.noProductsText}>
                    {debouncedSearchTerm
                      ? "محصولی با این مشخصات یافت نشد"
                      : "هیچ محصولی هنوز ثبت نشده"}
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{(page - 1) * 7 + index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.id.slice(0, 8)}</td>
                    <td>
                      <div className={styles.action}>
                        <button onClick={() => openModal("EDIT", product)}>
                          <img src={editIcon} alt="editIcon" />
                        </button>
                        <button onClick={() => openModal("DELETE", product)}>
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
        isOpen={modalState.type === "DELETE"}
        onClose={closeModal}
        onConfirm={confirmDeleteHandler}
        product={modalState.data}
        isSubmitting={deleteProductMutation.isLoading}
      />
    </div>
  );
}

export default ProductsList;
