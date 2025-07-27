import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const Inputs = ({ onSave, onClose, contactEdit }) => {
  const [form, setForm] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
    Category: "",
    Gender: "",
  });
  const [errors, setErrors] = useState({});
  const [Submitted, setSubmitted] = useState(false);
  const [bannerState, setBannerState] = useState("default");

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (Submitted) {
      setErrors(validateForm(form));
    }
  }, [form, Submitted]);

  useEffect(() => {
    if (bannerState === "error" && Object.keys(errors).length === 0) {
      setBannerState("default");
    }
  }, [errors, bannerState]);

  useEffect(() => {
    if (contactEdit) {
      setForm(contactEdit);
    }
  }, [contactEdit]);

  const submitHandler = () => {
    setSubmitted(true);
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setBannerState("error");
    } else {
      onSave({ ...form, id: contactEdit ? contactEdit.id : null });

      setBannerState("success");

      setTimeout(() => {
        setForm({
          Name: "",
          LastName: "",
          Email: "",
          Phone: "",
          Category: "",
          Gender: "",
        });
        setErrors({});
        setSubmitted(false);
        setBannerState("default");
      }, 2500);
    }
  };

  const bannerContent = {
    default: {
      icon: faInfoCircle,
      text:
        Object.keys(errors).length === 0 && Submitted
          ? "همه موارد صحیح است، اطلاعات خود را ذخیره کنید."
          : " لطفاً اطلاعات خود را وارد کنید.",
      className: "default",
    },
    error: {
      icon: faExclamationCircle,
      text: "یکی از فیلدها نادرست است. لطفاً موارد را اصلاح کنید.",
      className: "error",
    },
    success: {
      icon: faCheckCircle,
      text: "اطلاعات شما با موفقیت ذخیره شد!",
      className: "success",
    },
  };

  const validateForm = (form) => {
    const errors = {};

    if (form.Name.trim().length < 2) {
      errors.Name = "نام باید حداقل ۲ حرف باشد!";
    }

    if (form.LastName.trim().length < 2) {
      errors.LastName = "نام خانوادگی باید حداقل ۲ حرف باشد!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.Email) {
      errors.Email = "وارد کردن ایمیل الزامی است.";
    } else if (!emailRegex.test(form.Email)) {
      errors.Email = "ایمیل وارد شده معتبر نیست.";
    }

    const phoneRegex = /^0\d{9,10}$/;
    if (!form.Phone) {
      errors.Phone = "وارد کردن شماره تلفن الزامی است.";
    } else if (!phoneRegex.test(form.Phone)) {
      errors.Phone = "شماره تلفن باید با 0 شروع شود و ۱۱ رقمی باشد.";
    }

    if (!form.Category) {
      errors.Category = "انتخاب دسته بندی الزامی است.";
    }

    if (!form.Gender) {
      errors.Gender = "انتخاب جنسیت الزامی است.";
    }

    return errors;
  };

  return (
    <div>
      <div className={`banner banner-${bannerContent[bannerState].className}`}>
        <FontAwesomeIcon icon={bannerContent[bannerState].icon} />
        <p>{bannerContent[bannerState].text}</p>
      </div>

      <div className="input-wrapper">
        <div className={`inputs ${errors.Name ? "inputs-error" : ""}`}>
          <label> نام : </label>
          <div className="input-container">
            <input
              type="text"
              placeholder="نام"
              name="Name"
              value={form.Name}
              onChange={changeHandler}
              className={errors.Name ? "input-error" : ""}
            />
            {Submitted &&
              (errors.Name ? (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="icon error-icon"
                />
              ) : (
                form.Name && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon success-icon"
                  />
                )
              ))}
          </div>
        </div>
        {errors.Name && <p className="error-text">{errors.Name}</p>}
      </div>

      <div className="input-wrapper">
        <div className={`inputs ${errors.LastName ? "inputs-error" : ""}`}>
          <label> نام خانوادگی : </label>
          <div className="input-container">
            <input
              type="text"
              placeholder="نام خانوادگی"
              name="LastName"
              value={form.LastName}
              onChange={changeHandler}
              className={errors.LastName ? "input-error" : ""}
            />
            {Submitted &&
              (errors.LastName ? (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="icon error-icon"
                />
              ) : (
                form.LastName && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon success-icon"
                  />
                )
              ))}
          </div>
        </div>
        {errors.LastName && <p className="error-text">{errors.LastName}</p>}
      </div>

      <div className="input-wrapper">
        <div className={`inputs ${errors.Email ? "inputs-error" : ""}`}>
          <label> ایمیل : </label>
          <div className="input-container">
            <input
              type="email"
              placeholder="ایمیل"
              name="Email"
              value={form.Email}
              onChange={changeHandler}
              className={errors.Email ? "input-error" : ""}
            />
            {Submitted &&
              (errors.Email ? (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="icon error-icon"
                />
              ) : (
                form.Email && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon success-icon"
                  />
                )
              ))}
          </div>
        </div>
        {errors.Email && <p className="error-text">{errors.Email}</p>}
      </div>

      <div className="input-wrapper">
        <div className={`inputs ${errors.Phone ? "inputs-error" : ""}`}>
          <label> شماره تلفن : </label>
          <div className="input-container">
            <input
              type="number"
              placeholder="شماره تلفن "
              name="Phone"
              value={form.Phone}
              onChange={changeHandler}
              className={errors.Phone ? "input-error" : ""}
            />
            {Submitted &&
              (errors.Phone ? (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="icon error-icon"
                />
              ) : (
                form.Phone && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="icon success-icon"
                  />
                )
              ))}
          </div>
        </div>
        {errors.Phone && <p className="error-text">{errors.Phone}</p>}
      </div>

      <div className="input-wrapper">
        <div className={`select-op ${errors.Category ? "select-error" : ""}`}>
          <label> دسته بندی : </label>
          <select
            name="Category"
            value={form.Category}
            onChange={changeHandler}
            className={errors.Category ? "input-error" : ""}
          >
            <option value="" disabled>
              یک دسته را انتخاب کنید
            </option>
            <option value="خانواده">خانواده</option>
            <option value="همکار">همکار</option>
            <option value="دوست">دوست</option>
            <option value="سایر">سایر</option>
          </select>
        </div>
        {errors.Category && <p className="error-text">{errors.Category}</p>}
      </div>

      <div className="input-wrapper">
        <div className={`gender-group ${errors.Gender ? "gender-error" : ""}`}>
          <label>جنسیت :</label>
          <div className="gender-parent">
            <div className="gender-child">
              <label className="gender-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="Gender"
                  value="مرد"
                  checked={form.Gender === "مرد"}
                  onChange={changeHandler}
                />
                مرد
              </label>
            </div>
            <div className="gender-child">
              <label className="gender-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="Gender"
                  value="زن"
                  checked={form.Gender === "زن"}
                  onChange={changeHandler}
                />
                زن
              </label>
            </div>
          </div>
        </div>
        {errors.Gender && <p className="error-text">{errors.Gender}</p>}
      </div>

      <div className="butt-parent">
        <button className="text-butt-state" onClick={submitHandler}>
          ذخیره
        </button>
        <button className="text-butt-state" onClick={onClose}>
          برگشت
        </button>
      </div>
    </div>
  );
};

export default Inputs;
