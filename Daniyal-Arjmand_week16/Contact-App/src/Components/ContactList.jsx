import React, { useState } from "react";
import Styles from "./ContactList.module.css";
import { useContacts } from "../API/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTrash,
  faUser,
  faEnvelope,
  faPhone,
  faLayerGroup,
  faPenToSquare,
  faList,
  faCheck,
  faExclamation,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const ContactList = () => {
  const { state, dispatch } = useContacts();
  const { contacts } = state;

  const [modal, setModal] = useState({ isOpen: false, type: "", data: null });
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const backHandler = () => dispatch({ type: "SET_VIEW", payload: "home" });
  const startEditHandler = (contact) =>
    dispatch({ type: "START_EDIT", payload: contact });
  const deleteHandler = (contactId) =>
    dispatch({ type: "DELETE_CONTACT", payload: contactId });
  const deleteMultipleHandler = (contactIds) =>
    dispatch({ type: "DELETE_MULTIPLE_CONTACTS", payload: contactIds });

  const checkboxChangeHandler = (contactId) => {
    setSelectedIds((prevIds) => {
      return prevIds.includes(contactId)
        ? prevIds.filter((id) => id !== contactId)
        : [...prevIds, contactId];
    });
  };

  const toggleSelection = () => {
    setSelection(!selection);
    setSelectedIds([]);
  };

  const deleteSelectedHandler = () => {
    deleteMultipleHandler(selectedIds);
    setModal({
      isOpen: true,
      type: "success",
      data: `${selectedIds.length} مخاطب با موفقیت حذف شدند.`,
    });
    toggleSelection();
  };

  const confirmDeleteHandler = () => {
    deleteHandler(modal.data.id);
    setModal({ isOpen: false });

    setTimeout(
      () =>
        setModal({
          isOpen: true,
          type: "success",
          data: "مخاطب با موفقیت حذف شد.",
        }),
      100
    );
  };

  const confirmEditHandler = () => {
    startEditHandler(modal.data);
    setModal({ isOpen: false });
  };

  const modalContent = () => {
    if (modal.type === "delete") {
      return (
        <>
          <h3>تایید حذف</h3>
          <p>
            آیا از حذف مخاطب "{modal.data.Name} {modal.data.LastName}" مطمئن
            هستید؟
          </p>
          <div className={Styles.modalActions}>
            <button
              onClick={confirmDeleteHandler}
              className={Styles.confirmButton}
            >
              بله
            </button>
            <button
              onClick={() => setModal({ isOpen: false })}
              className={Styles.cancelButton}
            >
              خیر
            </button>
          </div>
        </>
      );
    }
    if (modal.type === "edit") {
      return (
        <>
          <h3>تایید ویرایش</h3>
          <p>
            آیا می‌خواهید مخاطب "{modal.data.Name} {modal.data.LastName}" را
            ویرایش کنید؟
          </p>
          <div className={Styles.modalActions}>
            <button
              onClick={confirmEditHandler}
              className={Styles.confirmButton}
            >
              بله
            </button>
            <button
              onClick={() => setModal({ isOpen: false })}
              className={Styles.cancelButton}
            >
              خیر
            </button>
          </div>
        </>
      );
    }
    if (modal.type === "delete-multiple") {
      return (
        <>
          <h3>تایید حذف گروهی</h3>
          <p>آیا از حذف {selectedIds.length} مخاطب انتخاب شده مطمئن هستید؟</p>
          <div className={Styles.modalActions}>
            <button
              onClick={deleteSelectedHandler}
              className={Styles.confirmButton}
            >
              بله
            </button>
            <button
              onClick={() => setModal({ isOpen: false })}
              className={Styles.cancelButton}
            >
              خیر
            </button>
          </div>
        </>
      );
    }
    if (modal.type === "success") {
      return (
        <>
          <h3>عملیات موفقیت آمیز بود</h3>
          <p>{modal.data}</p>
          <div className={Styles.modalActions}>
            <button
              onClick={() => setModal({ isOpen: false })}
              className={Styles.confirmButton}
            >
              باشه
            </button>
          </div>
        </>
      );
    }
    return null;
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.Name} ${contact.LastName}`.toLowerCase();
    const email = contact.Email.toLowerCase();
    const term = search.toLowerCase();

    return fullName.includes(term) || email.includes(term);
  });

  return (
    <div className={Styles["Parent-list"]}>
      <div className={Styles["title"]}>
        <h1>لیست مخاطبین</h1>

        <input
          type="search"
          placeholder="جستجو بر اساس نام یا ایمیل..."
          className={Styles.searchInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className={Styles["button-container"]}>
          {selection ? (
            <>
              <button
                onClick={() =>
                  setModal({ isOpen: true, type: "delete-multiple" })
                }
                disabled={selectedIds.length === 0}
                className={Styles.deleteSelectedButton}
              >
                حذف ({selectedIds.length})
              </button>
              <button onClick={toggleSelection} className={Styles.cancelButton}>
                <FontAwesomeIcon icon={faTimes} /> لغو
              </button>
            </>
          ) : (
            <>
              <button
                className={Styles["trash-butt"]}
                onClick={toggleSelection}
              >
                <span className={Styles["label-butt"]}> حذف گروهی </span>
                <FontAwesomeIcon
                  icon={faList}
                  className={Styles["icon-trash"]}
                />
              </button>
              <button className={Styles["home-butt"]} onClick={backHandler}>
                <span className={Styles["label-butt"]}> صفحه اصلی </span>
                <FontAwesomeIcon
                  icon={faHouse}
                  className={Styles["icon-house"]}
                />
              </button>
            </>
          )}
        </div>
      </div>

      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact, index) => {
          const selected = selectedIds.includes(contact.id);
          return (
            <div
              key={contact.id}
              className={`${Styles.item} ${
                selected ? Styles.selectedItem : ""
              }`}
            >
              {selection && (
                <input
                  type="checkbox"
                  className={Styles.checkbox}
                  checked={selected}
                  onChange={() => checkboxChangeHandler(contact.id)}
                />
              )}

              <p className={Styles.rowIndex}>{index + 1}</p>

              <p>
                <FontAwesomeIcon
                  icon={faUser}
                  className={Styles["icon-list"]}
                />
                {contact.Name} {contact.LastName}
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={Styles["icon-list"]}
                />
                {contact.Email}
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faPhone}
                  className={Styles["icon-list"]}
                />
                {contact.Phone}
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className={Styles["icon-list"]}
                />
                {contact.Category}
              </p>
              <p>{contact.Gender}</p>

              {!selection && (
                <div className={Styles.itemActions}>
                  <button
                    onClick={() =>
                      setModal({ isOpen: true, type: "edit", data: contact })
                    }
                    className={Styles.actionButton}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        type: "delete",
                        data: contact,
                      })
                    }
                    className={`${Styles.actionButton} ${Styles.deleteButton}`}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className={Styles.noContactsMessage}>
          <p>مخاطبی یافت نشد.</p>
        </div>
      )}

      <Modal isOpen={modal.isOpen} onClose={() => setModal({ isOpen: false })}>
        {modalContent()}
      </Modal>
    </div>
  );
};

export default ContactList;
