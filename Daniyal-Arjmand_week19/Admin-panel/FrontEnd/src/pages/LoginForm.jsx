import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/validationSchemas";

import UserInput from "../components/UserInput";
import PasswordInput from "../components/PasswordInput";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    setIsLoading(true);

    try {
      console.log("اطلاعات ورود معتبر است و به سرور ارسال می‌شود:", data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/dashboard");
    } catch (error) {
      console.error("ورود ناموفق بود:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ورود</h2>

        {serverError && (
          <p className={styles.errorText} style={{ textAlign: "center" }}>
            {serverError}
          </p>
        )}

        <UserInput
          name="username"
          placeholder="نام کاربری"
          register={register}
          errors={errors}
        />

        <PasswordInput
          name="password"
          placeholder="رمز عبور"
          register={register}
          errors={errors}
          isVisible={isPasswordVisible}
          toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
        />

        <button
          type="submit"
          className={styles.buttonLogin}
          disabled={isLoading}
        >
          {isLoading ? "در حال ورود..." : "ورود"}
        </button>
        <Link className={styles.linkLogin} to="/register">
          !ایجاد حساب کاربری
        </Link>
      </form>
    </>
  );
}

export default LoginPage;
