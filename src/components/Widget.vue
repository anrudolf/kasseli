<template>
  <app-card
    v-if="product"
    :label="product.label.de"
    :image-ref="product.imageRef"
    :contain="contain"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import appCard from "@/components/ui/Card.vue";

import useProductStore from "@/store/products";

export default defineComponent({
  name: "Widget",
  components: {
    appCard,
  },
  props: {
    kind: String,
    widget: {
      type: Object,
      required: true,
    },
    contain: Boolean,
  },
  setup(props) {
    const productStore = useProductStore();

    const product = computed(() => productStore.item(props.widget.id));

    return { product };
  },
});
</script>

<style scoped></style>
>
