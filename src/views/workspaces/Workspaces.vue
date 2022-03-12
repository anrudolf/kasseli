<template>
  <div class="p-4">
    <app-button-back>Zurück</app-button-back>

    <h1 class="my-4">Workspaces</h1>
    <p class="text-secondary">
      Normalerweise wird Kasseli ohne Workspace verwendet... so haben alle
      Zugriff auf Produkte, Kassen und Bilder, welche du hinzufügst - und
      umgekehrt! Mit Workspaces kannst du ein privates Kasseli machen. Erstelle
      dazu einen neuen Workspace oder wähle einen von der Liste aus.
    </p>
    <h2 class="my-4">Aktiv</h2>
    <app-workspace-selector class="my-4"></app-workspace-selector>

    <div class="my-4 flex justify-between items-center">
      <h2>Liste</h2>
      <router-link :to="{ name: 'workspaces-new' }" class="btn btn-blue"
        >Add</router-link
      >
    </div>
    <app-workspace-list v-model="workspaces" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import appWorkspaceList from "@/components/workspace/WorkspaceList.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appWorkspaceSelector from "@/components/workspace/WorkspaceSelector.vue";

import db from "@/services/db";

import useAuth from "@/store/auth";
import {
  query,
  collectionGroup,
  getFirestore,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import { Workspace, WorkspaceMember } from "@/types";

const workspaces = ref<Workspace[]>([]);

const auth = useAuth();

const searchPersonalWorkspaces = async (uid: string) => {
  if (!uid) {
    return;
  }

  const mq = query(
    collectionGroup(getFirestore(), "members"),
    where("uid", "==", uid)
  );

  try {
    const memberSnapshots = await getDocs(mq);
    workspaces.value = [];

    memberSnapshots.forEach(async (memberSnapshot) => {
      if (!memberSnapshot.exists()) {
        return;
      }

      const workspaceRef = memberSnapshot.ref.parent.parent;
      if (!workspaceRef) {
        return;
      }

      const member = memberSnapshot.data() as WorkspaceMember;
      const workspaceSnapshot = await getDoc(
        doc(db.workspaces, workspaceRef.id)
      );
      if (!workspaceSnapshot.exists()) {
        return;
      }

      workspaces.value.push(workspaceSnapshot.data());
    });
  } catch (e) {
    console.error(e);
  }
};

searchPersonalWorkspaces(auth.uid);
</script>

<style scoped>
.app-tab-btn {
  @apply w-full py-2.5 text-sm leading-5 font-medium text-blue-500 rounded;
}

.app-tab-btn:hover {
  @apply bg-gray-100;
}

.app-tab-btn-selected {
  @apply w-full py-2.5 text-sm leading-5 font-medium text-white bg-blue-500 rounded;
}
</style>
