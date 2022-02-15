<template>
  <div class="p-4 max-w-md">
    <app-modal v-model="removeModal" title="Löschen bestätigen">
      Willst du diese Einladung löschen?
      <div class="mt-3 flex justify-between">
        <button class="btn btn-white" @click="removeModal = false">
          Abbrechen
        </button>
        <button class="btn btn-red" @click="remove">Löschen</button>
      </div>
    </app-modal>
    <app-button-back class="mb-4" @click="goBack">Zurück</app-button-back>
    <h1 v-if="editing" class="flex justify-between items-center">
      Einladung<app-button-delete
        @click="removeModal = true"
      ></app-button-delete>
    </h1>
    <h1 v-else>Neue Einladung</h1>

    <div v-if="workspace">
      <div>
        <p v-if="!editing" class="my-2">
          Erstelle einen geheimen Einladungs-Link und sende diesen Link deinen
          Freunden, um sie zum Workspace
          <strong>{{ workspace.name }}</strong> einzuladen.
        </p>
        <div class="flex">
          <label class="mr-4">
            <div>Rolle</div>
            <app-select
              v-model.number="role"
              :items="itemsRole"
              :disabled="!!invite"
            />
          </label>
          <label>
            <div>Verwendung</div>
            <app-select
              v-model="usage"
              :items="itemsUsage"
              :disabled="!!invite"
            ></app-select>
          </label>
        </div>
      </div>

      <div v-if="invite" class="py-2">
        <div
          v-if="!editing"
          class="my-2 flex items-center p-2 rounded bg-green-100 text-green-700"
        >
          <check-icon class="w-5 h-5 mr-2"></check-icon>
          Einladung wurde erstellt
        </div>
        <p class="py-2">Sende deinen Freunden den folgenden Link</p>
        <div class="flex">
          <input class="input" type="text" :value="getLink(invite)" readonly />
          <button
            v-if="isSupported"
            class="border rounded"
            @click="copyLink(invite)"
          >
            <duplicate-icon
              v-if="!copied"
              class="w-5 h-5 mx-3"
            ></duplicate-icon>
            <check-icon v-else class="w-5 h-5 mx-3"></check-icon>
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="!invite && !editing"
      class="mt-4 btn btn-blue"
      @click="create"
    >
      Erstellen
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDoc, doc } from "firebase/firestore";

import { DuplicateIcon, CheckIcon } from "@heroicons/vue/outline";
import { useClipboard } from "@vueuse/core";

import appSelect from "@/components/ui/Select.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appButtonDelete from "@/components/ui/ButtonDelete.vue";
import appModal from "@/components/ui/Modal.vue";

import {
  Workspace,
  WorkspaceInvite,
  WorkspaceInviteUsage,
  WorkspaceRole,
} from "@/types";

import { itemsRole, itemsUsage, getLink } from "@/utils/workspace";

import useWorkspaceInvite from "@/hooks/use-workspace-invite";
import useAuthstore from "@/store/auth";

import db from "@/utils/db";

const route = useRoute();
const router = useRouter();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "workspaces-invite-new")
);

const id = editing.value ? (route.params.id as string) : "";

const wid = route.params.wid as string;
const workspace = ref<Workspace | null>(null);
const authStore = useAuthstore();

const getWorkspace = async (wid: string) => {
  const snap = await getDoc(doc(db.workspaces, wid));
  if (snap.exists()) {
    workspace.value = snap.data();
  }
};
getWorkspace(wid);

const role = ref(WorkspaceRole.Admin);
const usage = ref<WorkspaceInviteUsage>(WorkspaceInviteUsage.SINGLE);

const {
  addInvite,
  entity: invite,
  removeInvite,
} = useWorkspaceInvite({
  wid: wid,
  uid: authStore.uid,
  id: id,
});

const create = () => {
  addInvite(role.value, usage.value);
};

const removeModal = ref(false);
const remove = () => {
  removeInvite(id);
  router.go(-1);
};

const source = ref("");
const { copy, copied, isSupported } = useClipboard({ source });

const copyLink = (invite: WorkspaceInvite | null) => {
  if (!invite) {
    return;
  }
  source.value = getLink(invite);
  copy();
};

const goBack = () => {
  router.go(-1);
};
</script>
