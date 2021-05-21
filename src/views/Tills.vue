<template>
  <div class="p-4">
    <h1>Tills</h1>
    <router-link to="/tills/new" class="btn btn-blue inline-flex items-center">
      <app-icon icon="plus" class="w-5 h-5 mr-1" />
      ADD
    </router-link>
    <ul>
      <li v-for="till in tills" :key="till.id">{{ till.label.de }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, computed, defineComponent } from "vue";

import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";
import appIcon from "@/components/Icon.vue";

export default {
  components: {
    appIcon,
  },
  setup() {
    const tills = ref([]);

    useFirestoreCollectionSnapshot("tills", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
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