import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";

function Header() {
  return (
    <>
      <div>
        <div>
          <FontAwesomeIcon icon={faUserRegular} />
          مخاطبین
        </div>
        <div>
          <button>+</button>
        </div>
      </div>
    </>
  );
}

export default Header;
