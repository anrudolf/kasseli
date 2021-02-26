<template>
  <div>
    <h1>This is an about page</h1>
    <button
      class="border p-2 m-1"
      @click="
        createThumbnailStatus = '';
        createThumbnail();
      "
    >
      Create Thumbnail
    </button>
    <p class="border p-4 m-1">Status: {{ createThumbnailStatus }}</p>
    <img :src="image" crossorigin="anonymous" />
    <div class="wrapper">
      <div>Hello</div>
      <!-- <app-barcode-stream-reader @decode="onDecode" @loaded="onLoaded" /> //-->
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
    const image = ref("");

    const root = firebase.storage().ref();
    const storageRef = root.child("9780066620732.jpeg");
    storageRef.getDownloadURL().then((url) => {
      console.log(url);
      image.value = url;
    });

    const createThumbnailStatus = ref("");

    const createTumbnailFunction = firebase
      .functions()
      .httpsCallable("createThumbnail");

    const createThumbnail = () => {
      createTumbnailFunction({ text: "hello" })
        .then((result) => {
          const { text } = result.data;
          createThumbnailStatus.value = text;
        })
        .catch((error) => {
          const { code, message, details } = error;
          createThumbnailStatus.value = `${code}: ${message}`;
        });
    };

    return { image, createThumbnail, createThumbnailStatus };
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
