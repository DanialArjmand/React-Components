import Contactitem from "./Contactitem";
import Styles from "./ContactList.module.css";

function ContactList({ contacts, deleteHandler }) {
  return (
    <div className={Styles["parent-list"]}>
      {contacts.length ? (
        <ul className={Styles["list"]}>
          {contacts.map((contact) => (
            <Contactitem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={Styles["empty"]}>هیچ مخاطبی وجود ندارد!</p>
      )}
    </div>
  );
}

export default ContactList;
