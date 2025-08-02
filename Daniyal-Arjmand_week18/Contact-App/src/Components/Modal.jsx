import React from "react";
import Styles from "./Modal.module.css";

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={Styles.backdrop} onClick={onClose}>
      <div className={Styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;