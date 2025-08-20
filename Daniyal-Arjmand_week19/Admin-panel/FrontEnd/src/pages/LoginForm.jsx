import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import { loginSchema } from "../schemas/validationSchemas";
import apiClient from "../api/apiConfig";
import UserInput from "../components/UserInput";
import PasswordInput from "../components/PasswordInput";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

const loginUser = async (credentials) => {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};

const getCustomErrorMessage = (error) => {
  const apiMessage = error?.response?.data?.message || "";

  if (apiMessage.toLowerCase() === "invalid credentials") {
    return "نام کاربری یا رمز عبور وارد شده صحیح نمی‌باشد";
  }

  if (apiMessage.toLowerCase() === "user not found") {
    return "کاربری با این مشخصات یافت نشد";
  }

  return "خطایی رخ داده است. لطفاً دوباره تلاش کنید";
};

function LoginPage() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const decodedToken = jwtDecode(data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", decodedToken.username);
      navigate("/dashboard");
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
        <h2 className={styles.textLogin}>فرم ورود</h2>

        <div className={styles.errorContainer}>
          {mutation.isError && (
            <p className={styles.errorText} style={{ textAlign: "center" }}>
              {getCustomErrorMessage(mutation.error)}
            </p>
          )}
        </div>

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
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "در حال ورود..." : "ورود"}
        </button>
        <Link className={styles.linkLogin} to="/register">
          !ایجاد حساب کاربری
        </Link>
      </form>
    </>
  );
}

export default LoginPage;
