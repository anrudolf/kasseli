<template>
  <app-product-edit
    :key="`${editing}`"
    :editing="editing"
    :edit-id="props.editId"
    :new-id="props.newId"
  />
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { useRoute } from "vue-router";

import appProductEdit from "@/components/product/ProductEdit.vue";

const props = defineProps({
  editId: {
    type: String,
    default: "",
  },
  newId: {
    type: String,
    default: "",
  },
});

const route = useRoute();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "products-new")
);
</script>
