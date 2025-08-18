import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import stylesModal from "./AddModal.module.css";
import { productSchema } from "../schemas/validationSchemas";

function EditModal({ isOpen, onClose, product, onUpdateProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data) => {
    const updatedProduct = {
      ...product,
      ...data,
    };
    onUpdateProduct(updatedProduct);
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
        <h3>ویرایش اطلاعات</h3>
        <div className={stylesModal.inputs}>
          <label>نام کالا</label>
          <input
            dir="rtl"
            type="text"
            className={`${stylesModal.input} ${
              errors.name ? stylesModal.inputError : ""
            }`}
            {...register("name")}
          />
          <div className={stylesModal.errorContainer}>
            {errors.name && (
              <p className={stylesModal.errorText}>{errors.name.message}</p>
            )}
          </div>

          <label>تعداد موجودی</label>
          <input
            dir="rtl"
            type="number"
            className={`${stylesModal.input} ${
              errors.stock ? stylesModal.inputError : ""
            }`}
            {...register("stock")}
          />
          <div className={stylesModal.errorContainer}>
            {errors.stock && (
              <p className={stylesModal.errorText}>{errors.stock.message}</p>
            )}
          </div>

          <label>قیمت</label>
          <input
            dir="rtl"
            type="text"
            className={`${stylesModal.input} ${
              errors.price ? stylesModal.inputError : ""
            }`}
            {...register("price")}
          />
          <div className={stylesModal.errorContainer}>
            {errors.price && (
              <p className={stylesModal.errorText}>{errors.price.message}</p>
            )}
          </div>
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
            ثبت اطلاعات جدید
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
