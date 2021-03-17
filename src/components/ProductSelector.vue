<template>
  <div class="my-2">
    <input class="input" placeholder="Suche" v-model="filter" />
  </div>
  <app-product-list
    :products="filtered"
    @selected="(id) => $emit('selected', id)"
  />
</template>

<script>
import { ref, computed } from "vue";
import appProductList from "../components/ProductList.vue";

import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default {
  emits: ["selected"],
  components: {
    appProductList,
  },
  setup() {
    const products = ref([]);
    const filter = ref("");

    useFirestoreCollectionSnapshot("products", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      products.value = [];
      products.value.push(...tmp);
    });

    const filtered = computed(() => {
      return products.value.filter(
        (p) =>
          (p &&
            !p.template &&
            p.label.de.toLowerCase().includes(filter.value.toLowerCase())) ||
          p.id === filter.value
      );
    });

    return { filter, filtered };
  },
};
</script>