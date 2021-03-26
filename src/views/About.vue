<template>
  <div>
    <h1>About</h1>
    <h2>Version</h2>
    <strong>{{ hash }}</strong>
  </div>
</template>

<script>
import { ref } from "vue";
//import appBarcodeStreamReader from "@/components/BarcodeStreamReader.vue";

import firebase from "../firebaseInit";
const db = firebase.firestore();

import fbapp from "firebase/app";
fbapp.firestore.FieldPath.documentId();

export default {
  components: {
    //appBarcodeStreamReader,
  },
  setup() {
    const bucket = firebase.options;

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
