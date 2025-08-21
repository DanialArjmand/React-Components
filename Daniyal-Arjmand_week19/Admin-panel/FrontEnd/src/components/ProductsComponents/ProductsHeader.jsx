import { CiLogout } from "react-icons/ci";
import styles from "../../pages/ProductsList.module.css";
import profile from "../../assets/Felix-Vogel-4.svg";
import searchIcon from "../../assets/search-normal.svg";

export function ProductsHeader({
  username,
  logout,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.adminStyles}>
        <button onClick={logout} title="خروج از حساب کاربری">
          <CiLogout className={styles.iconLogout} />
        </button>
        <p>
          {username}
          <span>مدیر</span>
        </p>
        <img src={profile} alt="profile" />
      </div>
      <div className={styles.searchProduct}>
        <input
          type="text"
          placeholder="جستجو کالا"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="searchIcon" />
      </div>
    </header>
  );
}
