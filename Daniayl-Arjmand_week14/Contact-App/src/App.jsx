import React, { useState } from "react";
import Header from "./Components/Header.jsx";
import Contact from "./Components/Contact.jsx";
import ContactList from "./Components/ContactList.jsx";
import styles from "./Components/Header.module.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const deleteHandler = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <Header onAddContactClick={() => setShowModal(true)} />

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              بستن
            </button>
            <Contact
              contacts={contacts}
              setContacts={setContacts}
              closeModal={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      <ContactList contacts={contacts} deleteHandler={deleteHandler} />
    </div>
  );
}

export default App;
