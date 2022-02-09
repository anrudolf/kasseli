import { defineStore } from "pinia";

import useTillstore from "./till";
import useProductStore from "./products";
import { createWorkspacePrefix } from "@/utils/workspace";
import { initWorkspace as initDbWorkspace } from "@/utils/db";

import { PUBLIC_WORKSPACE } from "@/utils/workspace";

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
    workspace: PUBLIC_WORKSPACE,
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
    clearWorkspace() {
      this.setWorkspace(PUBLIC_WORKSPACE);
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
    hasWorkspaceSelected(state) {
      return state.workspace !== PUBLIC_WORKSPACE;
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
