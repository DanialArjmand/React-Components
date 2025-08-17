import { useState, useEffect } from "react";
import stylesModal from "./AddModal.module.css";

function EditModal({ isOpen, onClose, product, onUpdateProduct }) {
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductStock(product.stock);
      setProductPrice(product.price);
    }
  }, [product]);

  if (!isOpen) {
    return null;
  }

  const handleUpdate = () => {
    if (!productName || !productStock || !productPrice) {
      alert("لطفاً تمام فیلدها را پر کنید!");
      return;
    }

    const updatedProduct = {
      ...product,
      name: productName,
      stock: productStock,
      price: productPrice,
    };

    onUpdateProduct(updatedProduct);
  };

  return (
    <div className={stylesModal.backgroundParent}>
      <div className={stylesModal.addForm}>
        <h3>ویرایش اطلاعات</h3>
        <div className={stylesModal.inputs}>
          <label>نام کالا</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label>تعداد موجودی</label>
          <input
            type="text"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />

          <label>قیمت</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className={stylesModal.buttonStatus}>
          <button className={stylesModal.buttonCancel} onClick={onClose}>
            انصراف
          </button>
          <button className={stylesModal.buttonCreate} onClick={handleUpdate}>
            ثبت اطلاعات جدید
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
