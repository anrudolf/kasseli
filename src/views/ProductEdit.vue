<template>
  <app-product-edit
    :key="editing"
    :editing="editing"
    :editId="editId"
    :newId="newId"
  />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

import appProductEdit from "../components/ProductEdit.vue";

export default {
  props: ["editId", "newId"],
  components: {
    appProductEdit,
  },
  setup() {
    const route = useRoute();

    const editing = computed(
      () => !route.matched.some(({ name }) => name === "products-new")
    );

    return { editing };
  },
};
</script>