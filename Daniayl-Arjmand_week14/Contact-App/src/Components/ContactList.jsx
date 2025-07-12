import Contactitem from "./Contactitem";
import Styles from "./ContactList.module.css"

function ContactList({ contacts, deleteHandler }) {
  return (
    <div className={Styles["parent-list"]}>
      <h3>Contact List</h3>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <Contactitem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
            />
          ))}
        </ul>
      ) : (
        <p>هیج مخاطبی وجود نداره!</p>
      )}
    </div>
  );
}

export default ContactList;
