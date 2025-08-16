import stylesModal from "./AddModal.module.css";

function AddModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={stylesModal.backgroundParent}>
      <div className={stylesModal.addForm}>
        <h3>ایجاد محصول جدید</h3>
        <div className={stylesModal.inputs}>
          <label>نام کالا</label>
          <input type="text" placeholder="نام کالا" />

          <label>تعداد موجودی</label>
          <input type="text" placeholder="تعداد" />

          <label>قیمت</label>
          <input type="text" placeholder="قیمت" />
        </div>
        <div className={stylesModal.buttonStatus}>
          <button className={stylesModal.buttonCancel}>انصراف</button>
          <button className={stylesModal.buttonCreate}>ایجاد</button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
