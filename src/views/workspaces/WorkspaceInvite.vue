<template>
  <div class="p-4">
    <h1>Einladung</h1>

    <div v-if="loading">...</div>
    <div v-else-if="!invite">
      <p>Keine Einlaung mit diesem Code gefunden.</p>
      <p v-if="existingMembership && existingMembership.invite === id">
        Du hast diesen Code bereits verwendet und bist Mitglied!
      </p>
      <p v-else-if="existingMembership && existingMembership.invite !== id">
        Du bist bereits Mitglied in diesem Workspace.
      </p>
    </div>
    <div v-else>
      <p class="mt-2">
        Du wurdest zum Workspace
        <strong>{{ workspace?.name }}</strong> eingeladen!
      </p>
      <div v-if="authStore.isLoggedIn">
        <p class="my-2">
          <label class="flex items-center">
            <input
              v-model="switchToWorkspace"
              type="checkbox"
              class="form-checkbox mr-2"
            />
            Workspace nach Beitreten aktivieren
          </label>
        </p>
        <button class="btn btn-blue" @click="claimAndContinue">
          Beitreten
        </button>
      </div>
      <div v-else>
        <p class="mb-2">
          Erstelle einen Account oder melde dich an, um die Einladung
          anzunehmen.
        </p>
        <router-link
          class="inline-block btn btn-blue"
          :to="{ name: 'login', query: { invite: id, workspace: wid } }"
          >Login/Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDoc, doc } from "firebase/firestore";

import db from "@/utils/db";
import { Workspace, WorkspaceMember } from "@/types";

import useWorkspaceInvite from "@/hooks/use-workspace-invite";
import useAuthstore from "@/store/auth";
import useSettings from "@/store/settings";

const route = useRoute();
const router = useRouter();

const wid = route.params.wid as string;
const id = route.params.id as string;

const workspace = ref<Workspace | null>(null);
const switchToWorkspace = ref(true);

const authStore = useAuthstore();

const {
  claim,
  entity: invite,
  loading,
} = useWorkspaceInvite({
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

const settings = useSettings();

const claimAndContinue = async () => {
  await claim(id);
  if (switchToWorkspace.value) {
    settings.setWorkspace(wid);
  }
  router.push("/");
};

const existingMembership = ref<WorkspaceMember | null>(null);

watch(loading, async (newVal, oldVal) => {
  if (newVal) {
    return;
  }

  if (!authStore.isLoggedIn) {
    return;
  }

  try {
    const existingRef = doc(db.workspaceMembers(wid), authStore.uid);
    const existingSnap = await getDoc(existingRef);
    if (existingSnap.exists()) {
      existingMembership.value = existingSnap.data();
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
