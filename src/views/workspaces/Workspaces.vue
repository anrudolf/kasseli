<template>
  <div class="p-4">
    <router-link :to="{ name: 'settings' }">
      <app-button-back>Zurück</app-button-back>
    </router-link>

    <h1 class="my-4">Workspaces</h1>
    <p class="text-secondary">
      Normalerweise wird Kasseli ohne Workspace verwendet... so haben alle
      Zugriff auf Produkte, Kassen und Bilder, welche du hinzufügst - und
      umgekehrt! Mit Workspaces kannst du ein privates Kasseli mit eigenen
      Produkten, Kassen und Bildern machen. Erstelle dazu einen neuen Workspace
      oder wähle einen von der Liste aus.
    </p>
    <h2 class="my-4">Aktiv</h2>
    <app-workspace-selector class="my-4"></app-workspace-selector>

    <div class="my-4 flex justify-between items-center">
      <h2>Liste</h2>
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
          <app-workspace-list
            v-model="workspacesAll"
            @select="selectWorkspace"
          />
        </TabPanel>
        <TabPanel>
          <app-workspace-list
            v-model="workspacesCreator"
            @select="selectWorkspace"
          />
        </TabPanel>
        <TabPanel>
          <app-workspace-list
            v-model="workspacesMember"
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
import {
  query,
  collectionGroup,
  getFirestore,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import { Workspace, WorkspaceMember, WorkspaceRole } from "@/types";

const router = useRouter();

const goBack = () => {
  router.push({ name: "settings" });
};

const workspacesAll = ref<Workspace[]>([]);
const workspacesCreator = ref<Workspace[]>([]);
const workspacesMember = ref<Workspace[]>([]);

useFirestoreCollectionSnapshot(db.workspaces, (snap) => {
  workspacesAll.value = [];
  snap.forEach((w) => {
    const workspace = { ...w.data(), id: w.id };
    workspacesAll.value.push(workspace);
  });
});

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
    workspacesCreator.value = [];
    workspacesMember.value = [];

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

      if (member.role >= WorkspaceRole.Creator) {
        workspacesCreator.value.push(workspaceSnapshot.data());
      } else {
        workspacesMember.value.push(workspaceSnapshot.data());
      }
    });
  } catch (e) {
    console.error(e);
  }
};

searchPersonalWorkspaces(auth.uid);

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
