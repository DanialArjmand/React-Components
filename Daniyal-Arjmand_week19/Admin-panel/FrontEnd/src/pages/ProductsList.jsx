import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

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
    { id: 1, name: "کفش نایکی", stock: 20, price: "3,500,000" },
    { id: 2, name: "پیراهن آدیداس", stock: 50, price: "1,200,000" },
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
      { ...newProduct, id: uuidv4() },
    ]);
  };

  const confirmDeleteHandler = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== modalState.data.id)
    );
    closeModal();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.noProductsText}>
                    {products.length === 0
                      ? "هیچ محصولی هنوز ثبت نشده"
                      : "محصولی با این مشخصات یافت نشد"}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
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
