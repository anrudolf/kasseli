<template>
  <app-base-box
    class="bg-red-100 text-red-700"
    :model-value="props.modelValue"
    @update:model-value="(ev) => emit('update:modelValue', ev)"
  >
    <exclamation-circle-icon></exclamation-circle-icon>
  </app-base-box>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import appBaseBox from "./BaseBox.vue";
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
</script>
