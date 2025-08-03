import React from "react";
import Styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, children, onClose, type = "default" }) => {
  if (!isOpen) return null;

  const icon = type === "success" ? faCheck : faExclamation;

  const typeStyles = {
    success: {
      container: Styles.errorMeseageSuccess,
      iconWrapper: Styles.circleSuccess,
      icon: Styles.checkmarkSuccess,
      circle: Styles.circleBackSuccess,
    },
    delete: {
      container: Styles.errorMeseageDelete,
      iconWrapper: Styles.circleDelete,
      icon: Styles.checkmarkDelete,
      circle: Styles.circleBackDelete,
    },
    default: {
      container: Styles.errorMeseage,
      iconWrapper: Styles.circleError,
      icon: Styles.checkmarkError,
      circle: Styles.circleBack,
    },
  };

  const current = typeStyles[type] || typeStyles.default;

  return (
    <div className={Styles.backdrop} onClick={onClose}>
      <div className={Styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={current.container}>
          <div className={current.iconWrapper}>
            <FontAwesomeIcon icon={icon} className={current.icon} />
            <div className={current.circle}></div>
            <div className={current.circle}></div>
            <div className={current.circle}></div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
