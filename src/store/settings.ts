import { defineStore } from "pinia";

import useTillstore from "./till";
import useProductStore from "./products";

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
    workspace: "",
  }),
  actions: {
    setWorkspace(id: string) {
      if (id) {
        this.workspace = `workspaces/${id}/`;
      } else {
        this.workspace = "";
      }

      const tillStore = useTillstore();
      tillStore.init();

      const productStore = useProductStore();
      productStore.init();
    },
  },
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
      {
        storage: localStorage,
        paths: ["paymentOptions", "paymentHints", "workspace"],
      },
    ],
  },
});

export default store;
