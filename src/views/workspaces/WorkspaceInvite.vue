<template>
  <h1>Workspace Einladung</h1>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
const wid = route.params.wid as string;
const id = route.params.id as string;
</script>
