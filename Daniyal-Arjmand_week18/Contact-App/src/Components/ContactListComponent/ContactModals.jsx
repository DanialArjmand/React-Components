import React from "react";
import Modal from "../Modal";
import Styles from "./ContactList.module.css";

const ContactModals = ({
  modal,
  closeModal,
  handlers,
  selectedIds,
  darkMode,
}) => {
  const { confirmDelete, confirmEdit, deleteSelected } = handlers;

  const modalContent = () => {
    switch (modal.type) {
      case "delete":
        return (
          <>
            <h3>تایید حذف</h3>
            <p>
              آیا از حذف مخاطب "{modal.data.Name} {modal.data.LastName}" مطمئن
              هستید؟
            </p>
            <div className={Styles.modalActions}>
              <button onClick={confirmDelete} className={Styles.confirmButton}>
                بله
              </button>
              <button onClick={closeModal} className={Styles.cancelButton}>
                خیر
              </button>
            </div>
          </>
        );
      case "edit":
        return (
          <>
            <h3>تایید ویرایش</h3>
            <p>
              آیا می‌خواهید مخاطب "{modal.data.Name} {modal.data.LastName}" را
              ویرایش کنید؟
            </p>
            <div className={Styles.modalActions}>
              <button onClick={confirmEdit} className={Styles.confirmButton}>
                بله
              </button>
              <button onClick={closeModal} className={Styles.cancelButton}>
                خیر
              </button>
            </div>
          </>
        );
      case "delete-multiple":
        return (
          <>
            <h3>تایید حذف گروهی</h3>
            <p>آیا از حذف {selectedIds.length} مخاطب انتخاب شده مطمئن هستید؟</p>
            <div className={Styles.modalActions}>
              <button onClick={deleteSelected} className={Styles.confirmButton}>
                بله
              </button>
              <button onClick={closeModal} className={Styles.cancelButton}>
                خیر
              </button>
            </div>
          </>
        );
      case "success":
        return (
          <>
            <h3>عملیات موفقیت آمیز بود</h3>
            <p>{modal.data}</p>
            <div className={Styles.modalActions}>
              <button onClick={closeModal} className={Styles.confirmButton}>
                باشه
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={closeModal}
      type={modal.type}
      darkMode={darkMode}
    >
      {modalContent()}
    </Modal>
  );
};

export default ContactModals;
