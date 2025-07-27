import React from "react";
import Styles from "./ContactList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTrash } from "@fortawesome/free-solid-svg-icons";

function ContactList({ contacts, onBack }) {
  return (
    <div className={Styles["Parent-list"]}>
      <div className={Styles["title"]}>
        <h1>لیست مخاطبین</h1>
        <div className={Styles["button-container"]}>
          <button className={Styles["trash-butt"]}>
            <span className={Styles["label-butt"]}> حذف گروهی </span>
            <FontAwesomeIcon icon={faTrash} className={Styles["icon-trash"]} />
          </button>
          <button className={Styles["home-butt"]} onClick={onBack}>
            <span className={Styles["label-butt"]}> صفحه اصلی </span>
            <FontAwesomeIcon icon={faHouse} className={Styles["icon-house"]} />
          </button>
        </div>
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
