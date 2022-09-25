import axios from "axios";

const api = axios.create({
    baseURL: "http://159.89.176.78:8001"
});

export default api;