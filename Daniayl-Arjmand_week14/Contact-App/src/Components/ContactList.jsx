import React from "react";
import Styles from "./ContactList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTrash,
  faUser,
  faEnvelope,
  faPhone,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faUser} className={Styles["icon-list"]} />
            {contact.Name} {contact.LastName}
          </p>

          <p>
            <FontAwesomeIcon
              icon={faEnvelope}
              className={Styles["icon-list"]}
            />
            {contact.Email}
          </p>

          <p>
            <FontAwesomeIcon icon={faPhone} className={Styles["icon-list"]} />
            {contact.Phone}
          </p>
          <p>
            <FontAwesomeIcon
              icon={faLayerGroup}
              className={Styles["icon-list"]}
            />
            {contact.Category}
          </p>

          <p>{contact.Gender}</p>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
