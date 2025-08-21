import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerSchema } from "../schemas/validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import apiClient from "../api/apiConfig";

import "./custom-toast.css";
import UserInput from "../components/UserInput";
import PasswordInput from "../components/PasswordInput";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

const registerUser = async (userData) => {
  const { confirmPassword, ...payload } = userData;
  const { data } = await apiClient.post("/auth/register", payload);
  return data;
};

function RegisterPage() {
  const navigate = useNavigate();
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

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد! اکنون می‌توانید وارد شوید.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-base toast-success",
        progressClassName: "toast-success-progress",
      });
      navigate("/");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ثبت نام</h2>

        {mutation.isError && (
          <p className={styles.errorText} style={{ textAlign: "center" }}>
            {mutation.error.response?.data?.message ||
              "خطایی در ثبت نام رخ داد"}
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

        <button
          type="submit"
          className={styles.buttonLogin}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
        <Link className={styles.linkLogin} to="/">
          حساب کاربری دارید؟
        </Link>
      </form>
    </>
  );
}

export default RegisterPage;
