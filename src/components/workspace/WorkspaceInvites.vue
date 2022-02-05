<template>
  <div class="mt-4 flex items-center">
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
      class="p-2 my-2 border"
    >
      <router-link
        class="block link"
        :to="{
          name: 'workspaces-invite',
          params: { wid: invite.workspace, id: invite.id },
          query: { role: invite.role },
        }"
        >Link</router-link
      >
      {{ invite }}
      <button class="btn btn-red" @click="emit('remove', invite.id)">
        REMOVE
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import appSelect from "@/components/ui/Select.vue";
import { WorkspaceInvite, WorkspaceRole } from "@/types";

const items = [
  { text: "User", value: WorkspaceRole.User },
  { text: "Admin", value: WorkspaceRole.Admin },
  { text: "Owner", value: WorkspaceRole.Owner },
];
const roleToAdd = ref(WorkspaceRole.Admin);

const props = defineProps<{ modelValue: WorkspaceInvite[] }>();
const emit = defineEmits<{
  (e: "add", v: number): void;
  (e: "remove", v: string): void;
}>();
</script>
