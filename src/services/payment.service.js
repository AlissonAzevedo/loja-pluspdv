import payment from "@/api/payment";

export async function getQrCodePayment(data) {
    const response = await payment.get(`?${data}`);
    return response.data;
}