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
        <a className={styles.linkLogin} href="">
          حساب کاربری دارید؟
        </a>
      </div>
    </>
  );
}

export default RegisterPage;
