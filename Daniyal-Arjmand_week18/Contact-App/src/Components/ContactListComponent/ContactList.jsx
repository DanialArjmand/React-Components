import React, { useState } from "react";
import Styles from "./ContactList.module.css";
import { useContacts } from "../../context/Context";
import "../DarkMode.css";

import ContactListHeader from "./ContactListHeader";
import ContactListBody from "./ContactListBody";
import ContactModals from "./ContactModals";

const ContactList = () => {
  const { state, dispatch, deleteContact, deleteMultipleContacts } =
    useContacts();
  const { contacts, darkMode } = state;

  const [modal, setModal] = useState({ isOpen: false, type: "", data: null });
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const backHandler = () => dispatch({ type: "SET_VIEW", payload: "home" });
  const startEditHandler = (contact) =>
    dispatch({ type: "START_EDIT", payload: contact });

  const checkboxChangeHandler = (contactId) => {
    setSelectedIds((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleSelection = () => {
    setSelection(!selection);
    setSelectedIds([]);
  };

  const openModal = (type, data = null) =>
    setModal({ isOpen: true, type, data });
  const closeModal = () => setModal({ isOpen: false, type: "", data: null });

  const confirmDeleteHandler = async () => {
    await deleteContact(modal.data.id);
    closeModal();
    setTimeout(() => openModal("success", "مخاطب با موفقیت حذف شد."), 100);
  };

  const confirmEditHandler = () => {
    startEditHandler(modal.data);
    closeModal();
  };

  const deleteSelectedHandler = async () => {
    setModal({ isOpen: false });
    await deleteMultipleContacts(selectedIds);
    setTimeout(
      () =>
        openModal("success", `${selectedIds.length} مخاطب با موفقیت حذف شدند.`),
      100
    );
    toggleSelection();
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.Name} ${contact.LastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      contact.Email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const modalHandlers = {
    confirmDelete: confirmDeleteHandler,
    confirmEdit: confirmEditHandler,
    deleteSelected: deleteSelectedHandler,
  };

  return (
    <div
      className={`${Styles["Parent-list"]} ${
        darkMode ? Styles["dark-mode-list"] : ""
      }`}
    >
      <ContactListHeader
        search={search}
        onSearchChange={setSearch}
        selection={selection}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelection}
        onBack={backHandler}
        onDeleteMultiple={() => openModal("delete-multiple")}
      />
      <ContactListBody
        contacts={filteredContacts}
        selection={selection}
        selectedIds={selectedIds}
        onCheckboxChange={checkboxChangeHandler}
        onEdit={(contact) => openModal("edit", contact)}
        onDelete={(contact) => openModal("delete", contact)}
      />
      <ContactModals
        modal={modal}
        closeModal={closeModal}
        handlers={modalHandlers}
        selectedIds={selectedIds}
        darkMode={darkMode}
      />
    </div>
  );
};

export default ContactList;
