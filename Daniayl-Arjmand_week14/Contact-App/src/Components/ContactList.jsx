import React, { useState } from "react";
import Contactitem from "./Contactitem";
import Styles from "./ContactList.module.css";

function ContactList({ contacts, deleteHandler, editHandler }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handlerDelete = (id) => {
    setShowConfirm(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    deleteHandler(deleteId);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className={Styles["parent-list"]}>
      {contacts.length ? (
        <ul className={Styles["list"]}>
          {contacts.map((contact) => (
            <Contactitem
              key={contact.id}
              data={contact}
              deleteHandler={handlerDelete}
              editHandler={editHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={Styles["empty"]}>هیچ مخاطبی وجود ندارد!</p>
      )}

      {showConfirm && (
        <div className={Styles["modal-confirm"]}>
          <div className={Styles["modal-content"]}>
            <p>آیا از حذف این مخاطب مطمئن هستید؟</p>
            <div>
              <button className={Styles["butt-yes"]} onClick={confirmDelete}>
                بله
              </button>
              <button className={Styles["butt-no"]} onClick={cancelDelete}>
                خیر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactList;
