<template>
  <div class="p-4">
    <h1>Workspaces</h1>
    <div class="flex">
      <router-link :to="{ name: 'workspaces-new' }" class="btn btn-blue"
        >Add</router-link
      >
    </div>
    <app-workspace-list />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import appWorkspaceList from "@/components/workspace/WorkspaceList.vue";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";
import db from "@/utils/db";

import { Workspace } from "@/types";

const workspaces = ref<Workspace[]>([]);

useFirestoreCollectionSnapshot(db.workspaces, (snap) => {
  workspaces.value = [];
  snap.forEach((w) => {
    const workspace = { ...w.data(), id: w.id };
    workspaces.value.push(workspace);
  });
});
</script>
