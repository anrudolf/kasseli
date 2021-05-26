import { defineStore } from "pinia";

const store = defineStore({
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
      console.log("setting menu = true");
      this.menu = true;
    },
    closeMenu() {
      const nav = document.getElementById("myNav");
      if (nav) {
        nav.style.width = "0%";
      }
      console.log("setting menu = false");
      this.menu = false;
    },
  },
});

export default store;
