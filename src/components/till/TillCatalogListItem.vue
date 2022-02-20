<template>
  <div v-if="product">
    {{ product.label.de }}
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

import useProductStore from "@/store/products";
import { Product } from "@/types";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
});

const store = useProductStore();

const product = ref<Product | null>(null);

const found = store.item(props.id);
if (found) {
  product.value = found;
}
</script>
