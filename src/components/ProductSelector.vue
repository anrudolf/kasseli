<template>
  <div class="my-2">
    <input
      :value="filter"
      class="input"
      placeholder="Suche"
      @input="(ev) => (filter = (ev.target as HTMLInputElement).value)"
    />
  </div>
  <app-product-list :products="filtered" @selected="(id) => selected(id)" />
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import appProductList from "../components/ProductList.vue";

import useProductStore from "@/store/products";

export default defineComponent({
  components: {
    appProductList,
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const store = useProductStore();

    const filter = ref("");

    const selected = (id) => {
      emit("selected", id);
      filter.value = "";
    };

    const filtered = computed(() => {
      return store.items.filter((p) => {
        if (p.template) {
          return false;
        }

        if (p.id === filter.value) {
          return true;
        }

        if (p.label.de.toLowerCase().includes(filter.value.toLowerCase())) {
          return true;
        }

        return false;
      });
    });

    return { filter, filtered, selected };
  },
});
</script>
