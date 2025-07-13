import { useState } from "react";
import Header from "./Components/Header.jsx";
import Contact from "./Components/Contact.jsx";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingContactId, setEditingContactId] = useState(null);

  const addContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const deleteHandler = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const editHandler = (id) => {
    setEditingContactId(id);
    setShowModal(true);
  };

  const updateContact = (updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingContactId(null);
  };

  return (
    <>
      {!showModal && (
        <Header
          onOpenModal={() => setShowModal(true)}
          contacts={contacts}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      )}

      {showModal && (
        <Contact
          addContact={addContact}
          updateContact={updateContact}
          editingContact={contacts.find((c) => c.id === editingContactId)}
          onCloseModal={closeModal}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </>
  );
}

export default App;
