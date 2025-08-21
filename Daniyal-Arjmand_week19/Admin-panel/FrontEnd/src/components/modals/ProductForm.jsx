import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../schemas/validationSchemas";

export default function ProductForm({
  stylesModule,
  title,
  submitLabel,
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <form
      className={stylesModule.addForm}
      onSubmit={handleSubmit((data) => {
        onSubmit?.(data);
        reset();
      })}
    >
      <h3>{title}</h3>

      <div className={stylesModule.inputs}>
        <label>نام کالا</label>
        <input
          dir="rtl"
          type="text"
          placeholder="نام کالا"
          className={`${stylesModule.input} ${
            errors.name ? stylesModule.inputError : ""
          }`}
          {...register("name")}
        />
        <div className={stylesModule.errorContainer}>
          {errors.name && (
            <p className={stylesModule.errorText}>{errors.name.message}</p>
          )}
        </div>

        <label>تعداد موجودی</label>
        <input
          dir="rtl"
          type="number"
          placeholder="تعداد"
          className={`${stylesModule.input} ${
            errors.quantity ? stylesModule.inputError : ""
          }`}
          {...register("quantity")}
        />
        <div className={stylesModule.errorContainer}>
          {errors.quantity && (
            <p className={stylesModule.errorText}>{errors.quantity.message}</p>
          )}
        </div>

        <label>قیمت</label>
        <input
          dir="rtl"
          type="number"
          placeholder="قیمت"
          className={`${stylesModule.input} ${
            errors.price ? stylesModule.inputError : ""
          }`}
          {...register("price")}
        />
        <div className={stylesModule.errorContainer}>
          {errors.price && (
            <p className={stylesModule.errorText}>{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className={stylesModule.buttonStatus}>
        <button
          type="button"
          className={stylesModule.buttonCancel}
          onClick={handleCancel}
        >
          انصراف
        </button>
        <button
          type="submit"
          className={stylesModule.buttonCreate}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ایجاد..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
