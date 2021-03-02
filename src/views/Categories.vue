<template>
  <div class="p-4">
    <h1 class="text-2xl">Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.label.de }}
      </li>
      <button class="mx-2 border rounded p-2">ADD</button>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default {
  setup() {
    const categories = ref([]);

    useFirestoreCollectionSnapshot("categories", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      categories.value = [];
      categories.value.push(...tmp);
    });

    return { categories };
  },
};
</script>