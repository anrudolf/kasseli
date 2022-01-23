<template>
  <ul>
    <li v-for="workspace in workspaces" :key="workspace.id">
      <router-link :to="`/workspaces/edit?id=${workspace.id}`"
        >{{ workspace.id }} -- {{ workspace.name }}</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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
