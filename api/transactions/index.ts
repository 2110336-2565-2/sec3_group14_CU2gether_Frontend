import { CU_API } from "@/config";
import client from "@/utils/client";

const transactionUrl = CU_API + "transactions";

const getTransactionupByID = async (id: string) => {
  try {
    const transaction = await client.get(`${transactionUrl}/${id}`);
    return transaction.data;
  } catch (err) {
    throw new Error("Error fetching user's transaction");
  }
};

const createTransaction = async (amount: number) => {
  try {
    const transaction = await client.post(`${transactionUrl}/gen-depositQR`, {
      amount,
    });
    return transaction.data;
  } catch (err) {
    throw new Error("Error creating user's transaction");
  }
};

const deleteTransactionByID = async (id: string) => {
  try {
    const transaction = await client.delete(`${transactionUrl}/${id}`);
    return transaction.data;
  } catch (err) {
    throw new Error("Error deleting user's transaction");
  }
};

const transactions = {
  getTransactionupByID,
  createTransaction,
  deleteTransactionByID,
};

export default transactions;
