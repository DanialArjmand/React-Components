import React, { useState } from "react";
// import ContactList from "./ContactList.jsx"; 
import Styles from "./Contact.module.css";
import { v4 } from "uuid";

function Contact({ contacts, setContacts, closeModal }) {
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((contacts) => ({ ...contacts, [name]: value }));
  };

  const addHandler = () => {
    if (!contact.Name || !contact.LastName || !contact.Email || !contact.Phone) {
      setAlert("لطفا مقدار معتبری وارد کنید!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts([...contacts, newContact]);
    setContact({ Name: "", LastName: "", Email: "", Phone: "" });
    closeModal(); 
  };

  return (
    <div className={Styles["parent-input"]}>
      {alert && <p>{alert}</p>}

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

      <button onClick={addHandler}>افزودن مخاطب</button>
    </div>
  );
}

export default Contact;
