import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import stylesModal from "./AddModal.module.css";
import { productSchema } from "../schemas/validationSchemas";

function AddModal({ isOpen, onClose, onAddProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data) => {
    onAddProduct(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className={stylesModal.backgroundParent}>
      <form className={stylesModal.addForm} onSubmit={handleSubmit(onSubmit)}>
        <h3>ایجاد محصول جدید</h3>
        <div className={stylesModal.inputs}>
          <label>نام کالا</label>
          <input type="text" placeholder="نام کالا" {...register("name")} />
          {errors.name && (
            <p className={stylesModal.errorText}>{errors.name.message}</p>
          )}

          <label>تعداد موجودی</label>
          <input type="number" placeholder="تعداد" {...register("stock")} />
          {errors.stock && (
            <p className={stylesModal.errorText}>{errors.stock.message}</p>
          )}

          <label>قیمت</label>
          <input type="text" placeholder="قیمت" {...register("price")} />
          {errors.price && (
            <p className={stylesModal.errorText}>{errors.price.message}</p>
          )}
        </div>
        <div className={stylesModal.buttonStatus}>
          <button
            type="button"
            className={stylesModal.buttonCancel}
            onClick={handleClose}
          >
            انصراف
          </button>
          <button type="submit" className={stylesModal.buttonCreate}>
            ایجاد
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddModal;
