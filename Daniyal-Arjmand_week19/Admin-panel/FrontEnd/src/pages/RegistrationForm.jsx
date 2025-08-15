import { Link } from "react-router-dom";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

function RegisterPage() {
  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <div className={styles.formLogin}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ثبت نام</h2>
        <input
          className={styles.inputLogin}
          type="text"
          placeholder="نام کاربری"
        />
        <input
          className={styles.inputLogin}
          type="password"
          placeholder="رمز عبور"
        />
        <input
          className={styles.inputLogin}
          type="password"
          placeholder="تکرار رمز عبور"
        />
        <button className={styles.buttonLogin}>ثبت نام</button>
        <Link className={styles.linkLogin} to="/">
          حساب کاربری دارید؟
        </Link>
      </div>
    </>
  );
}

export default RegisterPage;
