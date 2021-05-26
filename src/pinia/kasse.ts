import { defineStore } from "pinia";

import useProductStore from "./products";

interface Item {
  code: string;
  quantity: number;
  product: any;
  price: number;
}

const store = defineStore({
  id: "kasse",
  state: () => ({
    items: [] as Item[],
    selectedIndex: 0,
    offset: 0,
    pageSize: 4,
  }),
  getters: {
    selected: (state) => state.items[state.selectedIndex],
    price: (state) => {
      return state.items
        .map((i) => i.quantity * i.price)
        .reduce((sum, x) => sum + x, 0);
    },
    hasItems: (state) => state.items.length > 0,
    page: (state) => {
      const begin = Math.max(
        state.items.length - state.pageSize - state.offset,
        0
      );
      const end = begin + state.pageSize;
      return state.items.slice(begin, end);
    },
    selectedIndexInPage: (state) => {
      const begin = Math.max(
        state.items.length - state.pageSize - state.offset,
        0
      );
      const end = begin + state.pageSize;

      if (state.selectedIndex < begin) {
        return -1;
      }

      if (state.selectedIndex > end) {
        return -1;
      }

      return state.selectedIndex - begin;
    },
    hasPrev: (state) => {
      const maxOffset = Math.max(state.items.length - state.pageSize, 0);
      return state.offset < maxOffset;
    },
    hasNext: (state) => state.offset > 0,
  },
  actions: {
    add(code: string) {
      const products = useProductStore();

      const product = products.item(code);

      if (!product) {
        return;
      }

      const item = { code, quantity: 1, product, price: product.price };

      const index = this.items.findIndex((item) => item.code === code);
      if (index > -1) {
        const quantity = this.items[index].quantity + 1;
        const items = [...this.items];
        items.splice(index, 1);
        items.push({ ...item, quantity });

        this.items = items;
        this.selectedIndex = items.length - 1;
        this.offset = 0;

        return;
      }

      const items = [...this.items, item];
      this.items = items;
      this.selectedIndex = items.length - 1;
      this.offset = 0;
    },
    remove() {
      const item = this.items[this.selectedIndex];
      const quantity = item.quantity - 1;

      const items = [...this.items];
      if (quantity <= 0) {
        items.splice(this.selectedIndex, 1);

        this.items = items;
        this.selectedIndex = items.length - 1;
        this.offset = 0;

        return;
      }

      items[this.selectedIndex].quantity = quantity;
      this.items = items;
    },
    select(index) {
      this.selectedIndex = index;
    },
    prev() {
      const maxOffset = Math.max(this.items.length - this.pageSize, 0);
      if (this.offset < maxOffset) {
        this.offset = this.offset + 1;
      }
    },
    next() {
      if (this.offset > 0) {
        this.offset = this.offset - 1;
      }
    },
    selectFromPage(i: number) {
      if (!this.page[i]) {
        return;
      }

      let index: number;
      if (this.items.length <= this.pageSize) {
        index = i;
      } else {
        index = this.items.length - this.pageSize + i - this.offset;
      }

      this.selectedIndex = index;
    },
  },
});

export default store;
