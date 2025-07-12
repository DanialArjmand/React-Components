import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import Sidebar from "./Sidebar";
import ContactList from "./ContactList"; // یادت نره ایمپورت کنی

function Header({ onOpenModal, contacts, deleteHandler }) {
  return (
    <div className={styles["header-root"]}>
      <Sidebar />
      <div className={styles.header}>
        <div className={styles["secend-child"]}>
          <div className={styles["contact-text"]}>
            <FontAwesomeIcon icon={faUserRegular} className={styles.svg} />
            مخاطبین
          </div>
          <div className={styles.plusButt}>
            <button onClick={onOpenModal}>+</button>
          </div>
        </div>

        <div>
          <ContactList contacts={contacts} deleteHandler={deleteHandler} />
        </div>
      </div>
    </div>
  );
}

export default Header;
