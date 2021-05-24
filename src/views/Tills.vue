<template>
  <div class="p-4">
    <h1>Tills</h1>
    <router-link to="/tills/new" class="btn btn-blue inline-flex items-center">
      <app-icon icon="plus" class="w-5 h-5 mr-1" />
      ADD
    </router-link>
    <ul>
      <li
        v-for="till in tills"
        :key="till.id"
        class="border p-2 mt-2 flex flex-col"
      >
        <h3>{{ till.label.de }}</h3>
        <app-image-ref :id="till.imageRef" class="self-center" />
        <router-link
          :to="`/tills/edit?id=${till.id}`"
          class="uppercase text-blue-500 self-end mr-1 mt-2"
          >Edit</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";
import appIcon from "@/components/Icon.vue";

import appImageRef from "@/components/ImageRef.vue";

export default {
  components: {
    appIcon,
    appImageRef,
  },
  setup() {
    const tills = ref([]);

    useFirestoreCollectionSnapshot("tills", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ ...doc.data(), id: doc.id });
      });
      tills.value = [];
      tills.value.push(...tmp);
    });

    return {
      tills,
    };
  },
};
</script>