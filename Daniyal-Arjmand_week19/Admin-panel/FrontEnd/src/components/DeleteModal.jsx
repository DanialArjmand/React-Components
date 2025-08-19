import stylesModal from "./DeleteModal.module.css";
import closeIcon from "../assets/Close.svg";

function DeleteModal({ isOpen, onClose, onConfirm, product, isSubmitting }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={stylesModal.backgroundParent}>
      <div className={stylesModal.deleteForm}>
        <img src={closeIcon} alt="closeIcon" />
        <p>
          آیا از حذف محصول <span>{product.name}</span> مطمئن هستید؟
        </p>
        <div className={stylesModal.buttonStatus}>
          <button className={stylesModal.buttonCancel} onClick={onClose}>
            لغو
          </button>
          <button
            className={`${stylesModal.buttonDelete} ${stylesModal.buttonDelete}`}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
