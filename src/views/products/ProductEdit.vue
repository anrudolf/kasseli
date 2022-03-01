<template>
  <app-product-edit :id="props.id" :key="`${editing}`" :editing="editing" />
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { useRoute } from "vue-router";

import appProductEdit from "@/components/product/ProductEdit.vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const route = useRoute();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "products-new")
);
</script>
