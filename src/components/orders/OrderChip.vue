<template>
  <span class="ml-0.5 font-normal text-sm text-secondary">{{ formatted }}</span>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
});

const formatted = computed(() => String(props.num).padStart(0, "0"));
</script>
