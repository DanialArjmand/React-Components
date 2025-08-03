import React from "react";
import Styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={Styles.backdrop} onClick={onClose}>
      <div className={Styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.errorMeseage}>
          <div className={Styles.circleError}>
            <FontAwesomeIcon
              icon={faExclamation}
              className={Styles.checkmarkError}
            />
            <div className={Styles.circleBack}></div>
            <div className={Styles.circleBack}></div>
            <div className={Styles.circleBack}></div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
