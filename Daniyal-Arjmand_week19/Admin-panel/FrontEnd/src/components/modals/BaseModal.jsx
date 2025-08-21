export default function BaseModal({
  isOpen,
  onClose,
  backdropClass,
  panelClass,
  children,
}) {
  if (!isOpen) return null;
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };
  return (
    <div className={backdropClass} onMouseDown={handleBackdrop}>
      <div className={panelClass}>{children}</div>
    </div>
  );
}
