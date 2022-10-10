import api from "@/api";

export async function createConsumer(createConsumerData) {
  const response = await api
    .post("/consumidores/", createConsumerData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
}

export async function LoginConsumer(loginConsumerData) {
  const response = await api
    .post("/login/consumidor/", loginConsumerData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  if (response.status == 200) {
    const consumer = response?.data
    const idConsumer = response?.data?.id;
    if (idConsumer) {
      localStorage.setItem("consumer", JSON.stringify(consumer));
      localStorage.setItem("id_consumer", JSON.stringify(idConsumer));
    }
  }
  return response;
}

export function VerifyLogin() {
  let consumer = localStorage.getItem("consumer");
  let consumerId = localStorage.getItem("id_consumer");

  if (consumer) {
    if (consumerId) {
      return true;
    }
  } else {
    return false;
  }
}

export async function LogoutConsumer() {
  localStorage.removeItem("consumer");
  localStorage.removeItem("id_consumer");
}

export async function getAddressCosumer(id_consumer) {
  const response = await api.get(`/enderecos/?consumer__id=${id_consumer}`)
  return response
}
export async function getOrdersCosumer(id_consumer) {
  const response = await api.get(`/pedidos/?consumer__id=${id_consumer}`)
  return response
}