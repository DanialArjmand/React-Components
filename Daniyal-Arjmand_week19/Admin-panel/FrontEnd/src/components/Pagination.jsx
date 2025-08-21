import styles from "../pages/ProductsList.module.css";
import { generatePageNumbers } from "../utils/paginationUtils";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = generatePageNumbers(currentPage, totalPages);
  const formatter = new Intl.NumberFormat("fa-IR");

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={currentPage === page ? styles.activePage : ""}
            onClick={() => onPageChange(page)}
          >
            {formatter.format(page)}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
