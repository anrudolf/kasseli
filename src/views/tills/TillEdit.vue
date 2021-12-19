<template>
  <app-till-edit
    :key="`${editing}`"
    :editing="editing"
    :edit-id="editId"
    :new-id="newId"
    :removable="removable"
  />
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import { useRoute } from "vue-router";

import appTillEdit from "../../components/till/TillEdit.vue";

export default {
  components: {
    appTillEdit,
  },
  props: ["editId", "newId"],
  setup(props) {
    const route = useRoute();

    const editing = computed(
      () => !route.matched.some(({ name }) => name === "tills-new")
    );

    const { editId } = toRefs(props);

    const removable = computed(() => editId.value !== "default");

    return { editing, removable };
  },
};
</script>
