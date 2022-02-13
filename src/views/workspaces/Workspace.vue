<template>
  <div class="p-4">
    <router-link :to="{ name: 'workspaces' }">
      <app-button-back>Zurück</app-button-back>
    </router-link>
    <div class="my-2">
      <small>{{ wid }}</small>
      <h1>Workspace</h1>
      <div v-if="workspace">
        {{ workspace.name }}
      </div>
      <app-workspace-invites
        v-model="invites"
        @add="gotoNewInvite"
        @remove="removeInvite"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { doc, getDoc } from "firebase/firestore";
import db from "@/utils/db";
import { Workspace, WorkspaceInvite } from "@/types";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appWorkspaceInvites from "@/components/workspace/WorkspaceInvites.vue";

import useAuthStore from "@/store/auth";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";

import useWorkspaceInvite from "@/hooks/use-workspace-invite";

const authStore = useAuthStore();

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

const gotoNewInvite = () => {
  router.push({ name: "workspaces-invite-new", params: { wid } });
};

const { removeInvite } = useWorkspaceInvite({
  wid,
  uid: authStore.uid,
});
</script>
