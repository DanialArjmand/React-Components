import stylesModal from "./AddModal.module.css";

function AddModal() {
  return (
    <div>
      <div>
        <h2>ایجاد محصول جدید</h2>
        <div>
          <label>نام کالا</label>
          <input type="text" placeholder="نام کالا" />

          <label>تعداد موجودی</label>
          <input type="text" placeholder="تعداد" />

          <label>قیمت</label>
          <input type="text" placeholder="قیمت" />
        </div>
        <div>
          <button>ایجاد</button>
          <button>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
