<template>
  <div class="p-4">
    <h1 class="text-2xl">Bundles</h1>
    <ul>
      <li v-for="bundle in bundles" :key="bundle.id" class="border my-2 p-2">
        <h3>{{ bundle.label.de }}</h3>
        <div>{{ bundle }}</div>
        <router-link :to="`/bundles/edit?id=${bundle.id}`">Edit</router-link>
      </li>
      <router-link class="border rounded p-2" to="/bundles/new"
        >ADD</router-link
      >
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default {
  setup() {
    const bundles = ref([]);

    useFirestoreCollectionSnapshot("bundles", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      bundles.value = [];
      bundles.value.push(...tmp);
    });

    return { bundles };
  },
};
</script>