import styles from "../pages/ProductsList.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

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

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {totalPages > 3 && (
        <button onClick={prevHandler} disabled={currentPage === 1}>
          {"<<"}
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? styles.activePage : ""}
        >
          {new Intl.NumberFormat("fa-IR").format(number)}
        </button>
      ))}
      <button onClick={nextHandler} disabled={currentPage === totalPages}>
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
