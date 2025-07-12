import Contactitem from "./Contactitem";

function ContactList({ contacts }) {
  console.log(contacts);
  return (
    <div>
      <h3>Contact List</h3>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <Contactitem key={contact.id} data={contact} />
          ))}
        </ul>
      ) : (
        <p>هیج مخاطبی وجود نداره!</p>
      )}
    </div>
  );
}

export default ContactList;
