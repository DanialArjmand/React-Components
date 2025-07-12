import React from "react";

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
        <span></span> {Email}
      </p>
      <p>
        <span></span> {Phone}
      </p>
      <button onClick={() => deleteHandler(id)}>حذف</button>
    </li>
  );
}

export default Contactitem;
