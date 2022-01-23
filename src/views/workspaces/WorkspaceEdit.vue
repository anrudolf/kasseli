<template>
  <app-workspace-edit
    :key="editing"
    :editing="editing"
    :edit-id="editId"
    :new-id="newId"
  />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

import appWorkspaceEdit from "@/components/workspace/WorkspaceEdit.vue";

export default {
  components: {
    appWorkspaceEdit,
  },
  props: ["editId", "newId"],
  setup() {
    const route = useRoute();

    const editing = computed(
      () => !route.matched.some(({ name }) => name === "workspaces-new")
    );

    return { editing };
  },
};
</script>
