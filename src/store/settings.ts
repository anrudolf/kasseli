import { defineStore } from "pinia";

import useTillstore from "./till";
import useProductStore from "./products";
import { createWorkspacePrefix } from "@/utils/workspace";
import { initWorkspace as initDbWorkspace } from "@/utils/db";

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
    setWorkspace(ws: string) {
      this.workspace = ws;
      initDbWorkspace(ws);

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
    workspacePrefix(state) {
      return createWorkspacePrefix(state.workspace);
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
