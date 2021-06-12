<template>
  <div v-if="product">
    {{ product.label.de }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import useProductStore from "@/pinia/products";
import { Product } from "@/types";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useProductStore();

    const product = ref<Product | null>(null);

    const found = store.item(props.id);
    if (found) {
      product.value = found;
    }

    return { product };
  },
});
</script>