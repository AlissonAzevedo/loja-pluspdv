import axios from "axios";

const payment = axios.create({
    baseURL: process.env.VUE_APP_PAYMENT_URL
});

export default payment;