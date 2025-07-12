import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';


function Contactitem({
  data: { id, Name, LastName, Email, Phone },
  deleteHandler,
}) {
  return (
    <li key={id}>
      <p>
        {Name} {LastName}
      </p>
      <p>
        <span>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        {Email}
      </p>
      <p>
        <span></span> {Phone}
      </p>
      <button onClick={() => deleteHandler(id)}>حذف</button>
    </li>
  );
}

export default Contactitem;
