import { defineStore } from "pinia";

const store = defineStore({
  id: "ui",
  state: () => ({
    menu: false,
    paymentOptions: {
      card: { enabled: true },
      cash: { enabled: true },
      app: { enabled: true },
    },
  }),
  getters: {
    hasPaymentOptions(state) {
      return Object.values(state.paymentOptions).some(
        (option) => option.enabled
      );
    },
  },
  actions: {
    openMenu() {
      const nav = document.getElementById("myNav");
      if (nav) {
        nav.style.width = "100%";
      }
      this.menu = true;
    },
    closeMenu() {
      const nav = document.getElementById("myNav");
      if (nav) {
        nav.style.width = "0%";
      }
      this.menu = false;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["paymentOptions"] }],
  },
});

export default store;
