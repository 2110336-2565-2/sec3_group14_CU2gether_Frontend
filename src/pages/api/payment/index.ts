import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "payments";

const createPaymentByEventId = async (eventId: string) => {
  try {
    const payment = await client.post(`${baseUrl}/${eventId}`);
    return payment.data;
  } catch (error) {
    throw new Error(`Error create payment by event id ${eventId}`);
  }
};

const refundPaymentByEventId = async (eventId: string) => {
  try {
    const payment = await client.post(`${baseUrl}/refund/${eventId}`);
    return payment.data;
  } catch (error) {
    throw new Error(`Error refund payment by event id ${eventId}`);
  }
};

const payment = {
  createPaymentByEventId,
  refundPaymentByEventId,
};

export default payment;
