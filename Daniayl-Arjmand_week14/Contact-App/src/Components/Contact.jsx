import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import Styles from "./Contact.module.css";

function Contact({
  addContact,
  updateContact,
  editingContact,
  onCloseModal,
  successMessage,
  setSuccessMessage,
}) {
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
    Gender: "",
    Category: "",
  });

  useEffect(() => {
    if (editingContact) {
      setContact({
        ...editingContact,
        Category: editingContact.Category || "",
      });
    }
  }, [editingContact]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    if (
      !contact.Name ||
      !contact.LastName ||
      !contact.Email ||
      !contact.Phone ||
      !contact.Gender
    ) {
      setAlert("لطفا همه مقادیر را وارد کنید!");
      return;
    }

    if (!contact.Category) {
      setAlert("انتخاب حداقل یک دسته اجباری است!");
      return;
    }

    if (contact.Name.trim().length < 2) {
      setAlert("نام باید حداقل ۲ حرف باشد!");
      return;
    }

    if (contact.LastName.trim().length < 2) {
      setAlert("نام خانوادگی باید حداقل ۲ حرف باشد!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.Email)) {
      setAlert("ایمیل وارد شده معتبر نیست!");
      return;
    }

    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(contact.Phone)) {
      setAlert("شماره تلفن باید با 0 شروع شود و 10 تا 11 رقم داشته باشد!");
      return;
    }

    setAlert("");

    if (editingContact) {
      updateContact(contact);
      setSuccessMessage("✅ مخاطب با موفقیت ویرایش شد.");
    } else {
      addContact({ ...contact, id: v4() });
      setSuccessMessage("✅ مخاطب با موفقیت اضافه شد.");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    setContact({
      Name: "",
      LastName: "",
      Email: "",
      Phone: "",
      Gender: "",
      Category: "",
    });
  };

  return (
    <div className={Styles["modal-backdrop"]}>
      <div className={Styles.modal}>
        <div className={Styles.alert}>{alert && <p>{alert}</p>}</div>
        {successMessage && (
          <p className={Styles["success-message"]}>{successMessage}</p>
        )}

        <div className={Styles["form-row"]}>
          <label className={Styles.label}>نام:</label>
          <input
            className={Styles.input}
            type="text"
            placeholder="نام"
            name="Name"
            value={contact.Name}
            onChange={changeHandler}
          />
        </div>

        <div className={Styles["form-row"]}>
          <label className={Styles.label}>نام خانوادگی:</label>
          <input
            className={Styles.input}
            type="text"
            placeholder="نام خانوادگی"
            name="LastName"
            value={contact.LastName}
            onChange={changeHandler}
          />
        </div>

        <div className={Styles["form-row"]}>
          <label className={Styles.label}>ایمیل:</label>
          <input
            className={Styles.input}
            type="email"
            placeholder="ایمیل"
            name="Email"
            value={contact.Email}
            onChange={changeHandler}
          />
        </div>

        <div className={Styles["form-row"]}>
          <label className={Styles.label}>شماره تلفن:</label>
          <input
            className={Styles.input}
            type="number"
            placeholder="شماره تلفن"
            name="Phone"
            value={contact.Phone}
            onChange={changeHandler}
          />
        </div>

        <div className={Styles["form-row"]}>
          <label className={Styles.label}>دسته بندی:</label>
          <select
            name="Category"
            value={contact.Category}
            onChange={changeHandler}
            className={Styles["select-category"]}
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

        <div className={Styles["form-row"]}>
          <label className={Styles.label}>جنسیت:</label>
          <div className={Styles["gender-group"]}>
            <label className={Styles["gender-label"]}>
              <input
                className={Styles["radio-input"]}
                type="radio"
                name="Gender"
                value="مرد"
                checked={contact.Gender === "مرد"}
                onChange={changeHandler}
              />
              مرد
            </label>
            <label className={Styles["gender-label"]}>
              <input
                className={Styles["radio-input"]}
                type="radio"
                name="Gender"
                value="زن"
                checked={contact.Gender === "زن"}
                onChange={changeHandler}
              />
              زن
            </label>
          </div>
        </div>

        <div className={Styles["button-container"]}>
          <button className={Styles["butt-1"]} onClick={submitHandler}>
            {editingContact ? "ویرایش مخاطب" : "افزودن مخاطب"}
          </button>
          <button className={Styles["butt-2"]} onClick={onCloseModal}>
            برگشت
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
