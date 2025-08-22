import styles from "../../pages/ProductsList.module.css";
import { IoCopyOutline } from "react-icons/io5";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/trash.svg";
import { PAGE_SIZE } from "../../constants/pagination";

const formatPrice = (price) => {
  const num = Number(String(price).replace(/,/g, ""));
  if (isNaN(num)) return price;
  if (num >= 1000000000)
    return `${new Intl.NumberFormat("fa-IR").format(
      num / 1000000000
    )} میلیارد تومان`;
  if (num >= 1000000)
    return `${new Intl.NumberFormat("fa-IR").format(
      num / 1000000
    )} میلیون تومان`;
  if (num >= 10000) {
    return `${new Intl.NumberFormat("fa-IR").format(num)} هزار تومان`;
  }
  return `${new Intl.NumberFormat("fa-IR").format(num)} تومان`;
};

export function ProductsTable({
  isLoading,
  isError,
  error,
  products,
  debouncedSearchTerm,
  isBulkDeleteMode,
  selectedIds,
  handleSelectProduct,
  page,
  copiedId,
  handleCopyId,
  openEditModal,
  openDeleteModal,
}) {
  if (isLoading) {
    return (
      <tr>
        <td colSpan={isBulkDeleteMode ? 7 : 6} style={{ textAlign: "center" }}>
          درحال بارگذاری...
        </td>
      </tr>
    );
  }

  if (isError) {
    return (
      <tr>
        <td colSpan={isBulkDeleteMode ? 7 : 6} style={{ textAlign: "center" }}>
          {error.response?.data?.message ===
          "Page 1 is out of bounds. There are only 0 pages."
            ? "محصولی یافت نشد"
            : error.message || "خطا در دریافت اطلاعات"}
        </td>
      </tr>
    );
  }

  if (products.length === 0) {
    return (
      <tr>
        <td
          colSpan={isBulkDeleteMode ? 7 : 6}
          className={styles.noProductsText}
        >
          {debouncedSearchTerm ? "محصولی یافت نشد" : "هیچ محصولی ثبت نشده"}
        </td>
      </tr>
    );
  }

  return products.map((product, index) => (
    <tr
      key={product.id}
      className={selectedIds.includes(product.id) ? styles.selectedRow : ""}
    >
      {isBulkDeleteMode && (
        <td>
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={selectedIds.includes(product.id)}
              onChange={() => handleSelectProduct(product.id)}
            />
            <span className={styles.customCheckbox}></span>
          </label>
        </td>
      )}
      <td className={styles.rowNumber}>{(page - 1) * PAGE_SIZE + index + 1}</td>
      <td>{product.name}</td>
      <td className={styles.quantity}>{product.quantity}</td>
      <td className={styles.price}>{formatPrice(product.price)}</td>
      <td className={styles.idStyles} title={product.id}>
        {product.id.slice(0, 8)}
      </td>
      <td className={styles.buttons}>
        <div className={styles.action}>
          <button
            title="کپی کامل شناسه کالا"
            onClick={() => handleCopyId(product.id)}
          >
            {copiedId === product.id ? (
              <span className={styles.copiedText}>کپی شد</span>
            ) : (
              <IoCopyOutline className={styles.copyIcon} />
            )}
          </button>
          <button title="ویرایش" onClick={() => openEditModal(product)}>
            <img src={editIcon} alt="editIcon" />
          </button>
          <button title="حذف" onClick={() => openDeleteModal(product)}>
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
        </div>
      </td>
    </tr>
  ));
}

export default ProductsTable;
