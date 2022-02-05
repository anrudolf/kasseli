<template>
  <h1>Workspace Einladung</h1>
  <div v-if="workspace">
    <h2>Workspace</h2>
    {{ workspace }}
  </div>
  <div v-if="invite">
    <h2>Invite</h2>
    {{ invite }}
  </div>

  <button class="btn btn-blue" @click="claim(id)">CLAIM</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getDoc, doc } from "firebase/firestore";

import db from "@/utils/db";
import { Workspace } from "@/types";

import useWorkspaceInvite from "@/hooks/use-workspace-invite";
import useAuthstore from "@/store/auth";

const route = useRoute();
const wid = route.params.wid as string;
const id = route.params.id as string;

const workspace = ref<Workspace | null>(null);

const authStore = useAuthstore();

const { claim, entity: invite } = useWorkspaceInvite({
  uid: authStore.uid,
  wid,
  id,
});

const getWorkspace = async (wid: string) => {
  const snap = await getDoc(doc(db.workspaces, wid));
  if (snap.exists()) {
    workspace.value = snap.data();
  }
};
getWorkspace(wid);
</script>
