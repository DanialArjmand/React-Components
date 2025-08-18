import { useState } from "react";
import { Link } from "react-router-dom";
import { registerSchema } from "../schemas/validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import UserInput from "../components/UserInput";
import PasswordInput from "../components/PasswordInput";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const onSubmit = (data) => {
    console.log("Form is valid, submitting...", data);
  };

  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ثبت نام</h2>

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

        <PasswordInput
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          register={register}
          errors={errors}
          isVisible={isConfirmPasswordVisible}
          toggleVisibility={() =>
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
          }
        />

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
