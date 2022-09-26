import api from '@/api';

export async function getStores() {
    const response = await api.get('/clientes/cliente_01/');
    return response.data;
  }

export async function getStoreBySlug(slug) {
    const response = await api.get(`/lojas/${slug}/`);
    return response.data;
  }

export async function getCategorias(store_slug) {
    const response = await api.get(`/categorias/${store_slug}/`);
    return response.data;
  }
