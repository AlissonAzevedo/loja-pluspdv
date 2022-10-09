import axios from "axios";

const payment = axios.create({
    baseURL: "https://gerarqrcodepix.com.br/api/v1"
});

export default payment;