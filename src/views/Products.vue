<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl">Products</h1>
      <router-link
        class="bg-gray-200 rounded p-2 flex items-center uppercase"
        to="/products/new"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6 inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="ml-1">ADD PRODUCT</span>
      </router-link>
    </div>
    <app-modal :visible="modal.visible" @close="modal.visible = false">
      <template v-slot:default> This is the modal content </template>
    </app-modal>

    <table class="min-w-full table-auto shadow-lg bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left">Label</th>
          <th class="text-right">id</th>
          <th class="text-right">Price</th>
          <th class="text-right">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-left">{{ product.label.de }}</td>
          <td class="text-right">{{ product.id }}</td>
          <td class="text-right">{{ product.price.toFixed(2) }}</td>
          <td class="flex justify-end">
            <router-link
              :to="`/products/edit?id=${product.id}`"
              class="text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </router-link>
          </td>
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
        products.value.push({ id: doc.id, ...doc.data() });
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