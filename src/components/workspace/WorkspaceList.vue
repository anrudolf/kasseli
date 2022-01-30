<template>
  <ul>
    <li
      v-for="workspace in props.modelValue"
      :key="workspace.id"
      class="p-3 my-1 border flex space-x-3"
    >
      <span>{{ workspace.name }}</span>
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
