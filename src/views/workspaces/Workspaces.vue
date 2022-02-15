<template>
  <div class="p-4">
    <router-link :to="{ name: 'settings' }">
      <app-button-back>Zurück</app-button-back>
    </router-link>

    <h1 class="my-4">Workspaces</h1>
    <p class="text-secondary">
      Normalerweise wird Kasseli ohne Workspace verwendet... so haben alle
      Zugriff auf Produkte, Kassen und Bilder, welche du hinzufügst - und
      umgekehrt! Mit Workspaces kannst du ein privates Kasseli machen. Erstelle
      dazu einen neuen Workspace oder wähle einen von der Liste aus.
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
      <TabList class="flex space-x-1 border rounded">
        <Tab v-slot="{ selected }" as="template">
          <button :class="[selected ? 'app-tab-btn-selected' : 'app-tab-btn']">
            All
          </button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <button :class="[selected ? 'app-tab-btn-selected' : 'app-tab-btn']">
            Owner
          </button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <button :class="[selected ? 'app-tab-btn-selected' : 'app-tab-btn']">
            Member
          </button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <app-workspace-list v-model="workspacesAll" />
        </TabPanel>
        <TabPanel>
          <app-workspace-list v-model="workspacesCreator" />
        </TabPanel>
        <TabPanel>
          <app-workspace-list v-model="workspacesMember" />
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
  @apply w-full py-2.5 text-sm leading-5 font-medium text-blue-500 rounded;
}

.app-tab-btn:hover {
  @apply bg-gray-100;
}

.app-tab-btn-selected {
  @apply w-full py-2.5 text-sm leading-5 font-medium text-white bg-blue-500 rounded;
}
</style>
