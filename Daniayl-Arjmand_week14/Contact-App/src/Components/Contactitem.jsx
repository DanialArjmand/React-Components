import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Contactitem.module.css";
import img from "../images/no-entry-symbol-svgrepo-com (1).svg";

function Contactitem({
  data: { id, Name, LastName, Email, Phone, Gender },
  deleteHandler,
  editHandler,
}) {
  return (
    <div className={Styles["list-item"]}>
      <li key={id} className={Styles["row"]}>
        <p className={Styles["name-last"]}>
          <FontAwesomeIcon icon={faUser} className={Styles["icon"]} />
          {Name} {LastName}
        </p>
        <p className={Styles["email"]}>
          <FontAwesomeIcon icon={faEnvelope} className={Styles["icon"]} />
          {Email}
        </p>
        <p className={Styles["number"]}>
          <FontAwesomeIcon icon={faPhone} className={Styles["icon"]} />
          {Phone}
        </p>
        <p className={Styles["gender"]}>{Gender}</p>
        <button onClick={() => editHandler(id)}>ویرایش</button>
        <button className={Styles["delete"]} onClick={() => deleteHandler(id)}>
          <img src={img} alt="حذف" />
        </button>
      </li>
    </div>
  );
}

export default Contactitem;
