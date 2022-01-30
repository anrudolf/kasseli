<template>
  <TabGroup>
    <TabList class="flex p-1 space-x-1 bg-blue-900 rounded-xl">
      <Tab v-slot="{ selected }" as="template">
        <button
          class="app-tab-btn"
          :class="[selected ? 'bg-blue-500 text-white' : 'bg-white text-black']"
        >
          All
        </button>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <button
          class="app-tab-btn"
          :class="[selected ? 'bg-blue-500 text-white' : 'bg-white text-black']"
        >
          Owner
        </button>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <button
          class="app-tab-btn"
          :class="[selected ? 'bg-blue-500 text-white' : 'bg-white text-black']"
        >
          Member
        </button>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <ul>
          <li
            v-for="workspace in workspaces"
            :key="workspace.id"
            class="p-3 my-1 border"
          >
            <router-link :to="`/workspaces/edit?id=${workspace.id}`"
              >{{ workspace.id }} -- {{ workspace.name }}</router-link
            >
          </li>
        </ul>
      </TabPanel>
      <TabPanel>
        <ul>
          <li
            v-for="workspace in workspacesOwner"
            :key="workspace.id"
            class="p-3 my-1 border"
          >
            <router-link :to="`/workspaces/edit?id=${workspace.id}`"
              >{{ workspace.id }} -- {{ workspace.name }}</router-link
            >
          </li>
        </ul>
      </TabPanel>
      <TabPanel>
        <ul>
          <li
            v-for="workspace in workspacesMember"
            :key="workspace.id"
            class="p-3 my-1 border"
          >
            <router-link :to="`/workspaces/edit?id=${workspace.id}`"
              >{{ workspace.id }} -- {{ workspace.name }}</router-link
            >
          </li>
        </ul>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";
import db from "@/utils/db";

import { Workspace } from "@/types";
import useAuth from "@/store/auth";

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
</script>

<style scoped>
.app-tab-btn {
  @apply w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
          focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60;
}
</style>
