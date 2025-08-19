import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";

import styles from "./ProductsList.module.css";
import searchIcon from "../assets/search-normal.svg";
import profile from "../assets/Felix-Vogel-4.svg";
import settingIcon from "../assets/setting-3.svg";
import deleteIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";

function ProductsList() {
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "کفش نایکی", stock: 20, price: 3500000 },
    { id: 2, name: "پیراهن آدیداس", stock: 50, price: 1200000 },
    { id: 3, name: "شلوار جین", stock: 30, price: 950000 },
    { id: 4, name: "کلاه کپ", stock: 100, price: 250000 },
    { id: 5, name: "عینک آفتابی", stock: 15, price: 1800000 },
    { id: 6, name: "ساعت مچی", stock: 25, price: 4200000 },
    { id: 7, name: "کیف ورزشی", stock: 40, price: 700000 },
    { id: 8, name: "جوراب ورزشی", stock: 200, price: 150000 },
    { id: 9, name: "گرمکن ورزشی", stock: 35, price: 2100000 },
  ]);

  const openModal = (type, data = null) => {
    setModalState({ type, data });
  };

  const closeModal = () => {
    setModalState({ type: null, data: null });
  };

  const updateProductHandler = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    closeModal();
  };

  const addProductHandler = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, price: Number(newProduct.price), id: uuidv4() },
    ]);
  };

  const confirmDeleteHandler = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== modalState.data.id)
    );
    closeModal();
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const { currentItems, firstItemIndex, ...paginationProps } = usePagination(
    filteredProducts,
    7
  );

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
          <button onClick={() => openModal("ADD")}>افزودن محصول</button>
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.noProductsText}>
                    {products.length === 0
                      ? "هیچ محصولی هنوز ثبت نشده"
                      : "محصولی با این مشخصات یافت نشد"}
                  </td>
                </tr>
              ) : (
                currentItems.map((product, index) => (
                  <tr key={product.id}>
                    <td>{firstItemIndex + index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.id.toString().slice(2, 8)}</td>
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
        <Pagination {...paginationProps} />
      </main>

      <AddModal
        isOpen={modalState.type === "ADD"}
        onClose={closeModal}
        onAddProduct={addProductHandler}
      />
      <EditModal
        isOpen={modalState.type === "EDIT"}
        onClose={closeModal}
        onUpdateProduct={updateProductHandler}
        product={modalState.data}
      />
      <DeleteModal
        isOpen={modalState.type === "DELETE"}
        onClose={closeModal}
        onConfirm={confirmDeleteHandler}
        product={modalState.data}
      />
    </div>
  );
}

export default ProductsList;
