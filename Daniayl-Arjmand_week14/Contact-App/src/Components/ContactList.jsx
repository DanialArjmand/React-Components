import React from "react";

function ContactList({ contacts, onBack }) {
  return (
    <div>
      <h1>ContactList</h1>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <p>
            {contact.Name} {contact.LastName} - {contact.Email}
          </p>
        </div>
      ))}
      <button className="text-butt" onClick={onBack}>
        صفحه اصلی
      </button>
    </div>
  );
}

export default ContactList;
