import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContacts } from "../context/Context";
import { contactSchema } from "../utils/validationSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

const INITIAL_FORM_STATE = {
  Name: "",
  LastName: "",
  Email: "",
  Phone: "",
  Category: "",
  Gender: "",
};

const Inputs = () => {
  const { state, dispatch, saveContact } = useContacts();
  const { contactEdit } = state;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitted },
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (contactEdit) {
      reset(contactEdit);
    } else {
      reset(INITIAL_FORM_STATE);
    }
  }, [contactEdit, reset]);

  const onSubmit = async (data) => {
    const payload = { ...data };
    if (contactEdit) {
      payload.id = contactEdit.id;
    }
    await saveContact(payload);

    setTimeout(() => {
      reset(INITIAL_FORM_STATE);
    }, 2500);
  };

  const closeHandler = () => {
    dispatch({ type: "TOGGLE_FORM" });
  };

  const getBannerProps = () => {
    if (isSubmitSuccessful) {
      return {
        icon: faCheckCircle,
        text: "اطلاعات شما با موفقیت ذخیره شد!",
        className: "success",
      };
    }
    if (Object.keys(errors).length > 0) {
      return {
        icon: faExclamationCircle,
        text: "یکی از فیلدها نادرست است. لطفاً موارد را اصلاح کنید.",
        className: "error",
      };
    }
    if (isValid) {
      return {
        icon: faInfoCircle,
        text: "همه موارد صحیح است، اطلاعات خود را ذخیره کنید.",
        className: "default",
      };
    }
    return {
      icon: faInfoCircle,
      text: "لطفاً اطلاعات خود را وارد کنید.",
      className: "default",
    };
  };

  const banner = getBannerProps();

  return (
    <div>
      <div className={`banner banner-${banner.className}`}>
        <FontAwesomeIcon icon={banner.icon} />
        <p>{banner.text}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <div
            className={`gender-group ${errors.Gender ? "gender-error" : ""}`}
          >
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
          {errors.Gender && (
            <p className="error-text">{errors.Gender.message}</p>
          )}
        </div>

        <div className="butt-parent">
          <button className="text-butt-state" type="submit">
            ذخیره
          </button>
          <button
            className="text-butt-state"
            type="button"
            onClick={closeHandler}
          >
            برگشت
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inputs;
