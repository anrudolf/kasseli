import { defineStore } from "pinia";

const store = defineStore({
  id: "ui",
  state: () => ({
    menu: false,
    paymentOptions: {
      card: true,
      cash: true,
      app: true,
    },
  }),
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
    enablePaymentOption(kind: string, enable: boolean) {
      this.paymentOptions[kind] = enable;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["paymentOptions"] }],
  },
});

export default store;
