<template>
  <div class="p-4 max-w-lg">
    <app-button-back class="mb-3">Zurück</app-button-back>
    <app-workspace-edit
      :key="editing"
      :editing="editing"
      :edit-id="editId"
      :new-id="newId"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import appWorkspaceEdit from "@/components/workspace/WorkspaceEdit.vue";

export default {
  components: {
    appWorkspaceEdit,
    appButtonBack,
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
