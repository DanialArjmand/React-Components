import { toast } from "react-toastify";

export const toastSuccess = (message, opts = {}) =>
  toast.success(message, {
    className: "toast-base toast-success",
    progressClassName: "toast-success-progress",
    ...opts,
  });

export const toastDeleteSuccess = (message, opts = {}) =>
  toast.success(message, {
    className: "toast-base toast-delete",
    progressClassName: "toast-delete-progress",
    ...opts,
  });

export const toastError = (message, opts = {}) =>
  toast.error(message || "خطایی رخ داده است", opts);
