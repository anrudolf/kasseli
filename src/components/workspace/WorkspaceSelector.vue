<template>
  <div class="border h-16 p-3 flex items-center">
    <app-modal
      v-model="showDisableModal"
      title="Switch Workspace"
      show-confirm
      show-cancel
      @confirm="settings.clearWorkspace"
    >
      Möchtest du anstatt eines eigenen Workspaces den öffentlichen Workspace
      verwenden?
    </app-modal>
    <div v-if="!hasWorkspaceSelected" class="text-xl">Public</div>
    <div v-else class="flex w-full">
      <div v-if="loading" class="animate-pulse w-full">
        <div class="flex w-full justify-between">
          <div class="h-10 w-full mr-4 bg-gray-200 rounded"></div>
          <div class="h-10 w-28 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div v-else class="flex w-full">
        <div v-if="workspace" class="flex w-full justify-between items-center">
          <div v-if="workspace" class="text-xl">{{ workspace.name }}</div>
          <div v-else class="text-xl text-red-500">
            Workspace {{ wid }} nicht gefunden!
          </div>
          <button class="text-green-500" @click="showDisableModal = true">
            Deaktivieren
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import useAuth from "@/store/auth";
import useSettings from "@/store/settings";
import { Workspace } from "@/types";
import { PUBLIC_WORKSPACE } from "@/utils/workspace";
import { getDoc, doc } from "firebase/firestore";
import db from "@/utils/db";
import appModal from "@/components/ui/Modal.vue";

const { isLoggedIn } = useAuth();
const settings = useSettings();

const hasWorkspaceSelected = computed(
  () => settings.workspace !== PUBLIC_WORKSPACE && settings.workspace !== ""
);

const wid = computed(() => settings.workspace);

const workspace = ref<Workspace | null>(null);
const loading = ref(true);
const showDisableModal = ref(false);

const resolveWorkspace = async () => {
  loading.value = true;
  workspace.value = null;
  const snap = await getDoc(doc(db.workspaces, settings.workspace));
  if (snap.exists()) {
    workspace.value = snap.data();
  }
  loading.value = false;
};

watch(
  wid,
  () => {
    if (hasWorkspaceSelected.value) {
      resolveWorkspace();
    }
  },
  { immediate: true }
);
</script>
