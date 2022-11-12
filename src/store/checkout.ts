import { defineStore } from "pinia";

const store = defineStore({
  id: "checkout",
  state: () => ({
    price: 0,
    paid: 0,
    change: 0,
    paymentMethod: "",
    success: false,
  }),
});

export default store;
