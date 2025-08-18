import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../pages/LoginForm.module.css"

const PasswordInput = ({
  name,
  placeholder,
  register,
  errors,
  isVisible,
  toggleVisibility,
}) => {
  return (
    <>
      <div className={styles.passwordWrapper}>
        <input
          className={`${styles.inputLogin} ${
            errors[name] ? styles.inputError : ""
          }`}
          type={isVisible ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          {...register(name)}
        />
        <button
          type="button"
          className={styles.togglePasswordBtn}
          onClick={toggleVisibility}
        >
          {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <div className={styles.errorContainer}>
        {errors[name] && (
          <p className={styles.errorText}>{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export default PasswordInput;
