<template>
  <div class="p-4">
    <h1 class="text-2xl">Widget Groups</h1>
    <div v-for="entity in entities" :key="entity.id">
      <app-card
        :label="entity.data.label.de"
        :imageRef="entity.data.imageRef"
        :to="`/widget-groups/edit?id=${entity.id}`"
      />
    </div>

    <router-link
      to="/widget-groups/new"
      class="focus:outline-none text-white text-sm inline-block py-2.5 px-4 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
    >
      <svg
        class="w-4 h-4 mr-1 inline"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
      ADD
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

import appCard from "../components/Card.vue";

export default {
  components: {
    appCard,
  },
  setup() {
    const entities = ref([]);

    useFirestoreCollectionSnapshot("widget-groups", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, data: doc.data() });
      });
      entities.value = [];
      entities.value.push(...tmp);
    });

    return { entities };
  },
};
</script>