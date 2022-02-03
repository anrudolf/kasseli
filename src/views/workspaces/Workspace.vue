<template>
  <div class="p-4">
    <router-link :to="{ name: 'workspaces' }">
      <app-button-back>Zurück</app-button-back>
    </router-link>
    <div class="my-2">
      <small>{{ id }}</small>
      <h1>Workspace</h1>
      <div v-if="workspace">
        {{ workspace.name }}
      </div>
      <app-workspace-invites v-model="invites" @add="addInvite" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";

import { doc, getDoc, getDocs, addDoc, setDoc } from "firebase/firestore";
import db from "@/utils/db";
import { Workspace, WorkspaceInvite, WorkspaceRole } from "@/types";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appWorkspaceInvites from "@/components/workspace/WorkspaceInvites.vue";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";

const route = useRoute();
const id = route.params.id as string;
const workspace = ref<Workspace | null>(null);
const invites = ref<WorkspaceInvite[]>([]);

const getWorkspace = async (wid: string) => {
  const snap = await getDoc(doc(db.workspaces, wid));
  if (snap.exists()) {
    workspace.value = snap.data();
  }
};
getWorkspace(id);

useFirestoreCollectionSnapshot(db.workspaceInvites(id), (snaps) => {
  invites.value = [];
  snaps.forEach((doc) => {
    if (doc.exists()) {
      invites.value.push(doc.data());
    }
  });
});

const addInvite = (role: WorkspaceRole) => {
  const randomId = doc(db.workspaceInvites(id)).id;
  setDoc(doc(db.workspaceInvites(id), randomId), {
    id: randomId,
    workspace: id,
    role: role,
  });
};
</script>
