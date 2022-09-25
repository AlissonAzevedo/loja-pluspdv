import api from '@/api';

export async function getStores() {
    const response = await api.get('/clientes/cliente_01/');
    return response.data;
  }
