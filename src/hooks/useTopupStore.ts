import { create } from "zustand";

type TopupStore = {
  cash: number;
};

const useTopupStore = create<TopupStore>((set, get) => ({
  cash: 0,
}));

export default useTopupStore;
