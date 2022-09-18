import { defineStore } from "pinia";

import { TillMode } from "@/types";

import { createWorkspacePrefix } from "@/utils/workspace";
import { initWorkspace } from "@/services/workspaces";

import { PUBLIC_WORKSPACE } from "@/utils/workspace";
const DEFAULT_TILL = "default";
const DEFAULT_TILL_MODE = TillMode.PAY;

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
    cashCalculator: {
      active: false,
    },
    till: DEFAULT_TILL,
    tillMode: DEFAULT_TILL_MODE as TillMode,
    workspace: PUBLIC_WORKSPACE,
  }),
  actions: {
    setTill(till: string) {
      this.till = till;
    },
    setWorkspace(ws: string) {
      this.setTill(DEFAULT_TILL);

      this.workspace = ws;

      initWorkspace(ws);
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
        paths: [
          "paymentOptions",
          "paymentHints",
          "workspace",
          "till",
          "tillMode",
        ],
      },
    ],
  },
});

export default store;
