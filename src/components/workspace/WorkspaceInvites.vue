<template>
  <div class="mt-4 flex items-center">
    <h2 class="mr-auto">Invites</h2>

    <button class="btn btn-blue" @click="emit('add')">ADD</button>
  </div>
  <ul>
    <li
      v-for="invite in props.modelValue"
      :key="invite.id"
      class="p-2 my-2 border flex space-x-2 items-center"
    >
      <div class="mr-auto">
        <div>{{ invite.created }}</div>
        <small> {{ getRole(invite) }} - {{ getUsage(invite) }}</small>
      </div>
      <div class="flex flex-col">
        <router-link
          class="btn btn-blue"
          :to="{
            name: 'workspaces-invite',
            params: { wid: invite.workspace, id: invite.id },
          }"
          >View</router-link
        >
        <button class="btn btn-red" @click="emit('remove', invite.id)">
          REMOVE
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { useClipboard } from "@vueuse/core";

import appModal from "@/components/ui/Modal.vue";

import { getRole, getUsage, getLink } from "@/utils/workspace";

import { WorkspaceInvite } from "@/types";

const props = defineProps<{ modelValue: WorkspaceInvite[] }>();
const emit = defineEmits<{
  (e: "add"): void;
  (e: "remove", v: string): void;
}>();

const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });

const copyLink = (invite: WorkspaceInvite) => {
  source.value = getLink(invite);
  copy();
};

const showModal = ref(false);
</script>
