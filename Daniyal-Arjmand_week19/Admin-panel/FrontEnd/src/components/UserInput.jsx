import React from "react";
import styles from "../pages/LoginForm.module.css"

const Input = ({ name, placeholder, register, errors }) => {
  return (
    <>
      <input dir="rtl"
        className={`${styles.inputLogin} ${
          errors[name] ? styles.inputError : ""
        }`}
        type="text"
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
      <div className={styles.errorContainer}>
        {errors[name] && (
          <p className={styles.errorText}>{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export default Input;
