import { defineStore } from "pinia";

import useTillstore from "./till";
import useProductStore from "./products";
import { createWorkspacePrefix } from "@/utils/workspace";
import { initWorkspace as initDbWorkspace } from "@/utils/db";

import { PUBLIC_WORKSPACE } from "@/utils/workspace";
const DEFAULT_TILL = "default";

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
    till: DEFAULT_TILL,
    workspace: PUBLIC_WORKSPACE,
  }),
  actions: {
    setTill(till: string) {
      this.till = till;
    },
    setWorkspace(ws: string) {
      this.setTill(DEFAULT_TILL);

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
        paths: ["paymentOptions", "paymentHints", "workspace", "till"],
      },
    ],
  },
});

export default store;
