<template>
  <div class="p-4">
    <h1>Widget Groups</h1>
    <router-link
      to="/widget-groups/new"
      class="my-2 focus:outline-none text-white text-sm inline-block py-2.5 px-4 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
    >
      <app-icon icon="plus" />
      ADD
    </router-link>
    <div v-for="entity in entities" :key="entity.id">
      <app-card
        class="my-1"
        :class="{ 'opacity-50': entity.data.hidden }"
        :label="entity.data.label.de"
        :imageRef="entity.data.imageRef"
        :to="`/widget-groups/edit?id=${entity.id}`"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

import appCard from "../components/Card.vue";
import appIcon from "@/components/Icon.vue";

export default {
  components: {
    appCard,
    appIcon,
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