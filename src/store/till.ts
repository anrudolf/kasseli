import { defineStore } from "pinia";

import { Till } from "@/types";
import { onSnapshot, Unsubscribe } from "firebase/firestore";

import useSettingsStore from "./settings";

import db from "@/services/db";

const store = defineStore({
  id: "tills",
  state: () => ({
    items: [] as Till[],
    unsubscribe: null as Unsubscribe | null,
  }),
  getters: {
    getDefault: (state) => {
      return state.items.find((item) => item.id === "default");
    },
    getTill: (state) => {
      const settings = useSettingsStore();
      return state.items.find((item) => item.id === settings.till);
    },
  },
  actions: {
    init() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      // eslint-disable-next-line
      const tmp = this;
      this.unsubscribe = onSnapshot(db.tills, function (snapshot) {
        const items = [] as Till[];
        snapshot.forEach(function (doc) {
          items.push({ ...doc.data(), id: doc.id });
        });
        tmp.items = items;
      });
    },
  },
});

export default store;
