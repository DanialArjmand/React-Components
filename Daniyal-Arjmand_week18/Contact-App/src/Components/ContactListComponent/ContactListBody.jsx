import React from "react";
import Styles from "./ContactList.module.css";
import ContactItem from "./ContactItem";

const ContactListBody = ({
  contacts,
  selection,
  selectedIds,
  onCheckboxChange,
  onEdit,
  onDelete,
}) => {
  if (contacts.length === 0) {
    return (
      <div className={Styles.noContactsMessage}>
        <p>مخاطبی یافت نشد.</p>
      </div>
    );
  }

  return (
    <>
      {contacts.map((contact, index) => (
        <ContactItem
          key={contact.id || index}
          contact={contact}
          index={index}
          selection={selection}
          selected={selectedIds.includes(contact.id)}
          onCheckboxChange={onCheckboxChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default ContactListBody;
