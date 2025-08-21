import BaseModal from "./BaseModal";
import ProductForm from "./ProductForm";
import stylesModal from "./AddModal.module.css";

function EditModal({
  isOpen,
  onClose,
  product,
  onUpdateProduct,
  isSubmitting,
}) {
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
        title="ویرایش اطلاعات"
        submitLabel="ثبت اطلاعات جدید"
        defaultValues={product}
        isSubmitting={isSubmitting}
        onSubmit={(data) => {
          const updatedProduct = { ...product, ...data };
          onUpdateProduct(updatedProduct);
          onClose();
        }}
        onCancel={onClose}
      />
    </BaseModal>
  );
}
export default EditModal;
