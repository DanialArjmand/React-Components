import React from "react";

function ContactList({ contacts }) {
  return (
    <div>
      <h1>ContactList</h1>
      {contacts.map((contact, index) => (
        <div key={index}>
          <p>
            {contact.Name} {contact.LastName} - {contact.Email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
