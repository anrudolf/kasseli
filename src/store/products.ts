import { defineStore } from "pinia";

import { Product } from "@/types";
import { onSnapshot, Unsubscribe } from "firebase/firestore";

import utils from "../utils";

import db from "@/utils/db";

const store = defineStore({
  id: "products",
  state: () => ({
    items: [] as Product[],
    unsubscribe: null as Unsubscribe | null,
  }),
  getters: {
    item: (state) => (code: string) => {
      const found = state.items.find((item) => item.id === code);
      if (found && !found.template) {
        return found;
      }

      if (utils.isTemplateConform(code)) {
        const templateCode = utils.createTemplate(code);
        const found = state.items.find((item) => item.id === templateCode);
        if (found) {
          return { ...found, price: utils.getPriceFromTemplate(code) };
        }
      }

      return null;
    },
  },
  actions: {
    init() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      // eslint-disable-next-line
      const tmp = this;
      this.unsubscribe = onSnapshot(db.products, function (snapshot) {
        const items = [] as Product[];
        snapshot.forEach(function (doc) {
          items.push({ ...doc.data(), id: doc.id });
        });
        tmp.items = items;
      });
    },
  },
});

export default store;
