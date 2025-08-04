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
      reset({
        Name: "",
        LastName: "",
        Email: "",
        Phone: "",
        Category: "",
        Gender: "",
      });
    }
  }, [contactEdit, reset]);

  const onSubmit = async (data) => {
    const payload = { ...data };
    if (contactEdit) {
      payload.id = contactEdit.id;
    }
    await saveContact(payload);

    setTimeout(() => {
      reset({
        Name: "",
        LastName: "",
        Email: "",
        Phone: "",
        Category: "",
        Gender: "",
      });
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
        <div className="input-wrapper">
          <div className={`inputs ${errors.Name ? "inputs-error" : ""}`}>
            <label> نام : </label>
            <div className="input-container">
              <input
                type="text"
                placeholder="نام"
                {...register("Name")}
                className={errors.Name ? "input-error" : ""}
              />

              {isSubmitted &&
                (errors.Name ? (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="icon error-icon"
                  />
                ) : (
                  watch("Name") && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon success-icon"
                    />
                  )
                ))}
            </div>
          </div>
          {errors.Name && <p className="error-text">{errors.Name.message}</p>}
        </div>

        <div className="input-wrapper">
          <div className={`inputs ${errors.LastName ? "inputs-error" : ""}`}>
            <label> نام خانوادگی : </label>
            <div className="input-container">
              <input
                type="text"
                placeholder="نام خانوادگی"
                {...register("LastName")}
                className={errors.LastName ? "input-error" : ""}
              />
              {isSubmitted &&
                (errors.LastName ? (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="icon error-icon"
                  />
                ) : (
                  watch("LastName") && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon success-icon"
                    />
                  )
                ))}
            </div>
          </div>
          {errors.LastName && (
            <p className="error-text">{errors.LastName.message}</p>
          )}
        </div>

        <div className="input-wrapper">
          <div className={`inputs ${errors.Email ? "inputs-error" : ""}`}>
            <label> ایمیل : </label>
            <div className="input-container">
              <input
                type="email"
                placeholder="ایمیل"
                {...register("Email")}
                className={errors.Email ? "input-error" : ""}
              />
              {isSubmitted &&
                (errors.Email ? (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="icon error-icon"
                  />
                ) : (
                  watch("Email") && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon success-icon"
                    />
                  )
                ))}
            </div>
          </div>
          {errors.Email && <p className="error-text">{errors.Email.message}</p>}
        </div>

        <div className="input-wrapper">
          <div className={`inputs ${errors.Phone ? "inputs-error" : ""}`}>
            <label> شماره تلفن : </label>
            <div className="input-container">
              <input
                type="number"
                placeholder="شماره تلفن "
                {...register("Phone")}
                className={errors.Phone ? "input-error" : ""}
              />
              {isSubmitted &&
                (errors.Phone ? (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="icon error-icon"
                  />
                ) : (
                  watch("Phone") && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon success-icon"
                    />
                  )
                ))}
            </div>
          </div>
          {errors.Phone && <p className="error-text">{errors.Phone.message}</p>}
        </div>

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
