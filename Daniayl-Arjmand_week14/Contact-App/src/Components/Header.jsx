import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import Sidebar from "./Sidebar";
import ContactList from "./ContactList.jsx";

function Header() {
  return (
    <>
      <div className={styles["header-root"]}>
        <Sidebar />
        <div className={styles.header}>
          <div className={styles["contact-text"]}>
            <FontAwesomeIcon icon={faUserRegular} className={styles.svg} />
            مخاطبین
          </div>
          <div className={styles.plusButt}>
            <button>+</button>
          </div>
        </div>
      </div>
      <ContactList contacts={contacts} />
    </>
  );
}

export default Header;
