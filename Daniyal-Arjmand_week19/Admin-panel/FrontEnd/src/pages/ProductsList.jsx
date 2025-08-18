import { useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: "کفش نایکی", stock: 20, price: "3,500,000" },
    { id: 2, name: "پیراهن آدیداس", stock: 50, price: "1,200,000" },
  ]);

  const openEditModalHandler = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const updateProductHandler = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    closeEditModalHandler();
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const addProductHandler = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: Math.random() },
    ]);
    setIsModalOpen(false);
  };

  const openDeleteModalHandler = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
    setDeletingProduct(null);
  };

  const confirmDeleteHandler = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== deletingProduct.id)
    );
    closeDeleteModalHandler();
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
          <input type="text" placeholder="جستجو کالا" />
          <img src={searchIcon} alt="searchIcon" />
        </div>
      </header>

      <main>
        <div className={styles.headTitle}>
          <button onClick={openModalHandler}>افزودن محصول</button>
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
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.noProductsText}>
                    هیچ محصولی هنوز ثبت نشده
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td>{product.id.toString().slice(2, 8)}</td>
                    <td>
                      <div className={styles.action}>
                        <button onClick={() => openEditModalHandler(product)}>
                          <img src={editIcon} alt="editIcon" />
                        </button>
                        <button onClick={() => openDeleteModalHandler(product)}>
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
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        onAddProduct={addProductHandler}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModalHandler}
        onUpdateProduct={updateProductHandler}
        product={editingProduct}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModalHandler}
        onConfirm={confirmDeleteHandler}
        product={deletingProduct}
      />
    </div>
  );
}

export default ProductsList;
