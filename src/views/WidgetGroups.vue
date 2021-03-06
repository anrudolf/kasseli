<template>
  <div class="p-4">
    <h1 class="text-2xl">Widget Groups</h1>
    <ul>
      <li v-for="entity in entities" :key="entity.id" class="border my-2 p-2">
        <h3>{{ entity.label.de }}</h3>
        <div>{{ entity }}</div>
        <img v-if="entity.image" :src="entity.image" />
        <router-link :to="`/widget-groups/edit?id=${entity.id}`"
          >Edit</router-link
        >
      </li>
      <router-link class="border rounded p-2" to="/widget-groups/new"
        >ADD</router-link
      >
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default {
  setup() {
    const entities = ref([]);

    useFirestoreCollectionSnapshot("widget-groups", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      entities.value = [];
      entities.value.push(...tmp);
    });

    return { entities };
  },
};
</script>