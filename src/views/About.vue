<template>
  <div>
    <h1>This is an about page</h1>
    <div class="wrapper">
      <select>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </select>
    </div>
    Kasse
    <ul>
      <li v-for="(item, i) in kasse" :key="i">
        {{ item }}
      </li>
    </ul>
    Products
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.id }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
//import appBarcodeStreamReader from "@/components/BarcodeStreamReader.vue";

import firebase from "../firebaseInit";

export default {
  components: {
    //appBarcodeStreamReader,
  },
  setup() {
    const bucket = firebase.options;

    return { bucket };
  },
  methods: {
    onDecode(val) {
      console.log(val);
    },
    onLoaded() {
      console.log("loaded");
    },
  },
  computed: {
    products() {
      return this.$store.getters["products/items"];
    },
    kasse() {
      return this.$store.getters["kasse/items"];
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  /*grid-auto-rows: 16rem;*/
}
</style>
