<template>
  <div class="p-4 max-w-lg">
    <h1>Einladung</h1>

    <div v-if="loading">...</div>
    <div v-else-if="!invite" class="flex flex-col space-y-2">
      <p class="flex items-center border rounded p-2">
        <exclamation-circle-icon
          class="w-6 h-6 inline mr-2"
        ></exclamation-circle-icon>
        Keine Einlaung mit diesem Code gefunden.
      </p>
      <p
        v-if="existingMembership && existingMembership.invite === id"
        class="flex items-center border rounded p-2"
      >
        <information-circle-icon
          class="w-6 h-6 inline mr-2"
        ></information-circle-icon>
        Du hast diesen Code bereits verwendet und bist Mitglied!
        <router-link to="/" class="link block my-2">Weiter</router-link>
      </p>
      <p
        v-else-if="existingMembership && existingMembership.invite !== id"
        class="flex items-center border rounded p-2"
      >
        <information-circle-icon
          class="w-6 h-6 inline mr-2"
        ></information-circle-icon>
        Du bist bereits Mitglied in diesem Workspace.
        <router-link to="/" class="link block my-2">Weiter</router-link>
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
        <button
          class="btn btn-blue"
          :disabled="selfInvite"
          @click="claimAndContinue"
        >
          Beitreten
        </button>
        <p v-if="selfInvite" class="flex items-center border rounded p-2 mt-2">
          <exclamation-circle-icon
            class="w-6 h-6 inline mr-2"
          ></exclamation-circle-icon>
          Diese Einladung wurde von dir erstellt... Du kannst sie deshalb nicht
          verwenden.
        </p>
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
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDoc, doc } from "firebase/firestore";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/outline";

import db from "@/services/db";
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

const selfInvite = computed(() => {
  if (!authStore.isLoggedIn || !invite.value) {
    return false;
  }

  if (authStore.uid === invite.value.creator) {
    return true;
  }

  return false;
});

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
