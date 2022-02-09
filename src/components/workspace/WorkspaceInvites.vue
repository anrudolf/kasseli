<template>
  <div class="mt-4 flex items-center">
    <app-modal v-model="showModal" title="Einladung">
      <p>Einladung</p>
    </app-modal>
    <h2 class="mr-auto">Invites</h2>
    <app-select v-model.number="roleToAdd" :items="items" />
    <button class="ml-1 btn btn-blue" @click="() => emit('add', roleToAdd)">
      ADD
    </button>
  </div>
  <ul>
    <li
      v-for="invite in props.modelValue"
      :key="invite.id"
      class="p-2 my-2 border flex space-x-2 items-center"
    >
      <div class="mr-auto">
        <div>{{ invite.created }}</div>
        <small> {{ getRole(invite) }}</small>
      </div>
      <button class="btn btn-blue" @click="showModal = true">VIEW</button>
      <button class="btn btn-blue" @click="copyLink(invite)">COPY</button>
      <button class="btn btn-red" @click="emit('remove', invite.id)">
        REMOVE
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { useClipboard } from "@vueuse/core";

import appSelect from "@/components/ui/Select.vue";
import appModal from "@/components/ui/Modal.vue";

import { WorkspaceInvite, WorkspaceRole } from "@/types";

const items = [
  { text: "User", value: WorkspaceRole.User },
  { text: "Admin", value: WorkspaceRole.Admin },
  { text: "Owner", value: WorkspaceRole.Owner },
];
const roleToAdd = ref(WorkspaceRole.Admin);

const getRole = (invite: WorkspaceInvite) => {
  const found = items.find((item) => (item.value = invite.role));
  if (!found) {
    return "???";
  }
  return found.text;
};

const props = defineProps<{ modelValue: WorkspaceInvite[] }>();
const emit = defineEmits<{
  (e: "add", v: number): void;
  (e: "remove", v: string): void;
}>();

const getLink = (invite: WorkspaceInvite) => {
  return `${window.location}/workspaces/${invite.workspace}/invite/${invite.id}`;
};

const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });

const copyLink = (invite: WorkspaceInvite) => {
  source.value = getLink(invite);
  copy();
};

const showModal = ref(false);
</script>
