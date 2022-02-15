<template>
  <ul>
    <li
      v-for="workspace in props.modelValue"
      :key="workspace.id"
      class="mt-1 border rounded flex space-x-3"
    >
      <router-link
        class="w-full p-2"
        :to="{ name: 'workspace', params: { id: workspace.id } }"
        >{{ workspace.name }}</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

import { Workspace } from "@/types";

const props = defineProps<{ modelValue: Workspace[] }>();
</script>
