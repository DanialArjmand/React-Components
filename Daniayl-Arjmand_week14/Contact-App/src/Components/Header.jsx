import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import Sidebar from "./Sidebar";

function Header({ onAddContactClick }) {
  return (
    <div className={styles["header-root"]}>
      <Sidebar />
      <div className={styles.header}>
        <div className={styles["contact-text"]}>
          <FontAwesomeIcon icon={faUserRegular} className={styles.svg} />
          مخاطبین
        </div>
        <div className={styles.plusButt}>
          <button onClick={onAddContactClick}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
