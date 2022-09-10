import { defineStore } from "pinia";

import { Order } from "@/types";
import { onSnapshot, Unsubscribe, query, where } from "firebase/firestore";

import db from "@/services/db";

const store = defineStore({
  id: "orders",
  state: () => ({
    items: [] as Order[],
    unsubscribe: null as Unsubscribe | null,
  }),
  getters: {
    item: (state) => (id: string) => {
      const found = state.items.find((item) => item.id === id);
      if (found) {
        return found;
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
      const date = new Date();
      // get orders from last 12 hours
      date.setHours(date.getHours() - 12);
      console.log(date.toISOString());
      const q = query(db.orders, where("created", ">", date.toISOString()));
      this.unsubscribe = onSnapshot(q, function (snapshot) {
        const items = [] as Order[];
        snapshot.forEach(function (doc) {
          items.push({ ...doc.data(), id: doc.id });
        });
        tmp.items = items;
      });
    },
  },
});

export default store;
