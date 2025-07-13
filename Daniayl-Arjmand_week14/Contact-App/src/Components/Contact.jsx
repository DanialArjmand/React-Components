import React, { useState } from "react";
import Styles from "./Contact.module.css";
import { v4 } from "uuid";

function Contact({ addContact, onCloseModal }) {
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
    Gender: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const addHandler = () => {
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
    setAlert("");
    addContact({ ...contact, id: v4() });

    setContact({
      Name: "",
      LastName: "",
      Email: "",
      Phone: "",
      Gender: "",
    });
  };

  return (
    <div className={Styles["modal-backdrop"]}>
      <div className={Styles["modal"]}>
        <div className={Styles["alert"]}>{alert && <p>{alert}</p>}</div>

        <div>
          <label>نام:</label>
          <input
            type="text"
            placeholder="نام"
            name="Name"
            value={contact.Name}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label>نام خانوادگی:</label>
          <input
            type="text"
            placeholder="نام خانوادگی"
            name="LastName"
            value={contact.LastName}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label>ایمیل:</label>
          <input
            type="email"
            placeholder="ایمیل"
            name="Email"
            value={contact.Email}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label>شماره تلفن:</label>
          <input
            type="number"
            placeholder="شماره تلفن"
            name="Phone"
            value={contact.Phone}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label>جنسیت:</label>
          <div className={Styles["gender-group"]}>
            <label>
              <input
                type="radio"
                name="Gender"
                value="مرد"
                checked={contact.Gender === "مرد"}
                onChange={changeHandler}
              />
              مرد
            </label>
            <label>
              <input
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

        <div className={Styles["parent-butt"]}>
          <button className={Styles["butt-1"]} onClick={addHandler}>
            افزودن مخاطب
          </button>
          <button className={Styles["butt-2"]} onClick={onCloseModal}>
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
