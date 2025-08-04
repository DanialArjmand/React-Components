import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const InputField = ({
  name,
  label,
  register,
  errors,
  watch,
  isSubmitted,
  ...inputProps
}) => {
  const hasError = errors[name];
  const hasValue = watch(name);

  return (
    <div className="input-wrapper">
      <div className={`inputs ${hasError ? "inputs-error" : ""}`}>
        <label>{label} :</label>
        <div className="input-container">
          <input
            {...register(name)}
            {...inputProps}
            className={hasError ? "input-error" : ""}
          />
          {isSubmitted &&
            (hasError ? (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="icon error-icon"
              />
            ) : (
              hasValue && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="icon success-icon"
                />
              )
            ))}
        </div>
      </div>
      {hasError && <p className="error-text">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;
