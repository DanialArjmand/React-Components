import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiConfig";

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, limit, name }] = queryKey;
  const params = { page, limit, name: name || undefined };
  const { data } = await apiClient.get("/products", { params });
  return data;
};

export function useProductsQuery({ page, limit, name }) {
  return useQuery({
    queryKey: ["products", { page, limit, name }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
}
