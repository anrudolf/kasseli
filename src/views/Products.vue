<template>
  <div class="p-4">
    <h1>Products</h1>
    <button
      @click="modal.visible = true"
      class="bg-gray-200 rounded p-2 flex items-center uppercase"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6 inline-block"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div class="inline-block ml-1">ADD PRODUCT</div>
    </button>
    <app-modal :visible="modal.visible" @close="modal.visible = false" />

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
          <td class="text-right">{{ product.price.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import firebase from "../firebaseInit";
import appModal from "../components/Modal.vue";

const db = firebase.firestore();

export default {
  components: {
    appModal,
  },
  setup() {
    const products = ref([]);
    const modal = reactive({ visible: false });

    db.collection("products").onSnapshot(function (snapshot) {
      products.value = [];
      snapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        products.value.push(doc.data());
      });
    });

    return { products, modal };
  },
};
</script>

<style scoped>
td,
th {
  padding: 12px;
}
</style>