import { Transaction } from "@/types";
import transactions from "api/transactions";
import { create } from "zustand";

type TransactionStore = {
  transaction?: Transaction;
  QRUrl?: string;
  getTransaction: (id: string) => Promise<void>;
  createTransaction: (amount: number) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

const useTransactionStore = create<TransactionStore>((set, get) => ({
  getTransaction: async (id: string) => {
    const transaction = await transactions.getTransactionupByID(id);
    set({ transaction: transaction });
  },
  createTransaction: async (amount: number) => {
    const { transaction, QRUrl } = await transactions.createTransaction(amount);
    set({ transaction: transaction, QRUrl: QRUrl });
  },
  deleteTransaction: async (id: string) => {
    await transactions.deleteTransactionByID(id);
    set({ transaction: undefined });
  },
}));

export default useTransactionStore;
