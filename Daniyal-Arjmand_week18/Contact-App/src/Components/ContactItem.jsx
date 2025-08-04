import React from "react";
import Styles from "./ContactList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faUser,
  faEnvelope,
  faPhone,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const ContactItem = ({
  contact,
  index,
  selection,
  selected,
  onCheckboxChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`${Styles.item} ${selected ? Styles.selectedItem : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {selection && (
        <input
          type="checkbox"
          className={Styles.checkbox}
          checked={selected}
          onChange={() => onCheckboxChange(contact.id)}
        />
      )}
      <p className={Styles.rowIndex}>{index + 1}</p>
      <p>
        <FontAwesomeIcon icon={faUser} className={Styles["icon-list"]} />
        {contact.Name} {contact.LastName}
      </p>
      <p>
        <FontAwesomeIcon icon={faEnvelope} className={Styles["icon-list"]} />
        {contact.Email}
      </p>
      <p>
        <FontAwesomeIcon icon={faPhone} className={Styles["icon-list"]} />
        {contact.Phone}
      </p>
      <p>
        <FontAwesomeIcon icon={faLayerGroup} className={Styles["icon-list"]} />
        {contact.Category}
      </p>
      <p>{contact.Gender}</p>
      {!selection && (
        <div className={Styles.itemActions}>
          <button
            onClick={() => onEdit(contact)}
            className={Styles.actionButton}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            onClick={() => onDelete(contact)}
            className={`${Styles.actionButton} ${Styles.deleteButton}`}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactItem;
