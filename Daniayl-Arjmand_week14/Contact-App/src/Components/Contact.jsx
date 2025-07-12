import React, { useState } from "react";
import ContactList from "./ContactList.jsx";
import Styles from "./Contact.module.css";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    Name: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
    if (
      !contact.Name ||
      !contact.LastName ||
      !contact.Email ||
      !contact.PhoneNumber
    ) {
      setAlert("لطفا مقدار معتبری وارد کنید!");
      return;
    }
    setAlert("");
    setContacts((contacts) => [...contacts, contact]);
    setContact({
      Name: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
    });
  };

  return (
    <div>
      <div className={Styles["parent-input"]}>
        <div>{alert && <p>{alert}</p>}</div>

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
            name="PhoneNumber"
            value={contact.PhoneNumber}
            onChange={changeHandler}
          />
        </div>

        <button onClick={addHandler}>افزودن مخاطب</button>
      </div>
      <ContactList contacts={contacts} />
    </div>
  );
}

export default Contact;
