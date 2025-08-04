import React from "react";

const FormActions = ({ onClose }) => {
  return (
    <div className="butt-parent">
      <button className="text-butt-state" type="submit">
        ذخیره
      </button>
      <button className="text-butt-state" type="button" onClick={onClose}>
        برگشت
      </button>
    </div>
  );
};

export default FormActions;
