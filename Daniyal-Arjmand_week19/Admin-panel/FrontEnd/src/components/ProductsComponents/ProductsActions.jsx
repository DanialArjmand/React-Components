import styles from "../../pages/ProductsList.module.css";
import settingIcon from "../../assets/setting-3.svg";

export function ProductsActions({
  isBulkDeleteMode,
  setIsBulkDeleteMode,
  handleCancelBulkDelete,
  openBulkDeleteModal,
  selectedIds,
  isBulkDeleting,
  openAddModal,
}) {
  return (
    <div className={styles.headTitle}>
      <div className={styles.buttonContainer}>
        {!isBulkDeleteMode ? (
          <>
            <button className={styles.addButton} onClick={openAddModal}>
              افزودن محصول
            </button>
            <button
              className={styles.deleteGroup}
              onClick={() => setIsBulkDeleteMode(true)}
            >
              حذف گروهی
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.cancelButton}
              onClick={handleCancelBulkDelete}
            >
              لغو
            </button>
            <button
              className={styles.deleteConfirm}
              onClick={openBulkDeleteModal}
              disabled={selectedIds.length === 0 || isBulkDeleting}
            >
              {isBulkDeleting ? "در حال حذف..." : `حذف (${selectedIds.length})`}
            </button>
          </>
        )}
      </div>
      <div className={styles.title}>
        <h2>مدیریت کالا</h2>
        <img src={settingIcon} alt="settingIcon" />
      </div>
    </div>
  );
}
