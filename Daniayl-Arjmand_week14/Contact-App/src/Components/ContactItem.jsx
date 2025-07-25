import React, { useState } from "react";
import Inputs from "./Inputs";
import ContactList from "./ContactList";

function ContactItem() {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  return (
    <div>
      <h1>ContactItem</h1>
      <Inputs onSave={addContactHandler} />
      <hr />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default ContactItem;
