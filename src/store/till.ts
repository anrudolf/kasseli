import { defineStore } from "pinia";

import { Till } from "@/types";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";

import db from "@/utils/db";

const store = defineStore({
  id: "tills",
  state: () => ({
    items: [] as Till[],
  }),
  getters: {
    getDefault: (state) => {
      return state.items.find((item) => item.id === "default");
    },
  },
  actions: {
    init() {
      // eslint-disable-next-line
      const tmp = this;
      useFirestoreCollectionSnapshot(db.tills, function(snapshot) {
        const items = [] as Till[];
        snapshot.forEach(function(doc) {
          items.push({ ...doc.data(), id: doc.id });
        });
        tmp.items = items;
      });
    },
  },
});

export default store;
