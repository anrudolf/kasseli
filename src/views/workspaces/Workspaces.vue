<template>
  <div class="p-4">
    <router-link :to="{ name: 'settings' }">
      <app-button-back>Zurück</app-button-back>
    </router-link>

    <app-workspace-selector class="my-4"></app-workspace-selector>

    <div class="my-4 flex justify-between items-center">
      <h1>Workspaces</h1>
      <router-link :to="{ name: 'workspaces-new' }" class="btn btn-blue"
        >Add</router-link
      >
    </div>
    <TabGroup>
      <TabList class="flex p-1 space-x-1 bg-blue-900 rounded-xl">
        <Tab v-slot="{ selected }" as="template">
          <button
            class="app-tab-btn"
            :class="[
              selected ? 'bg-blue-500 text-white' : 'bg-white text-black',
            ]"
          >
            All
          </button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <button
            class="app-tab-btn"
            :class="[
              selected ? 'bg-blue-500 text-white' : 'bg-white text-black',
            ]"
          >
            Owner
          </button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <button
            class="app-tab-btn"
            :class="[
              selected ? 'bg-blue-500 text-white' : 'bg-white text-black',
            ]"
          >
            Member
          </button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <app-workspace-list v-model="workspaces" @select="selectWorkspace" />
        </TabPanel>
        <TabPanel>
          <app-workspace-list
            v-model="workspacesMember"
            @select="selectWorkspace"
          />
        </TabPanel>
        <TabPanel>
          <app-workspace-list
            v-model="workspacesOwner"
            @select="selectWorkspace"
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import appWorkspaceList from "@/components/workspace/WorkspaceList.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appWorkspaceSelector from "@/components/workspace/WorkspaceSelector.vue";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";
import db from "@/utils/db";

import useAuth from "@/store/auth";
import useSettings from "@/store/settings";

import { Workspace } from "@/types";

const router = useRouter();

const goBack = () => {
  router.push({ name: "settings" });
};

const workspaces = ref<Workspace[]>([]);

useFirestoreCollectionSnapshot(db.workspaces, (snap) => {
  workspaces.value = [];
  snap.forEach((w) => {
    const workspace = { ...w.data(), id: w.id };
    workspaces.value.push(workspace);
  });
});

const auth = useAuth();

const workspacesMember = computed(() => {
  return workspaces.value.filter((workspace) => workspace.owner !== auth.uid);
});

const workspacesOwner = computed(() => {
  return workspaces.value.filter((workspace) => workspace.owner === auth.uid);
});

const selectWorkspace = (id: string) => {
  console.log("workspace select:", id);
  const settings = useSettings();
  settings.setWorkspace(id);
};
</script>

<style scoped>
.app-tab-btn {
  @apply w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
          focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60;
}
</style>
