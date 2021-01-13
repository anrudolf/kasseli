<template>
  <div class="p-4">
    <h1>Products</h1>
    <table class="min-w-full table-auto shadow-lg bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left">Label</th>
          <th class="text-right">Code</th>
          <th class="text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-left">{{ product.label.de }}</td>
          <td class="text-right">{{ product.code }}</td>
          <td class="text-right">{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "../firebaseInit";

const db = firebase.firestore();

export default {
  setup() {
    const products = ref([]);

    db.collection("products").onSnapshot(function (snapshot) {
      products.value = [];
      snapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        products.value.push(doc.data());
      });
    });

    return { products };
  },
};
</script>

<style scoped>
td,
th {
  padding: 12px;
}
</style>