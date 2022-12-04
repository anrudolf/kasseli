<template>
  <div
    v-if="props.modelValue"
    class="p-2 rounded flex items-center justify-between"
  >
    <div class="w-8 h-8 flex items-center">
      <slot>
        <question-mark-circle-icon></question-mark-circle-icon>
      </slot>
    </div>
    <div class="mx-2">{{ props.modelValue }}</div>
    <button @click="emit('update:modelValue', '')">
      <x-mark-icon class="w-6 h-6 inline"></x-mark-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";

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
