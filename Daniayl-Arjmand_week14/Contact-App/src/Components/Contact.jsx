import React, { useState } from "react";
import ContactList from "./ContactList.jsx";
import Styles from "./Contact.module.css";
// import input from "../Constants/input.js";
import { v4 } from "uuid";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
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
      !contact.Phone
    ) {
      setAlert("لطفا مقدار معتبری وارد کنید!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      Name: "",
      LastName: "",
      Email: "",
      Phone: "",
    });
  };

  return (
    <div>
      <div className={Styles["parent-input"]}>
        {/* {input.map((input, index) => (
          <input
            key={index}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))} */}
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
            name="Phone"
            value={contact.Phone}
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
