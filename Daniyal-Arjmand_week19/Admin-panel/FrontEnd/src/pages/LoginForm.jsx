import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/Union.svg";
import styles from "./LoginForm.module.css";

function LoginPage() {
  const navigate = useNavigate();

  const loginClickHandler = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <h2 className={styles.headerText}>بوت کمپ بوتواستارت</h2>
      <div className={styles.formLogin}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2 className={styles.textLogin}>فرم ورود</h2>
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
        <button className={styles.buttonLogin} onClick={loginClickHandler}>ورود</button>
        <Link className={styles.linkLogin} to="/register">
          !ایجاد حساب کاربری
        </Link>
      </div>
    </>
  );
}

export default LoginPage;
