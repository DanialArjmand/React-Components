import styles from "../pages/ProductsList.module.css";
import { generatePageNumbers } from "../utils/paginationUtils";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const prevHandler = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      {totalPages > 3 && (
        <button onClick={prevHandler} disabled={currentPage === 1}>
          {"<<"}
        </button>
      )}
      {pageNumbers.map((number, index) =>
        typeof number === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? styles.activePage : ""}
          >
            {new Intl.NumberFormat("fa-IR").format(number)}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            ...
          </span>
        )
      )}
      {totalPages > 3 && (
        <button onClick={nextHandler} disabled={currentPage === totalPages}>
          {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
