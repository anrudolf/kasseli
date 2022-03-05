<template>
  <div class="p-4 max-w-lg">
    <app-button-back class="mb-3">Zurück</app-button-back>
    <app-workspace-edit :id="props.id" :key="`${editing}`" :editing="editing" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { useRoute } from "vue-router";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import appWorkspaceEdit from "@/components/workspace/WorkspaceEdit.vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const route = useRoute();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "workspaces-new")
);
</script>
