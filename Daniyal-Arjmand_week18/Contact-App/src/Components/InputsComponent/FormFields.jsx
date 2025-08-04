import React from "react";
import InputField from "./InputField";

const FormFields = ({ register, errors, watch, isSubmitted }) => {
  return (
    <>
      <InputField
        name="Name"
        label="نام"
        type="text"
        placeholder="نام"
        register={register}
        errors={errors}
        watch={watch}
        isSubmitted={isSubmitted}
      />
      <InputField
        name="LastName"
        label="نام خانوادگی"
        type="text"
        placeholder="نام خانوادگی"
        register={register}
        errors={errors}
        watch={watch}
        isSubmitted={isSubmitted}
      />
      <InputField
        name="Email"
        label="ایمیل"
        type="email"
        placeholder="ایمیل"
        register={register}
        errors={errors}
        watch={watch}
        isSubmitted={isSubmitted}
      />
      <InputField
        name="Phone"
        label="شماره تلفن"
        type="number"
        placeholder="شماره تلفن"
        register={register}
        errors={errors}
        watch={watch}
        isSubmitted={isSubmitted}
      />

      <div className="input-wrapper">
        <div className={`select-op ${errors.Category ? "select-error" : ""}`}>
          <label> دسته بندی : </label>
          <select
            {...register("Category")}
            className={errors.Category ? "input-error" : ""}
          >
            <option value="">یک دسته را انتخاب کنید</option>
            <option value="خانواده">خانواده</option>
            <option value="همکار">همکار</option>
            <option value="دوست">دوست</option>
            <option value="سایر">سایر</option>
          </select>
        </div>
        {errors.Category && (
          <p className="error-text">{errors.Category.message}</p>
        )}
      </div>

      <div className="input-wrapper">
        <div className={`gender-group ${errors.Gender ? "gender-error" : ""}`}>
          <label>جنسیت :</label>
          <div className="gender-parent">
            <div className="gender-child">
              <label className="gender-label">
                <input type="radio" value="مرد" {...register("Gender")} /> مرد
              </label>
            </div>
            <div className="gender-child">
              <label className="gender-label">
                <input type="radio" value="زن" {...register("Gender")} /> زن
              </label>
            </div>
          </div>
        </div>
        {errors.Gender && <p className="error-text">{errors.Gender.message}</p>}
      </div>
    </>
  );
};

export default FormFields;
