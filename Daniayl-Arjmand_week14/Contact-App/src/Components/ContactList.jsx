import React from "react";
import Styles from "./ContactList.module.css";

function ContactList({ contacts, onBack }) {
  return (
    <div className={Styles["Parent-list"]}>
      <div className={Styles["title"]}>
        <h1>لیست مخاطبین</h1>
        <button className="text-butt" onClick={onBack}>
          صفحه اصلی
        </button>
      </div>
      {contacts.map((contact) => (
        <div key={contact.id} className={Styles["item"]}>
          <p>
            {contact.Name} {contact.LastName}
          </p>
          <p>{contact.Email}</p>
          <p>{contact.Phone}</p>
          <p>{contact.Category}</p>
          <p>{contact.Gender}</p>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
