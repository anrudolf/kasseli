<template>
  <span class="ml-0.5 font-normal text-sm text-secondary">{{ num }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
});
</script>
