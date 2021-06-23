<template>
  <div class="p-4">
    <h1>About</h1>
    <p class="my-2">
      Kasseli is a play pretend super market self checkout register inspired by
      Migros. You can use a barcode reader to scan products to buy, as well as
      register new products in inventory mode. It is web based and runs in any
      browser, such as on a tablet or on a Raspberry Pi with Touch screen.
    </p>
    <h2 class="my-2">Code</h2>
    <p>
      This project is open source. It consists of a Vuejs front-end and a
      firestore backend.
    </p>
    <p>
      Source code available on
      <a
        class="underline text-indigo-600"
        href="https://github.com/anrudolf/kasseli"
        >Github.</a
      >
    </p>
    <p>
      Current commit <span class="font-bold">{{ hash.substring(0, 6) }}</span>
    </p>
  </div>
  <div v-show="false">
    <button @click="getProduct">LOG</button>
    {{ products }}
  </div>
</template>

<script>
import { computed } from "vue";
//import appBarcodeStreamReader from "@/components/BarcodeStreamReader.vue";

import firebase from "../firebaseInit";
const db = firebase.firestore();

import fbapp from "firebase/app";
fbapp.firestore.FieldPath.documentId();

import useProductStore from "@/store/products";

export default {
  components: {
    //appBarcodeStreamReader,
  },
  setup() {
    const bucket = firebase.options;
    const productStore = useProductStore();
    productStore.init();

    db.collection("products")
      .where(fbapp.firestore.FieldPath.documentId(), "in", ["coolio"])
      .get()
      .then((querySnapshot) => {
        console.log("QUERY SNAPSHOT");
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      });

    const getProduct = () => {
      const p = productStore.item("644824914886");
      console.log(p);
    };

    return { bucket, products: computed(() => productStore.items), getProduct };
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
    kasse() {
      return this.$store.getters["kasse/items"];
    },
    hash() {
      return process.env.VUE_APP_COMMIT_HASH;
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
