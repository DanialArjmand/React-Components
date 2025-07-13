import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Styles from "./Contactitem.module.css";
import img from '../images/no-entry-symbol-svgrepo-com (1).svg'

function Contactitem({
  data: { id, Name, LastName, Email, Phone, Gender },
  deleteHandler,
}) {
  return (
    <div className={Styles["list-item"]}>
      <li key={id} className={Styles["row"]}>
        <p className={Styles["name-last"]}>
          {Name} {LastName}
        </p>
        <p className={Styles["email"]}>
          <FontAwesomeIcon icon={faEnvelope} className={Styles["icon"]} />
          {Email}
        </p>
        <p className={Styles["number"]}>{Phone}</p>
        <p className={Styles["gender"]}>{Gender}</p>
        <button className={Styles["delete"]} onClick={() => deleteHandler(id)}>
          <img src={img} alt="" />
        </button>
      </li>
    </div>
  );
}

export default Contactitem;
