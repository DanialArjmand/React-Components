import React, { useState } from "react";

function Contact() {
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
    console.log(contact);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="نام"
          name="Name"
          value={contact.Name}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="نام خانوادگی"
          name="LastName"
          value={contact.LastName}
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="ایمیل"
          name="Email"
          value={contact.Email}
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="شماره تلفن"
          name="PhoneNumber"
          value={contact.PhoneNumber}
          onChange={changeHandler}
        />
        <button onClick={addHandler}>افزودن مخاطب</button>
      </div>
    </div>
  );
}

export default Contact;
