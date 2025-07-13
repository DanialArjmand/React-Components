import { useState } from "react";
import Header from "./Components/Header.jsx";
import Contact from "./Components/Contact.jsx";
import ContactList from "./Components/ContactList.jsx";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const addContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  return (
    <>
      {!showModal && (
        <Header
          onOpenModal={() => setShowModal(true)}
          contacts={contacts}
          deleteHandler={(id) =>
            setContacts(contacts.filter((c) => c.id !== id))
          }
        />
      )}

      {showModal && (
        <Contact
          addContact={addContact}
          onCloseModal={() => setShowModal(false)}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </>
  );
}

export default App;
