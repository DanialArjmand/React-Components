import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/validationSchemas";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    //   try {
    //     const response = await fetch('your-backend-api/login', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(formData),
    //     });

    //     if (response.ok) {
    //       navigate("/dashboard");
    //     } else {
    //       const errorData = await response.json();
    //       if (response.status === 401 || response.status === 400) {
    //         setServerError("نام کاربری یا رمز عبور اشتباه است.");
    //       } else if (response.status === 429) {
    //         setServerError("به دلیل چندین تلاش ناموفق، ورود شما به مدت ۵ دقیقه مسدود شده است.");
    //       } else {
    //         setServerError("خطایی در سیستم رخ داده است. لطفاً دوباره تلاش کنید.");
    //       }
    //     }

    //     console.log("Login successful!", formData);
    //     navigate("/dashboard");
    //   } catch (networkError) {
    //     setServerError("امکان اتصال به سرور وجود ندارد. لطفاً بعداً تلاش کنید.");
    //   }
  };

  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <form className={styles.formLogin} onSubmit={submitHandler}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ورود</h2>

        {serverError && (
          <p className={styles.errorText} style={{ textAlign: "center" }}>
            {serverError}
          </p>
        )}

        <input
          className={`${styles.inputLogin} ${
            errors.username ? styles.inputError : ""
          }`}
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={changeHandler}
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
            onChange={changeHandler}
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

        <button type="submit" className={styles.buttonLogin}>
          ورود
        </button>
        <Link className={styles.linkLogin} to="/register">
          !ایجاد حساب کاربری
        </Link>
      </form>
    </>
  );
}

export default LoginPage;
