import styles from "../pages/ProductsList.module.css";

const Pagination = ({
  totalPages,
  pageNumbersToDisplay,
  currentPage,
  setCurrentPage,
  prevPageHandler,
  nextPageHandler,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      {totalPages > 3 && (
        <button onClick={prevPageHandler} disabled={currentPage === 1}>
          {"<<"}
        </button>
      )}
      {pageNumbersToDisplay.map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => setCurrentPage(item)}
            className={currentPage === item ? styles.activePage : ""}
          >
            {new Intl.NumberFormat("fa-IR").format(item)}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            ...
          </span>
        )
      )}
      {totalPages > 3 && (
        <button onClick={nextPageHandler} disabled={currentPage === totalPages}>
          {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
