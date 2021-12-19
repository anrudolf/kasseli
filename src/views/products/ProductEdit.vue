<template>
  <app-product-edit
    :key="editing"
    :editing="editing"
    :edit-id="editId"
    :new-id="newId"
  />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

import appProductEdit from "@/components/product/ProductEdit.vue";

export default {
  components: {
    appProductEdit,
  },
  props: ["editId", "newId"],
  setup() {
    const route = useRoute();

    const editing = computed(
      () => !route.matched.some(({ name }) => name === "products-new")
    );

    return { editing };
  },
};
</script>
