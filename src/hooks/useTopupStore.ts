import { Transaction } from "@/types";
import transactions from "api/transactions";
import { create } from "zustand";

type TopupStore = {
  cash: number;
  transaction?: Transaction;
  getTransaction: (id: string) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

const useTopupStore = create<TopupStore>((set, get) => ({
  cash: 0,
  getTransaction: async (id: string) => {
    const transaction = await transactions.getTransactionupByID(id);
    set({ transaction: transaction });
  },
  deleteTransaction: async (id: string) => {
    await transactions.deleteTransactionByID(id);
    set({ transaction: undefined });
  },
}));

export default useTopupStore;
