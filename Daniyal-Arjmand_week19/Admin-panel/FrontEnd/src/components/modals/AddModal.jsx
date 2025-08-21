import BaseModal from "./BaseModal";
import ProductForm from "./ProductForm";
import stylesModal from "./AddModal.module.css";

function AddModal({ isOpen, onClose, onAddProduct, isSubmitting }) {
  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      backdropClass={stylesModal.backgroundParent}
      panelClass={stylesModal.addForm}
    >
      <ProductForm
        stylesModule={stylesModal}
        title="ایجاد محصول جدید"
        submitLabel="ایجاد"
        isSubmitting={isSubmitting}
        onSubmit={(data) => {
          onAddProduct(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </BaseModal>
  );
}
export default AddModal;
