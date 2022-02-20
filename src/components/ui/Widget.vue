<template>
  <app-card
    v-if="product"
    :label="product.label.de"
    :image-ref="product.imageRef"
    :contain="contain"
  />
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import appCard from "@/components/ui/Card.vue";

import useProductStore from "@/store/products";

const props = defineProps({
  kind: { type: String, default: "" },
  widget: {
    type: Object,
    required: true,
  },
  contain: Boolean,
});

const productStore = useProductStore();

const product = computed(() => productStore.item(props.widget.id));
</script>
