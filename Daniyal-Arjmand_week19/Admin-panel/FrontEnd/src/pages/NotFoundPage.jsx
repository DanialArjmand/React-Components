import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>صفحه مورد نظر یافت نشد</p>
      <Link to="/" className={styles.link}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFoundPage;
