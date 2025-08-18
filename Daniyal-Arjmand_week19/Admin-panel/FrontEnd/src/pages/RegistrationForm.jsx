import { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { registerSchema } from "../schemas/validationSchemas";
import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log("Form is valid, submitting...", formData);
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <form className={styles.formLogin} onSubmit={handleSubmit}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ثبت نام</h2>

        <input
          className={`${styles.inputLogin} ${
            errors.username ? styles.inputError : ""
          }`}
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={handleChange}
        />
        <div className={styles.errorContainer}>
          {errors.username && (
            <p className={styles.errorText}>{errors.username}</p>
          )}
        </div>

        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.inputLogin} ${
              errors.password ? styles.inputError : ""
            }`}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="رمز عبور"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <div className={styles.errorContainer}>
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>

        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.inputLogin} ${
              errors.confirmPassword ? styles.inputError : ""
            }`}
            type={isConfirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="تکرار رمز عبور"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </button>
        </div>
        <div className={styles.errorContainer}>
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className={styles.buttonLogin}>
          ثبت نام
        </button>
        <Link className={styles.linkLogin} to="/">
          حساب کاربری دارید؟
        </Link>
      </form>
    </>
  );
}

export default RegisterPage;
