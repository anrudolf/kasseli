<template>
  <div class="p-4">
    <h1 class="text-2xl">Neues Produkt</h1>

    <label class="block">
      <div class="text-gray-700">ID oder Strichcode</div>
      <input
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model="product.id"
        placeholder="Produkt Code"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model="product.data.label.de"
        placeholder="Produkt Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Preis</div>
      <input
        type="number"
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model.number="product.data.price"
        placeholder="2.90"
      />
    </label>

    <label class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="product.data.noBarcode"
      />
      <span class="ml-2 text-gray-700">Produkt hat kein Strichcode</span>
    </label>

    <label class="flex items-center">
      <input type="checkbox" class="form-checkbox" v-model="product.template" />
      <span class="ml-2 text-gray-700">Preis aus Strichcode</span>
    </label>

    <app-button class="mt-4" @click="save">Speichern</app-button>

    {{ product }}
  </div>
</template>

<script>
import { reactive } from "vue";
import appButton from "../components/Button.vue";

import firebase from "../firebaseInit";

const db = firebase.firestore();

export default {
  components: {
    appButton,
  },
  setup() {
    const product = reactive({
      id: null,
      data: {
        label: {
          de: null,
          en: null,
        },
        price: null,
        noBarcode: false,
        template: false,
      },
    });

    const save = () => {
      db.collection("products").doc(product.id).set(product.data);
    };

    return { product, save };
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 12px;
  font-size: 1.125rem;
}
</style>