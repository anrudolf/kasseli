<template>
  <app-till-edit
    :key="editing"
    :editing="editing"
    :editId="editId"
    :newId="newId"
  />
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import appTillEdit from "../components/TillEdit.vue";

export default {
  props: ["editId", "newId"],
  components: {
    appTillEdit,
  },
  setup() {
    const route = useRoute();

    const editing = computed(
      () => !route.matched.some(({ name }) => name === "tills-new")
    );

    return { editing };
  },
};
</script>