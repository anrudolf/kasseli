<template>
  <div class="p-4 max-w-lg">
    <app-button-back>Zurück</app-button-back>
    <div class="mt-4 flex justify-between items-start">
      <div>
        <h1 class="text-xl">Workspace</h1>
        <div v-if="workspace" class="text-3xl">
          {{ workspace.name }}
        </div>
      </div>
      <router-link
        class="btn btn-white flex items-center"
        :to="{ name: 'workspaces-edit', query: { id: wid } }"
        ><pencil-icon class="w-5 h-5 mr-2"></pencil-icon>Edit</router-link
      >
    </div>
    <div v-if="settings.workspace === PUBLIC_WORKSPACE">
      <p class="py-2 text-secondary">Kein Workspace aktiviert.</p>
      <button class="btn btn-blue" @click="selectWorkspace(wid)">
        AKTIVIEREN
      </button>
    </div>
    <div v-else-if="settings.workspace === wid">
      <p class="py-2 text-secondary">
        Dieser Workspace ist momentan aktiviert.
      </p>
      <button class="btn btn-blue" @click="selectWorkspace(PUBLIC_WORKSPACE)">
        DEAKTIVIEREN
      </button>
    </div>
    <div v-else>
      <p class="py-2 text-secondary">
        Ein anderer Workspace ist momentan aktiviert
      </p>
      <button class="btn btn-blue" @click="selectWorkspace(wid)">
        AKTIVIEREN
      </button>
    </div>

    <div class="mt-8">
      <h2>Quittungen</h2>
      <router-link class="link" :to="{ name: 'receipts' }"
        >Ansehen...</router-link
      >
    </div>

    <app-workspace-invite-list v-model="invites" :wid="wid" class="mt-8" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PencilIcon } from "@heroicons/vue/24/outline";

import { doc, getDoc } from "firebase/firestore";
import db from "@/services/db";
import { Workspace, WorkspaceInvite } from "@/types";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appWorkspaceInviteList from "@/components/workspace/WorkspaceInviteList.vue";

import useSettings from "@/store/settings";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";

import { PUBLIC_WORKSPACE } from "@/utils/workspace";

const settings = useSettings();

const route = useRoute();
const router = useRouter();

const wid = route.params.id as string;
const workspace = ref<Workspace | null>(null);
const invites = ref<WorkspaceInvite[]>([]);

const getWorkspace = async (wid: string) => {
  const snap = await getDoc(doc(db.workspaces, wid));
  if (snap.exists()) {
    workspace.value = snap.data();
  }
};
getWorkspace(wid);

useFirestoreCollectionSnapshot(
  db.workspaceInvites(wid),
  (snaps) => {
    invites.value = [];
    snaps.forEach((doc) => {
      if (doc.exists()) {
        invites.value.push(doc.data());
      }
    });
  },
  (err) => {
    console.log("useFirestoreCollectionSnapshot: error:", err);
  }
);

const selectWorkspace = (id: string) => {
  settings.setWorkspace(id);
  router.go(-1);
};
</script>
