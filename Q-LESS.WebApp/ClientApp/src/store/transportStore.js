import create from 'zustand';
import {
  buyTransportCard,
  buyDiscounteddTransportCard,
  onBoard,
  offBoard,
  reload,
  cardInformation,
  transactionHistory,
} from '../services/api';

const useTransportStore = create((set) => ({
  transportCard: null,
  change: null,
  transactions: null,
  BuyTransportCard: async () => {
    const response = await buyTransportCard();
    set({ transportCard: response });
  },

  BuyDiscountedTransportCard: async (discountId) => {
    const response = await buyDiscounteddTransportCard(discountId);
    set({ transportCard: response });
  },

  CardInformation: async () => {
    const response = await cardInformation();
    set({ transportCard: response });
  },

  TransactionHistory: async () => {
    const response = await transactionHistory();
    set({ transactions: response });
  },

  Reload: async (amount, customerMoney) => {
    const response = await reload(amount, customerMoney);
    set({ change: response });
  },

  ClearChange: async () => {
    set({ change: null });
  },

  OnBoard: async () => {
    const response = await onBoard();
    set({ transportCard: response });
  },

  OffBoard: async () => {
    const response = await offBoard();
    set({ transportCard: response });
  },
}));

export default useTransportStore;
