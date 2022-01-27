<template>
  <app-base-box
    class="bg-green-100 text-green-700"
    :model-value="props.modelValue"
    @update:model-value="(ev) => emit('update:modelValue', ev)"
  >
    <check-icon></check-icon>
  </app-base-box>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import appBaseBox from "./BaseBox.vue";
import { CheckIcon } from "@heroicons/vue/solid";

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
