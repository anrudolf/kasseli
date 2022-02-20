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

<script lang="ts" setup>
import { ref, computed, defineEmits } from "vue";
import appProductList from "./ProductList.vue";

import useProductStore from "@/store/products";

const emit = defineEmits<{
  (e: "selected", v: string);
}>();

const store = useProductStore();

const filter = ref("");

const selected = (id: string) => {
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
</script>
