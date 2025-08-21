import BaseModal from "./BaseModal";
import stylesModal from "./DeleteModal.module.css";
import closeIcon from "../../assets/Close.svg";

function DeleteModal({ isOpen, onClose, onConfirm, title, isSubmitting }) {
  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      backdropClass={stylesModal.backgroundParent}
      panelClass={stylesModal.deleteForm}
    >
      <img src={closeIcon} alt="closeIcon" />
      <p>{title}</p>
      <div className={stylesModal.buttonStatus}>
        <button className={stylesModal.buttonCancel} onClick={onClose}>
          لغو
        </button>
        <button
          className={stylesModal.buttonDelete}
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال حذف..." : "حذف"}
        </button>
      </div>
    </BaseModal>
  );
}
export default DeleteModal;
