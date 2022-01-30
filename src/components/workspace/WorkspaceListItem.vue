<template>
  <router-link :to="`/workspaces/edit?id=${props.value.id}`"
    >{{ props.value.id }} -- {{ props.value.name }}</router-link
  >
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import { Workspace } from "@/types";

const props = defineProps<{ value: Workspace }>();
</script>
