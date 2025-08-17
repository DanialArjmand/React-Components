import stylesModal from "./AddModal.module.css";
import { useState } from "react";

function AddModal({ isOpen, onClose, onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (!productName || !productStock || !productPrice) {
      alert("لطفاً تمام فیلدها را پر کنید!");
      return;
    }

    const newProduct = {
      name: productName,
      stock: productStock,
      price: productPrice,
    };

    onAddProduct(newProduct);

    setProductName("");
    setProductStock("");
    setProductPrice("");
  };

  return (
    <div className={stylesModal.backgroundParent}>
      <div className={stylesModal.addForm}>
        <h3>ایجاد محصول جدید</h3>
        <div className={stylesModal.inputs}>
          <label>نام کالا</label>
          <input
            type="text"
            placeholder="نام کالا"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label>تعداد موجودی</label>
          <input
            type="text"
            placeholder="تعداد"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />

          <label>قیمت</label>
          <input
            type="text"
            placeholder="قیمت"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className={stylesModal.buttonStatus}>
          <button className={stylesModal.buttonCancel} onClick={onClose}>
            انصراف
          </button>
          <button className={stylesModal.buttonCreate} onClick={handleSubmit}>
            ایجاد
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
