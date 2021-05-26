import { defineStore } from "pinia";

export const uiStore = defineStore({
  id: "ui",
  state: () => ({
    menu: false,
  }),
  actions: {
    openMenu() {
      const nav = document.getElementById("myNav");
      if (nav) {
        nav.style.width = "100%";
      }
      this.menu = true;
    },
    closeMenu() {
      const nav = document.getElementById("myNav");
      if (nav) {
        nav.style.width = "0%";
      }
      this.menu = false;
    },
  },
});
