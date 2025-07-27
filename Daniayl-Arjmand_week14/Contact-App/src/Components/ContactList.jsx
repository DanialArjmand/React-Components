import React, { useState } from "react";
import Styles from "./ContactList.module.css";
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
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

function ContactList({ contacts, onBack, onEdit, onDelete }) {
  const [modal, setModal] = useState({ isOpen: false, type: "", data: null });
  const [search, setSearch] = useState("");

  const confirmDeleteHandler = () => {
    onDelete(modal.data.id);
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
    onEdit(modal.data);
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
    const phone = contact.Phone.toLowerCase();
    const term = search.toLowerCase();

    return fullName.includes(term) || phone.includes(term);
  });

  return (
    <div className={Styles["Parent-list"]}>
      <div className={Styles["title"]}>
        <h1>لیست مخاطبین</h1>

        <input
          type="search"
          placeholder="جستجو بر اساس نام یا شماره تلفن..."
          className={Styles.searchInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className={Styles["button-container"]}>
          <button className={Styles["trash-butt"]}>
            <span className={Styles["label-butt"]}> حذف گروهی </span>
            <FontAwesomeIcon icon={faList} className={Styles["icon-trash"]} />
          </button>
          <button className={Styles["home-butt"]} onClick={onBack}>
            <span className={Styles["label-butt"]}> صفحه اصلی </span>
            <FontAwesomeIcon icon={faHouse} className={Styles["icon-house"]} />
          </button>
        </div>
      </div>

      {filteredContacts.map((contact) => (
        <div key={contact.id} className={Styles["item"]}>
          <p>
            <FontAwesomeIcon icon={faUser} className={Styles["icon-list"]} />
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
            <FontAwesomeIcon icon={faPhone} className={Styles["icon-list"]} />
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
                setModal({ isOpen: true, type: "delete", data: contact })
              }
              className={`${Styles.actionButton} ${Styles.deleteButton}`}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      <Modal isOpen={modal.isOpen} onClose={() => setModal({ isOpen: false })}>
        {modalContent()}
      </Modal>
    </div>
  );
}

export default ContactList;
