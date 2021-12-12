import { defineStore } from "pinia";

const store = defineStore({
  id: "settings",
  state: () => ({
    paymentOptions: {
      card: { enabled: true },
      cash: { enabled: true },
      app: { enabled: true },
    },
    paymentHints: {
      enabled: true,
      active: false,
    },
  }),
  getters: {
    hasPaymentOptions(state) {
      return Object.values(state.paymentOptions).some(
        (option) => option.enabled
      );
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ["paymentOptions", "paymentHints"] },
    ],
  },
});

export default store;
