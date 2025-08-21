import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiConfig";
import {
  toastDeleteSuccess,
  toastError,
  toastSuccess,
} from "../utils/toastHelper";

export function useProductMutations({
  onAddSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
  onBulkDeleteSuccess,
  onAnyError,
} = {}) {
  const addProductMutation = useMutation({
    mutationFn: (newProduct) => apiClient.post("/products", newProduct),
    onSuccess: (_data, variables) => {
      toastSuccess(`محصول «${variables.name}» با موفقیت اضافه شد.`);
      onAddSuccess?.(variables);
    },
    onError: (error) => {
      onAnyError?.(error);
      toastError(error?.response?.data?.message);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct) =>
      apiClient.put(`/products/${updatedProduct.id}`, updatedProduct),
    onSuccess: (_data, variables) => {
      toastSuccess(`محصول «${variables.name}» با موفقیت ویرایش شد.`);
      onUpdateSuccess?.(variables);
    },
    onError: (error) => {
      onAnyError?.(error);
      toastError(error?.response?.data?.message);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (product) => apiClient.delete(`/products/${product.id}`),
    onSuccess: (_data, variables) => {
      toastDeleteSuccess(`محصول «${variables.name}» با موفقیت حذف شد.`);
      onDeleteSuccess?.(variables);
    },
    onError: (error) => {
      onAnyError?.(error);
      toastError(error?.response?.data?.message);
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids) => apiClient.delete("/products", { data: { ids } }),
    onSuccess: (_data, ids) => {
      toastDeleteSuccess(`تعداد ${ids.length} محصول با موفقیت حذف شد.`);
      onBulkDeleteSuccess?.(ids);
    },
    onError: (error) => {
      onAnyError?.(error);
      toastError(error?.response?.data?.message);
    },
  });

  return {
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,
    bulkDeleteMutation,
  };
}
