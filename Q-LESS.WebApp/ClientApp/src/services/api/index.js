import apiClient from './apiClient';

export const buyTransportCard = () => {
  return apiClient.post('Transport/BuyTransportCard', null);
};

export const buyDiscounteddTransportCard = (discountId) => {
  return apiClient.post(
    `Transport/BuyDiscountedTransportCard?discountId=${discountId}`
  );
};

export const cardInformation = () => {
  return apiClient.get(`Transport/CardInformation`);
};

export const reload = (amount, customerMoney) => {
  return apiClient.post(
    `Transport/Reload?amount=${amount}&amountPaid=${customerMoney}`
  );
};

export const onBoard = () => {
  return apiClient.post('Transport/OnBoard', null);
};

export const offBoard = () => {
  return apiClient.post('Transport/OffBoard', null);
};
///

export const transactionHistory = () => {
  return apiClient.get(`Transport/TransactionHistory`);
};
