<template>
  <div
    v-if="props.modelValue"
    class="p-2 rounded flex items-center justify-between"
  >
    <div class="w-8 h-8 inline">
      <slot>
        <question-mark-circle-icon></question-mark-circle-icon>
      </slot>
    </div>
    {{ props.modelValue }}
    <button @click="emit('update:modelValue', '')">
      <x-icon class="w-6 h-6 inline"></x-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { QuestionMarkCircleIcon, XIcon } from "@heroicons/vue/outline";

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
