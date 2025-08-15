import styles from "./ProductsList.module.css";
import searchIcon from "../assets/search-normal.svg";
import profile from "../assets/Felix-Vogel-4.svg";

function ProductsList() {
  return (
    <div className={styles.form}>
      <header className={styles.header}>
        <div className={styles.adminStyles}>
          <p>میلاد عظمی</p>
          <img src={profile} alt="" />
        </div>
        <div className={styles.searchProduct}>
          <input type="text" placeholder="جستجو کالا" />
          <img src={searchIcon} alt="searchIcon" />
        </div>
      </header>

      <main>
        <div>
          <h2>مدیریت کالا</h2>
          <button>افزودن محصول</button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ProductsList;
