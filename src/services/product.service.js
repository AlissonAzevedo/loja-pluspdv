import api from "@/api";

export async function getCategorias(store_slug) {
  const response = await api.get(`/categorias/${store_slug}/`);
  return response.data;
}

export async function getProducts(id) {
  const response = await api.get(`/produtos/?ids=${id}`);
  return response.data;
}
