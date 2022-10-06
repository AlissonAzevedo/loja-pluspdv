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

  if (consumer) {
    if (consumer.id) {
      return true;
    }
  } else {
    return false;
  }
}
