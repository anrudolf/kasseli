<template>
  <ul>
    <li
      v-for="workspace in props.modelValue"
      :key="workspace.id"
      class="p-3 my-1 border rounded flex space-x-3"
    >
      <router-link :to="{ name: 'workspace', params: { id: workspace.id } }">{{
        workspace.name
      }}</router-link>
      <router-link
        :to="{ name: 'workspaces-edit', query: { id: workspace.id } }"
        >EDIT</router-link
      >
      <button @click="emit('select', workspace.id)">SELECT</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

import { Workspace } from "@/types";

const props = defineProps<{ modelValue: Workspace[] }>();
const emit = defineEmits<{
  (e: "select", id: string): void;
}>();
</script>
