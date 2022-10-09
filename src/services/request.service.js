import api from "@/api";

export async function createRequest(createRequestData) {
    const response = await api
      .post("/pedidos/", createRequestData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return response;
  }